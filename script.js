// Category tabs: GRAPHIC / MOTION / PRODUCTION / 3D
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));

  function select(tab, moveFocus) {
    tabs.forEach(function (t) {
      var on = t === tab;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
    if (moveFocus) tab.focus();
    try { history.replaceState(null, '', '#' + tab.dataset.tab); } catch (e) {}
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(tab, false); });

    tab.addEventListener('keydown', function (e) {
      var next;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      else if (e.key === 'Home') next = tabs[0];
      else if (e.key === 'End') next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });

  // open the tab named in the URL, e.g. work.html#3d
  var fromHash = tabs.filter(function (t) { return '#' + t.dataset.tab === location.hash; })[0];
  select(fromHash || tabs[0], false);

  // search box: no backend yet, so just stop the page from reloading
  document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();
  });
})();
