const __MARGIN = 6;
function init(){
    const comparativeHeight = document.querySelector('[id="workbench.parts.activitybar"]> div').clientHeight;
    document.querySelectorAll('div').forEach(e=>e.clientHeight == comparativeHeight ? e.style.height = `${comparativeHeight - __MARGIN}px`: '')
    console.log('parcheado a ', `${comparativeHeight - __MARGIN}px`);
}

setTimeout(init, 2000);