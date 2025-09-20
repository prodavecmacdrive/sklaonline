// Filter dropdowns functionality
document.addEventListener('DOMContentLoaded', function() {
    // Find all filter section buttons
    const filterButtons = document.querySelectorAll('.border-b.border-gray-100.pb-2 > button');
    
    filterButtons.forEach(button => {
        // Initialize all dropdowns as hidden except those that should be open
        const content = button.nextElementSibling;
        if (content && content.classList.contains('mt-3')) {
            if (!button.querySelector('img[alt="Chevron Down"]')?.classList.contains('rotate-180')) {
                content.style.display = 'none';
            }
        }

        button.addEventListener('click', function() {
            // Get the content div that follows the button
            const content = this.nextElementSibling;
            if (!content || !content.classList.contains('mt-3')) return;
            
            const chevronIcon = this.querySelector('img[alt="Chevron Down"]');
            
            // Toggle content visibility
            const isHidden = content.style.display === 'none' || !content.style.display;
            
            // Toggle current dropdown
            content.style.display = isHidden ? 'block' : 'none';
            if (chevronIcon) {
                chevronIcon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
                chevronIcon.style.transition = 'transform 0.3s ease';
            }
        });
    });

    // Initialize checkboxes
    const checkboxButtons = document.querySelectorAll('[role="checkbox"]');
    checkboxButtons.forEach(button => {
        button.addEventListener('click', function() {
            const currentState = this.getAttribute('aria-checked') === 'true';
            this.setAttribute('aria-checked', !currentState);
            this.setAttribute('data-state', !currentState ? 'checked' : 'unchecked');
        });
    });

    // Initialize sort dropdown
    const sortDropdownBtn = document.getElementById('sortDropdownBtn');
    const sortDropdown = document.getElementById('sortDropdown');
    const sortSelected = document.getElementById('sortSelected');

    if (sortDropdownBtn && sortDropdown) {
        sortDropdownBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            sortDropdown.style.display = isExpanded ? 'none' : 'block';
        });

        // Handle sort option selection
        const sortOptions = sortDropdown.querySelectorAll('div[role="option"]');
        sortOptions.forEach(option => {
            option.addEventListener('click', function() {
                const value = this.textContent.trim();
                sortSelected.textContent = value;
                sortDropdown.style.display = 'none';
                sortDropdownBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!sortDropdownBtn.contains(e.target) && !sortDropdown.contains(e.target)) {
                sortDropdown.style.display = 'none';
                sortDropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});