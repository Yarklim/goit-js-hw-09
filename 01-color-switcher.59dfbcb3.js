!function(){var e=document.querySelector("body"),t=document.querySelector("[data-start]");t.style.padding="10px 20px";var d=document.querySelector("[data-stop]");d.disabled=!0,d.style.padding="10px 20px",t.addEventListener("click",(function(){t.disabled=!0,d.disabled=!1,a=setInterval((function(){return t="#".concat(Math.floor(16777215*Math.random()).toString(16)),void(e.style.backgroundColor=t);var t}),1e3)})),d.addEventListener("click",(function(){t.disabled=!1,d.disabled=!0,clearInterval(a)}));var a=null}();
//# sourceMappingURL=01-color-switcher.59dfbcb3.js.map
