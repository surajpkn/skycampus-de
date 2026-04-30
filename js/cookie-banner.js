/* ── SKY Campus Deutschland — Cookie / Privacy Notice ── */
(function () {
  const KEY = 'sky_privacy_notice';
  if (localStorage.getItem(KEY)) return;

  const banner = document.createElement('div');
  banner.id = 'privacy-banner';
  banner.innerHTML = `
    <div class="privacy-banner__inner">
      <span class="privacy-banner__icon">🔒</span>
      <p>
        Diese Website verwendet <strong>keine Tracking-Cookies</strong>.
        Nur deine Sprachpräferenz wird lokal gespeichert.
        <a href="datenschutz.html">Datenschutz</a> · <a href="impressum.html">Impressum</a>
      </p>
      <button id="privacy-banner__close" aria-label="Schließen">Verstanden</button>
    </div>`;
  document.body.appendChild(banner);

  document.getElementById('privacy-banner__close').addEventListener('click', function () {
    localStorage.setItem(KEY, '1');
    banner.classList.add('privacy-banner--hidden');
    setTimeout(() => banner.remove(), 400);
  });
})();
