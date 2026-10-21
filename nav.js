(function () {
    // Måste läsas direkt, innan sidan laddats klart
    var scriptEl = document.currentScript;
    var base = scriptEl && scriptEl.src ? scriptEl.src.replace(/[^\/]*$/, '') : '';

    function init() {
        var nav = document.querySelector('nav');

        // 1. Länkar: hämta från navigationen om den finns, annars en fast lista
        var links = [];
        if (nav) {
            var home = nav.querySelector('#navName a');
            if (home) links.push({ href: home.getAttribute('href'), label: 'Home' });

            nav.querySelectorAll('#navOptionsContainer a').forEach(function (a) {
                var t = a.textContent.trim().toLowerCase();
                links.push({
                    href: a.getAttribute('href'),
                    label: t.charAt(0).toUpperCase() + t.slice(1)
                });
            });
        }
        if (links.length === 0) {
            links = [
                { href: base + 'index.html', label: 'Home' },
                { href: base + 'atelier.html', label: 'Atelier' },
                { href: base + 'contact.html', label: 'Contact' }
            ];
        }

        // 2. Bygg menyn
        var old = document.getElementById('mobileMenu');
        if (old) old.remove();

        var menu = document.createElement('div');
        menu.id = 'mobileMenu';
        menu.setAttribute('aria-hidden', 'true');

        var list = document.createElement('ul');
        list.id = 'mobileMenuList';
        links.forEach(function (l) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = l.href;
            a.textContent = l.label;
            li.appendChild(a);
            list.appendChild(li);
        });
        menu.appendChild(list);

        if (nav) {
            nav.insertAdjacentElement('afterend', menu);
        } else {
            document.body.appendChild(menu);
        }

        // 3. Hamburgerknappen
        var btn = document.getElementById('hamburgerBtn');
        if (btn) {
            var fresh = btn.cloneNode(true);
            btn.replaceWith(fresh);
            btn = fresh;
        } else {
            btn = document.createElement('div');
            btn.id = 'hamburgerBtn';
            btn.innerHTML = '<span></span><span></span><span></span>';
            (nav || document.body).appendChild(btn);
        }
        btn.classList.remove('open', 'active');
        btn.setAttribute('role', 'button');
        btn.setAttribute('tabindex', '0');
        btn.setAttribute('aria-label', 'Open menu');
        btn.setAttribute('aria-expanded', 'false');

        function setMenu(open) {
            btn.classList.toggle('open', open);
            menu.classList.toggle('open', open);
            document.body.classList.toggle('menu-open', open);
            document.body.style.overflow = open ? 'hidden' : '';
            btn.setAttribute('aria-expanded', open);
            btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
            menu.setAttribute('aria-hidden', !open);
            if (open && nav) nav.classList.remove('nav-hidden');
        }

        btn.addEventListener('click', function () {
            setMenu(!menu.classList.contains('open'));
        });

        btn.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setMenu(!menu.classList.contains('open'));
            }
        });

        menu.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', function () { setMenu(false); });
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.classList.contains('open')) setMenu(false);
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 669 && menu.classList.contains('open')) setMenu(false);
        });

        window.addEventListener('pageshow', function (e) {
            if (e.persisted) setMenu(false);
        });

        // 4. Göm navigationen vid scroll ner, visa vid scroll upp
        if (nav) {
            var lastY = window.scrollY;
            var ticking = false;

            var onScroll = function () {
                var y = window.scrollY;
                var diff = y - lastY;

                if (menu.classList.contains('open') || y < 80) {
                    nav.classList.remove('nav-hidden');
                } else if (diff > 6) {
                    nav.classList.add('nav-hidden');
                } else if (diff < -6) {
                    nav.classList.remove('nav-hidden');
                }

                if (Math.abs(diff) > 6 || y < 80) lastY = y;
                ticking = false;
            };

            window.addEventListener('scroll', function () {
                if (!ticking) {
                    requestAnimationFrame(onScroll);
                    ticking = true;
                }
            }, { passive: true });

            // tangentbordsanvändare ska alltid kunna nå menyn
            nav.addEventListener('focusin', function () {
                nav.classList.remove('nav-hidden');
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();