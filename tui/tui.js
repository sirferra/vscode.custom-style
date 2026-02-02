const __MARGIN = 10;
const __ELEMENTS_TO_PATCH = [
    {id: 'editor-container', selector:'.split-view-view.visible:has(>.monaco-grid-branch-node>.monaco-split-view2.horizontal>.monaco-scrollable-element>.split-view-container>.split-view-view.visible>.part.editor)'},
    {id: 'terminal-container', selector:'.split-view-view.visible:has(>.part.panel.basepanel>.composite)'}
];

function init(){
    addIdsToElements();
    listenForHeightChange();
}

function patchSomeHeight(){
    for(const selector of __ELEMENTS_TO_PATCH){
        document.querySelectorAll(selector).forEach(e=>{
            e.addEventListener('mousedown', (e)=>{
                e.target.dataset['oldHeight'] = e.target.style.height;
                console.log('oldHeight', e.target.dataset['oldHeight']);
            });
            e.addEventListener('mouseup', (e)=>{
                if(e.target.style.height !== e.target.dataset['oldHeight']){
                    e.target.style.height = `${e.target.clientHeight - __MARGIN}px`;
                }
                console.log('newHeight', e.target.style.height);
            });
        })
    }
}   


function addIdsToElements(){
    for(const element of __ELEMENTS_TO_PATCH){
        document.querySelectorAll(element.selector).forEach((e, i)=>{
            e.id = `${element.id}`;
        })
    }
}


function listenForHeightChange(){
    const selectos = __ELEMENTS_TO_PATCH.map(e=>e.selector).join(',');
    const ids = __ELEMENTS_TO_PATCH.map(e=>`#${e.id}`).join(',');
    const observer = new MutationObserver((mutationsList, observer) => {
        for(const mutation of mutationsList){
            if(mutation.type === 'attributes' && mutation.attributeName ==='style'){
                const target = mutation.target;
                console.log(target.style.pointerEvents);
                if(ids.includes(`#${target.id}`) && !target.style.pointerEvents){
                    const height = parseInt(target.clientHeight);
                    console.log('cambiaré altura de', target.id , 'de', target.style.height , 'a', `${height - __MARGIN}px`);
                    // avoid infinite loop
                    target.style.pointerEvents = 'none';
                    
                    target.style.height = `${height - __MARGIN}px`;
                }
            }
        }
    });
    
    document.querySelectorAll(selectos).forEach((e)=>{
        observer.observe(e, { attributes: true });
    });
}


setTimeout(init, 2000);