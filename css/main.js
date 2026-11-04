/* ==========================================================================
   +300 Projetos com Sobras de Madeira — Advertorial
   JavaScript puro, sem dependências.
   ========================================================================== */
(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     >>> LINK DO HOTMART <<<
     Substitui o URL abaixo pelo teu link de checkout.
     Todos os botões com o atributo data-cta passam a apontar para aqui.
     (O index.html tem o mesmo placeholder no href como fallback sem JS —
      se quiseres, faz também "Substituir tudo" nesse ficheiro.)
     ----------------------------------------------------------------------- */
  var HOTMART_URL = 'https://pay.hotmart.com/XXXXXXXXX';

  var ctas = document.querySelectorAll('[data-cta]');
  ctas.forEach(function (a) {
    a.setAttribute('href', HOTMART_URL);
    a.addEventListener('click', onCtaClick);
  });

  /* Evento de clique no CTA — descomenta quando tiveres o Pixel / GA4 */
  function onCtaClick() {
    // if (window.fbq) fbq('track', 'InitiateCheckout');
    // if (window.gtag) gtag('event', 'begin_checkout', { value: 29, currency: 'EUR' });
  }

  /* -----------------------------------------------------------------------
     Botão flutuante (sticky)
     - Aparece depois de o leitor passar a secção "O Chamado"
     - Esconde-se quando a secção de preço/garantia está à vista
       (já há um botão grande lá) e no footer
     ----------------------------------------------------------------------- */
  var sticky = document.getElementById('stickyCta');
  var chamado = document.getElementById('chamado');
  var preco = document.getElementById('preco');
  var footer = document.querySelector('.site-footer');
  var ticking = false;

  function updateSticky() {
    ticking = false;
    if (!sticky || !chamado) return;

    var vh = window.innerHeight;
    var passedChamado = chamado.getBoundingClientRect().bottom < vh * 0.35;
    var priceRect = preco ? preco.getBoundingClientRect() : null;
    var inPrice = priceRect && priceRect.top < vh * 0.85 && priceRect.bottom > vh * 0.15;
    var inFooter = footer && footer.getBoundingClientRect().top < vh * 0.9;

    var show = passedChamado && !inPrice && !inFooter;
    sticky.classList.toggle('is-visible', show);
    sticky.tabIndex = show ? 0 : -1;
    sticky.setAttribute('aria-hidden', show ? 'false' : 'true');
  }

  function requestTick() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateSticky);
    }
  }
  window.addEventListener('scroll', requestTick, { passive: true });
  window.addEventListener('resize', requestTick);
  updateSticky();

  /* -----------------------------------------------------------------------
     FAQ: só uma pergunta aberta de cada vez
     ----------------------------------------------------------------------- */
  var faqItems = document.querySelectorAll('.faq details');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* -----------------------------------------------------------------------
     Animação de entrada ao fazer scroll
     ----------------------------------------------------------------------- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Ano no rodapé */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
