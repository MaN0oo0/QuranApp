//set variable ===>

let btnserach=document.getElementById("serach");
let showSerach=document.getElementById("showSerach");
let btnadd=document.querySelector(".Catogray");





btnserach.onclick=function(){
    this.classList.add("d-none");
showSerach.classList.remove("d-none")
showSerach.innerHTML="<div class='input-group'> <input type='text'> <button class='btn btn-primary'>Serach</button>";
}


let toggler=document.querySelector(".toggle");
let header=document.querySelector(".header");
let close=document.querySelector(".close");
let btn_order=document.querySelector(".btn-order");



toggler.onclick=function(){
    header.classList.add("open");
}
close.onclick=function(){
    header.classList.remove("open");
}
btn_order.onclick=function(){
    header.classList.remove("open");
}
