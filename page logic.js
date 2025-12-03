let shoppingCartImg = document.querySelector('.cart-image');
let shoppingCartImgSpan = document.querySelector('.cart-image span');
let closeButton = document.querySelector('.shoppingCart .close')
let body = document.querySelector('body');
let catalog = document.querySelector('.catalog');
let cartItems = document.querySelector('.productList');
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
    addCartToHTML();
    storeCartInfo();
}

const addCartToHTML = () => {
    cartItems.innerHTML = '';
    let totalQuantity = 0;

    if (cart.length > 0) {
        cart.forEach(item => {
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.itemId;
            let targetItem = document.getElementById(item.itemId);

            newItem.innerHTML = `
            <div class="image">
                <img src="${targetItem.querySelector('img').getAttribute('src') }">
            </div>
            <div class="name">
                ${targetItem.querySelector('h2').innerHTML}
            </div>
            <div class="price">
                ${targetItem.querySelector('div.price').innerText.replace(' ₽', '') * item.quantity}
            </div>
            <div class="quantity">
                <span class="less">-</span>
                <span>${item.quantity}</span >
                <span class="more">+</span>
            </div>`;
            cartItems.appendChild(newItem);
        });
    };
    shoppingCartImgSpan.innerText = totalQuantity;
}

const storeCartInfo = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    addCartToHTML();
}
