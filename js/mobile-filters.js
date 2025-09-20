// Collapsible filters for mobile version
window.addEventListener('DOMContentLoaded', function() {
  console.log('Mobile filters script loaded.');

  // Only run on mobile (width < 768px)
  if (window.innerWidth >= 768) {
    console.log('Not mobile screen. Exiting mobile filters script.');
    return;
  }

  // Get the filter button and sidebar
  var filterButton = document.querySelector('.fliters_btn_mob');
  var filterSidebar = document.querySelector('.fixed.inset-0.z-50');

  if (!filterButton || !filterSidebar) {
    console.warn('Filter button or sidebar not found:', {
      button: !!filterButton,
      sidebar: !!filterSidebar
    });
    return;
  }

  console.log('Filter elements found, attaching click handler');
  
  // Start with sidebar hidden (add translate-x-full class)
  filterSidebar.classList.add('translate-x-full');
  
    function setBodyScrollDisabled(disabled) {
      document.body.style.overflow = disabled ? 'hidden' : '';
    }

    // Toggle sidebar visibility on filter button click
  filterButton.addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Filter button clicked');
    filterSidebar.classList.toggle('translate-x-full');
      setBodyScrollDisabled(filterSidebar.classList.contains('translate-x-full'));
  });

  // Close button in sidebar
  var closeButton = filterSidebar.querySelector('button');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      console.log('Close button clicked');
      filterSidebar.classList.add('translate-x-full');
        setBodyScrollDisabled(true);
    });
  }

  // Setup collapsible sections inside sidebar
  var filterSections = filterSidebar.querySelectorAll('.border-b > button');
  filterSections.forEach(function(btn) {
    var content = btn.nextElementSibling;
    if (!content) return;
    
    // Start collapsed
    content.style.display = 'none';
    btn.classList.remove('open');
    
    // Always set chevron to default (not rotated)
    var chevron = btn.querySelector('img[src*="icon-chevron-down-b.svg"]');
    if (chevron) {
      chevron.style.transform = '';
      chevron.style.transition = 'transform 0.2s';
    }
    
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var isOpen = content.style.display === 'block';
      console.log('Filter section clicked. Current state:', isOpen ? 'open' : 'closed');
      
      content.style.display = isOpen ? 'none' : 'block';
      btn.classList.toggle('open', !isOpen);
      
      // Rotate chevron only if icon-chevron-down-b.svg
      var chevron = btn.querySelector('img[src*="icon-chevron-down-b.svg"]');
      if (chevron) {
        chevron.style.transform = !isOpen ? 'rotate(180deg)' : '';
      }
    });
  });
});
