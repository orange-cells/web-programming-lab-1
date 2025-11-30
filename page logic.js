let shoppingCartImg = document.querySelector('.cart-image');
let closeButton = document.querySelector('.shoppingCart .close')
let body = document.querySelector('body');
let catalog = document.querySelector('.catalog');
let cart = [];

shoppingCartImg.addEventListener('click', () => {
    body.classList.toggle('showCart');
})
closeButton.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

catalog.addEventListener('click', (event) => {
    let positionClick = event.target.closest('.item');
    let itemId = positionClick.id;
    addToCart(itemId)
})

const addToCart = (itemId) => {
    let putItemInCart = cart.findIndex((value) => value.itemId == itemId);
    if (cart.length <= 0) {
        cart = [{
            itemId: itemId,
            quantity: 1
        }]
    } else if (putItemInCart < 0) {
        cart.push({
            itemId: itemId,
            quantity: 1
        });
    } else {
        cart[putItemInCart].quantity++;
    }
}
