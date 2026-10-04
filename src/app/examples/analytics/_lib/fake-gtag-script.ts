// A tiny stand-in for Google's gtag.js. It only does what this example
// needs, in the same shape as the real one:
// - runs the commands already queued in dataLayer, then takes over push()
// - "config" sets the measurement ID and sends a page_view
// - "event" sends an event; string params become ep.*, numbers epn.*
// - keeps a client ID in the _ga cookie
// - sends a page_view when the history changes (GA4 "enhanced measurement"),
//   which covers Next.js client-side navigations
// - sends each hit as a POST beacon to the collect URL, with query params
export const fakeGtagScript = (collectUrl: string) => `(function () {
  var dataLayer = (window.dataLayer = window.dataLayer || []);
  var measurementId = null;
  var waiting = [];
  var clientId = getClientId();

  function getClientId() {
    var match = document.cookie.match(/(?:^|; )_ga=([^;]+)/);
    if (match) return match[1];
    var id = Math.floor(Math.random() * 1e9) + "." + Math.floor(Date.now() / 1000);
    document.cookie = "_ga=" + id + "; path=/; max-age=63072000; SameSite=Lax";
    return id;
  }

  function hit(name, params) {
    if (!measurementId) return waiting.push([name, params]);
    var query = new URLSearchParams({
      v: "2",
      tid: measurementId,
      cid: clientId,
      en: name,
      dl: location.href,
      dt: document.title,
    });
    for (var key in params || {}) {
      var value = params[key];
      query.set((typeof value === "number" ? "epn." : "ep.") + key, String(value));
    }
    navigator.sendBeacon(${JSON.stringify(collectUrl)} + "?" + query);
  }

  function run(args) {
    if (args[0] === "config") {
      measurementId = args[1];
      if (!args[2] || args[2].send_page_view !== false) hit("page_view");
      waiting.splice(0).forEach(function (item) { hit(item[0], item[1]); });
    } else if (args[0] === "event") {
      hit(args[1], args[2]);
    }
    // Other commands ("js", "set", "consent") are ignored by this fake.
  }

  dataLayer.forEach(run);
  var push = dataLayer.push;
  dataLayer.push = function () {
    for (var i = 0; i < arguments.length; i++) run(arguments[i]);
    return push.apply(dataLayer, arguments);
  };

  var lastUrl = location.href;
  function onHistoryChange() {
    // Wait a moment so the new page can update document.title.
    setTimeout(function () {
      if (location.href === lastUrl) return;
      lastUrl = location.href;
      hit("page_view");
    }, 100);
  }
  ["pushState", "replaceState"].forEach(function (method) {
    var original = history[method];
    history[method] = function () {
      var result = original.apply(this, arguments);
      onHistoryChange();
      return result;
    };
  });
  window.addEventListener("popstate", onHistoryChange);
})();
`;
