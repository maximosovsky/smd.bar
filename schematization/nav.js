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
        // Open direct sibling sub-menu (Осовский subpages)
        var sibling = active.nextElementSibling;
        if (sibling && sibling.tagName === 'UL' && sibling.classList.contains('sub-menu')) {
            sibling.classList.add('open');
        }
        // Open all ancestor sub-menus and their toggles
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
