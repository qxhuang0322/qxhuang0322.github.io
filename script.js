(() => {
    'use strict';

    function setupNavigation() {
        const toggle = document.querySelector('.menu-toggle');
        const nav = document.getElementById('main-nav');

        if (!nav) return;

        function setMenuOpen(open) {
            nav.classList.toggle('open', open);
            if (toggle) {
                toggle.setAttribute('aria-expanded', String(open));
                toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
            }
        }

        if (toggle) {
            setMenuOpen(false);
            toggle.addEventListener('click', () => {
                setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
            });
            document.addEventListener('keydown', event => {
                if (event.key === 'Escape' && nav.classList.contains('open')) {
                    setMenuOpen(false);
                    toggle.focus();
                }
            });
        }

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => setMenuOpen(false));
        });

        if (typeof window.matchMedia === 'function') {
            const desktop = window.matchMedia('(min-width: 901px)');
            const closeOnDesktop = event => {
                if (event.matches) setMenuOpen(false);
            };
            if (typeof desktop.addEventListener === 'function') {
                desktop.addEventListener('change', closeOnDesktop);
            } else if (typeof desktop.addListener === 'function') {
                desktop.addListener(closeOnDesktop);
            }
            closeOnDesktop(desktop);
        }

        const sections = Array.from(document.querySelectorAll('.main-column section[id]'));
        const sectionIds = new Set(sections.map(section => section.id));
        const sectionLinks = Array.from(nav.querySelectorAll('a')).map(link => {
            const target = new URL(link.href, window.location.href);
            return { link, target, id: target.hash.slice(1) };
        }).filter(({ target, id }) => {
            return target.origin === window.location.origin
                && target.pathname === window.location.pathname
                && sectionIds.has(id);
        });

        if (!sections.length || !sectionLinks.length) return;

        function highlightSection() {
            const readingLine = window.innerHeight * 0.3;
            let current = sections[0].id;
            for (const section of sections) {
                if (section.getBoundingClientRect().top <= readingLine) current = section.id;
            }
            sectionLinks.forEach(({ link, id }) => {
                const active = id === current;
                link.classList.toggle('active', active);
                if (active) link.setAttribute('aria-current', 'location');
                else link.removeAttribute('aria-current');
            });
        }

        highlightSection();
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(highlightSection, {
                rootMargin: '-12% 0px -60% 0px',
                threshold: 0
            });
            sections.forEach(section => observer.observe(section));
        }
    }

    function setupPublicationFilters() {
        const search = document.getElementById('publication-search');
        if (!search) return;

        const publications = Array.from(document.querySelectorAll('#all-publications .publication'));
        const buttons = Array.from(document.querySelectorAll('[data-filter]'));
        const count = document.getElementById('publication-count');
        const emptyState = document.querySelector('.empty-state');
        const validFilters = new Set(['all', 'published', 'preprint']);
        let filter = 'all';

        function normalizeFilter(value) {
            if (value === 'accepted') return 'published';
            return validFilters.has(value) ? value : 'all';
        }

        function updateAddress() {
            const url = new URL(window.location.href);
            if (filter === 'all') url.searchParams.delete('filter');
            else url.searchParams.set('filter', filter);
            const query = search.value.trim();
            if (query) url.searchParams.set('q', query);
            else url.searchParams.delete('q');
            if (url.href !== window.location.href) {
                window.history.replaceState(window.history.state, '', url);
            }
        }

        function render() {
            const words = search.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
            let visible = 0;

            publications.forEach(publication => {
                const { status, search: searchText } = publication.dataset;
                const matchesFilter = filter === 'all'
                    || (filter === 'published' && (status === 'published' || status === 'accepted'))
                    || (filter === 'preprint' && status === 'preprint');
                const text = (searchText || publication.textContent || '').toLowerCase();
                const matchesSearch = words.every(word => text.includes(word));
                publication.hidden = !(matchesFilter && matchesSearch);
                if (!publication.hidden) visible += 1;
            });

            buttons.forEach(button => {
                const active = normalizeFilter(button.dataset.filter) === filter;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', String(active));
            });
            if (count) {
                count.setAttribute('role', 'status');
                count.textContent = `Showing ${visible} of ${publications.length} publications`;
            }
            if (emptyState) emptyState.hidden = visible !== 0;
        }

        function readAddress() {
            const params = new URLSearchParams(window.location.search);
            filter = normalizeFilter(params.get('filter'));
            search.value = params.get('q') || '';
            render();
            updateAddress();
        }

        buttons.forEach(button => {
            button.addEventListener('click', event => {
                event.preventDefault();
                filter = normalizeFilter(button.dataset.filter);
                render();
                updateAddress();
            });
        });
        search.addEventListener('input', () => {
            render();
            updateAddress();
        });
        window.addEventListener('popstate', readAddress);
        readAddress();
    }

    function initialize() {
        const year = document.getElementById('current-year');
        if (year) year.textContent = new Date().getFullYear();
        setupNavigation();
        setupPublicationFilters();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize, { once: true });
    } else {
        initialize();
    }
})();
