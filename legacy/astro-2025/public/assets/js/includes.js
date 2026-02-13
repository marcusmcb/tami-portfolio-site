(function () {
  function loadPartial(targetId, url) {
    var el = document.getElementById(targetId);
    if (!el) return;

    fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error('Failed to load ' + url + ': ' + r.status);
        return r.text();
      })
      .then(function (html) {
        el.innerHTML = html;
      })
      .catch(function (err) {
        // If someone opens via file://, fetch will usually fail.
        el.innerHTML =
          '<!-- ' +
          err.message +
          ' -->\n' +
          '<div class="partial-error">This site uses header/footer partials. Run a local web server to view it (see README).</div>';
      });
  }

  loadPartial('site-header', 'partials/header.html');
  loadPartial('site-footer', 'partials/footer.html');
})();
