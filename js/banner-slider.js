// Слайдер для главной страницы (баннер)
window.addEventListener('DOMContentLoaded', function() {
  // Слайды (можно добавить свои картинки)
  const slides = [
    'https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/25/00/25/25.1400x0.webp',
    'https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/26/00/26/26.1400x0.webp',
    'https://skladonline.com.ua/wa-data/public/shop/products/10/webp/data/public/photos/27/00/27/27.1400x0.webp'
  ];
  let current = 0;

  // DOM элементы
  const outer = document.querySelector('[class*="h-[645px]"]');
  const banner = outer ? outer.querySelector('.relative.h-full') : null;
  if (!banner) {
    return;
  }
  const picture = banner.querySelector('picture');
  const img = picture ? picture.querySelector('img') : null;
  const dots = banner.querySelectorAll('.absolute.bottom-6 button');
  const btnPrev = banner.querySelector('button.absolute.left-4');
  const btnNext = banner.querySelector('button.absolute.right-4');

  function showSlide(idx) {
    current = idx;
    if (img) {
      img.src = slides[current];
    }
    if (picture) {
      const source = picture.querySelector('source');
      if (source) {
        source.srcset = slides[current];
      }
    }
    dots.forEach((dot, i) => {
      dot.classList.toggle('bg-white', i === current);
      dot.classList.toggle('bg-white/50', i !== current);
    });
  }

  // Навигация
  if (btnPrev) btnPrev.addEventListener('click', function() {
    showSlide((current - 1 + slides.length) % slides.length);
  });
  if (btnNext) btnNext.addEventListener('click', function() {
    showSlide((current + 1) % slides.length);
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', function() {
      showSlide(i);
    });
  });

  // Автослайд
  setInterval(function() {
    showSlide((current + 1) % slides.length);
  }, 5000);

  // Инициализация
  showSlide(0);
});
