/**
 * Search functionality for Crumbs & Giggles
 */

document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchInputField = document.getElementById('search-input-field');
    const searchTags = document.querySelectorAll('.search-tag-chip');

    if (!searchBtn || !searchOverlay || !searchCloseBtn || !searchInputField) return;

    function openSearch() {
        searchOverlay.classList.add('open');
        setTimeout(() => searchInputField.focus(), 300);
        document.body.style.overflow = 'hidden';
    }

    function closeSearch() {
        searchOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
    });

    searchCloseBtn.addEventListener('click', closeSearch);

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchOverlay.classList.contains('open')) {
            closeSearch();
        }
    });

    // Handle search execution
    searchInputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInputField.value.trim();
            if (query) {
                executeSearch(query);
            }
        }
    });

    searchTags.forEach(tag => {
        tag.addEventListener('click', () => {
            const query = tag.textContent;
            searchInputField.value = query;
            executeSearch(query);
        });
    });

    function executeSearch(query) {
        console.log('Searching for:', query);
        // If on discovery page, filter cards
        if (window.location.pathname.includes('discovery.html')) {
            // Find global applyFilter if exists (discovery.html has it)
            if (typeof window.applyFilter === 'function') {
                window.applyFilter('all'); // Clear category filters first
            }
            
            const cards = document.querySelectorAll('.catalog-card');
            cards.forEach(card => {
                const name = card.querySelector('.catalog-product-name').textContent.toLowerCase();
                const visible = name.includes(query.toLowerCase());
                card.hidden = !visible;
            });
            
            closeSearch();
            
            // Scroll to catalog
            const catalog = document.getElementById('catalog-list');
            if (catalog) catalog.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Otherwise redirect to discovery with query (using hash or param)
            window.location.href = 'discovery.html?search=' + encodeURIComponent(query);
        }
    }

    // Check for search param on load (for discovery page)
    if (window.location.pathname.includes('discovery.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        if (searchQuery) {
            setTimeout(() => {
                executeSearch(searchQuery);
            }, 500);
        }
    }
});
