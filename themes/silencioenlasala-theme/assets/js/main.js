document.addEventListener('DOMContentLoaded', function () {
  const logo = document.querySelector('.logo'); // Select the image inside .logo
  const newLogoSrc = '/images/line-moon.png'; // Change this to your new logo image
  const originalLogoSrc = logo.src;
  const targetTranslation = -380; // The translation distance on the X axis (left to right)

  function handleScroll(e) {
    if (window.innerWidth < 900) {
      const scrollPosition = e.currentTarget.scrollTop;

      if (scrollPosition > 0) {
        const showNew = () => {
          if (scrollPosition + 200 < Math.abs(targetTranslation)) {
            logo.src = newLogoSrc;
            logo.classList.add('logo--scrolled');

            logo.style.transform = `translateX(${
              targetTranslation + scrollPosition + 200
            }px)`;
          }
        };
        if (!logo.src.includes(newLogoSrc)) {
          logo.style.transform = `translateX(${targetTranslation}px)`;
        }

        showNew();
      } else if (scrollPosition <= 100 && !logo.src.includes(originalLogoSrc)) {
        logo.style.opacity = 0;

        logo.style.transform = `translateX(${0}px)`;
        logo.src = originalLogoSrc;
        logo.classList.remove('logo--scrolled');

        setTimeout(() => {
          logo.style.transition = 'opacity 0.5s fade-in';
          logo.style.opacity = 1;
        }, 100);
      }
    }
  }

  document
    .getElementsByTagName('main')[0]
    .addEventListener('scroll', handleScroll);
});
