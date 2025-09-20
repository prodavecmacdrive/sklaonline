// Component loader for header and footer
class ComponentLoader {
    static async loadComponent(elementId, componentPath) {
        const element = document.getElementById(elementId);
        if (!element) {
            console.warn(`Element with id '${elementId}' not found`);
            return;
        }

        try {
            // Show loading state
            element.innerHTML = '<div class="text-center p-3">Завантаження...</div>';
            
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const html = await response.text();
            element.innerHTML = html;
            
            // Add fade-in animation
            element.classList.add('fade-in');
            
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
            
            // Fallback content
            if (elementId === 'header-placeholder') {
                element.innerHTML = this.getHeaderFallback();
            } else if (elementId === 'footer-placeholder') {
                element.innerHTML = this.getFooterFallback();
            } else {
                element.innerHTML = '<div class="text-center p-3 text-muted">Помилка завантаження компонента</div>';
            }
        }
    }


    static async loadHeader() {
        await this.loadComponent('header-placeholder', '../components/header.html');
    }

    static async loadFooter() {
        await this.loadComponent('footer-placeholder', '../components/footer.html');
    }

    static async loadAll() {
        try {
            await Promise.all([
                this.loadHeader(),
                this.loadFooter()
            ]);
            console.log('All components loaded successfully');
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }
}

// Auto-load components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    ComponentLoader.loadAll();

    // Desktop filters scroll lock
    var desktopFilters = document.getElementById('desktop-filters-scroll');
    if (desktopFilters) {
        desktopFilters.addEventListener('mouseenter', function() {
            document.body.style.overflow = 'hidden';
        });
        desktopFilters.addEventListener('mouseleave', function() {
            document.body.style.overflow = '';
        });
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ComponentLoader;
}
