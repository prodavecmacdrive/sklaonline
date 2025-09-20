// Выпадающее меню "Каталог товарів"
window.addEventListener('DOMContentLoaded', function() {
  var catalogBtn = document.getElementById('catalog-btn');
  var dropdown = document.getElementById('catalog-dropdown');
  if (!catalogBtn || !dropdown) return;

  // Показать/скрыть меню по клику
  catalogBtn.addEventListener('click', function(e) {
    e.preventDefault();
    dropdown.classList.toggle('hidden');
  });

  // Скрывать меню при клике вне
  document.addEventListener('click', function(e) {
    if (!catalogBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  // Адаптивная ширина для мобильных
  function setDropdownWidth() {
    if (window.innerWidth < 768) {
      dropdown.style.width = '100%';
      dropdown.classList.add('left-0');
      dropdown.classList.remove('w-64');
    } else {
      dropdown.style.width = '';
      dropdown.classList.add('w-64');
      dropdown.classList.remove('left-0');
    }
  }
  setDropdownWidth();
  window.addEventListener('resize', setDropdownWidth);
});
