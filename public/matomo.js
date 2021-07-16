// eslint-disable-next-line no-underscore-dangle,no-multi-assign
let _paq = (window._paq = window._paq || []);
/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
_paq.push(["disableCookies"]);
_paq.push(["trackPageView"]);
_paq.push(["enableLinkTracking"]);
(function () {
  let u = "https://seuranta.finland.fi/piwik/";
  _paq.push(["setTrackerUrl", `${u}matomo.php`]);
  _paq.push(["setSiteId", "235"]);
  let d = document;
  let g = d.createElement("script");
  let s = d.getElementsByTagName("script")[0];
  g.type = "text/javascript";
  g.async = true;
  g.src = `${u}matomo.js`;
  s.parentNode.insertBefore(g, s);
})();
