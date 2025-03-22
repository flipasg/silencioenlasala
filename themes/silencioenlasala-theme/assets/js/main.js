document.addEventListener('DOMContentLoaded', function () {
  const main = document.querySelector('main'); // Scroll container
  const body = document.body;

  main.addEventListener('scroll', function () {
    if (window.innerWidth <= 768) {
      if (main.scrollTop > 100) {
        body.classList.add('scrolled');
      } else {
        body.classList.remove('scrolled');
      }
    }
  });
});
