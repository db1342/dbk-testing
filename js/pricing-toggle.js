(function () {
  "use strict";

  var ANNUAL_DISCOUNT = 0.85;

  function formatMonthly(value) {
    return "$" + Math.round(value / 1000) + "k";
  }

  function init() {
    var toggle = document.querySelector("[data-pricing-toggle]");
    if (!toggle) {
      return;
    }

    var prices = Array.prototype.slice.call(
      document.querySelectorAll("[data-monthly]")
    );

    toggle.addEventListener("change", function () {
      var annual = toggle.checked;
      prices.forEach(function (el) {
        var monthly = Number(el.getAttribute("data-monthly"));
        if (!monthly) {
          return;
        }
        var shown = annual ? monthly * ANNUAL_DISCOUNT : monthly;
        el.firstChild.nodeValue = formatMonthly(shown);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
