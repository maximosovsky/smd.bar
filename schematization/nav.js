document.addEventListener('DOMContentLoaded', function () {
    // Hamburger toggle
    var hamburger = document.querySelector('.hamburger');
    var sidebar = document.querySelector('.sidebar');
    var overlay = document.querySelector('.sidebar-overlay');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function () {
            sidebar.classList.remove('open');
            overlay.classList.remove('open');
        });
    }
    // Nav toggles
    document.querySelectorAll('.nav-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            this.classList.toggle('open');
            var sub = this.nextElementSibling;
            if (sub) sub.classList.toggle('open');
        });
    });
    // Auto-open parent menus for active page
    var active = document.querySelector('.sidebar a.active');
    if (active) {
        // Open sibling sub-menu (e.g. Осовский subpages)
        var siblingMenu = active.nextElementSibling;
        if (siblingMenu && siblingMenu.classList.contains('sub-menu')) {
            siblingMenu.classList.add('open');
        }
        // Also check inside parent li
        var parentLi = active.closest('li');
        if (parentLi) {
            var childMenu = parentLi.querySelector(':scope > .sub-menu');
            if (childMenu) childMenu.classList.add('open');
        }
        // Open all ancestor sub-menus
        var parent = active.closest('.sub-menu');
        while (parent) {
            parent.classList.add('open');
            var toggle = parent.previousElementSibling;
            if (toggle && toggle.classList.contains('nav-toggle')) {
                toggle.classList.add('open');
            }
            parent = parent.parentElement.closest('.sub-menu');
        }
    }
});
