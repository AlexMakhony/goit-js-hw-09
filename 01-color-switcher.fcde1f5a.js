const t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null;t.btnStart.addEventListener("click",(r=>{e=setInterval((()=>{let e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;t.body.style.backgroundColor=e}),1e3),t.btnStart.setAttribute("disabled",!0)})),t.btnStop.addEventListener("click",(()=>{clearInterval(e),t.btnStart.removeAttribute("disabled",!0)}));
//# sourceMappingURL=01-color-switcher.fcde1f5a.js.map