let shoppingCartImg = document.querySelector('.cart-image');
let closeButton = document.querySelector('.shoppingCart .close')
let body = document.querySelector('body');

shoppingCartImg.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeButton.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
