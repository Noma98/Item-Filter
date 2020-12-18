'use strict';
//Fetch the items from the JSON file
function loadItems(){
    return fetch('../data/data.json')
        .then(response=>response.json())
        .then(json=>json.items);
}

//main
loadItems()
.then(items=>{
    displayItems(items);
    //setEventListeners(items);
})
.catch(console.log);

const items=document.querySelector('.items');
function displayItems(jsonItems){
    for (let i=0; i < jsonItems.length; i++) {
        const item=document.createElement('li');
        const json=jsonItems[i];
        item.setAttribute('class','item');
        item.setAttribute('data-color',json['color']);
        item.setAttribute('data-type',json['type']);
        item.innerHTML=`<img src="${json['image']}" class="item__thumbnail" alt="${json['type']}">${json['gender']}, ${json['size']}`;
        items.append(item);
    }
}

function setEventListeners(){

}
const btns=document.querySelector('.buttons');
btns.addEventListener('click',(e)=>{
    const target=e.target;
    if(target.nodeName!=='IMG'&&target.nodeName!=='BUTTON'){
        return;
    }else{
        filtering(target);
    }
})
function filtering(target){
    if(target.nodeName==='IMG'){
        filterItem(target.parentNode.getAttribute('data-type'));
    }else{
        filterItem(target.getAttribute('data-color'));
    }
}
function filterItem(info){
    const itemArray=document.querySelectorAll('.item');    
    for (let item of itemArray) {
        if((item.getAttribute('data-type')===info)||(item.getAttribute('data-color')===info)){
            item.classList.remove('hidden');
        }else{
            item.classList.add('hidden');
        }
    }
};