(function () {
  var ACCESS_KEY = "mx-kbea-2026-v9k7";
  var params = new URLSearchParams(window.location.search);

  if (params.get("key") === ACCESS_KEY) {
    document.documentElement.classList.add("authorized");
    return;
  }

  document.title = "404 Not Found";
  document.documentElement.innerHTML =
    '<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>404 Not Found</title>' +
    '<style>body{margin:0;background:#111;color:#888;font-family:Arial,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh}h1{font-size:24px;font-weight:400}</style></head>' +
    '<body><h1>404 — Page Not Found</h1></body>';
})();
