let shoppingCartImg = document.querySelector('.cart-image');
let body = document.querySelector('body');

shoppingCartImg.addEventListener('click', () => {
    body.classList.toggle('showCart')
})
