let shoppingCartImg = document.querySelector('.cart-image');
let shoppingCartImgSpan = document.querySelector('.cart-image span');
let closeButton = document.querySelector('.shoppingCart .close')
let body = document.querySelector('body');
let catalog = document.querySelector('.catalog');
let cartItems = document.querySelector('.productList');

let makeOrder = document.querySelector('.shoppingCart .order');
let closeCheckout = document.querySelector('.closeBtn');
let order = document.querySelector('.orderBody');
let popUp = document.querySelector('.popUp');
let sendOrder = document.querySelector('.makeOrder');
let totalSum = document.querySelector('.totalSum');

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
            <span class="remove">&times;</span>
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
    calculateTotalSum();
}

const storeCartInfo = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelector('.shoppingCart').addEventListener('click', (event) => {
    let clickedButton = event.target;
    if (clickedButton.classList.contains('less') || clickedButton.classList.contains('more') || clickedButton.classList.contains('remove')) {
        let type = 'less';
        let itemID = clickedButton.parentElement.parentElement.dataset.id;
        if (clickedButton.classList.contains('more')) {
            type = 'more';
        }
        if (clickedButton.classList.contains('remove')) {
            type = 'remove';
            itemID = clickedButton.parentElement.dataset.id;
        }
        changeCartQuantity(itemID, type);
    }
})

const changeCartQuantity = (itemID, type) => {
    let itemInCart = cart.findIndex((value) => value.itemId === itemID);
    if (itemInCart >= 0) {
        switch (type) {
            case 'more':
                cart[itemInCart].quantity = cart[itemInCart].quantity + 1;
                break;
            case 'remove':
                cart.splice(itemInCart, 1);
                break;
            default:
                let changeQuantity = cart[itemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[itemInCart].quantity = changeQuantity;
                } else {
                    cart.splice(itemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    storeCartInfo();
}

function calculateTotalSum() {
    let total = 0;
    cart.forEach(item => {
        let itemPrice = document.getElementById(item.itemId).querySelector('div.price').innerText.replace(' ₽', '');
        total += itemPrice * item.quantity;
    });
    totalSum.textContent = `Итого: ${total} ₽`;
    return total;
}

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    addCartToHTML();
}

makeOrder.addEventListener('click', () => {
    if (cart.length === 0) {
        document.querySelector('.emptyCart').classList.add('display');
    } else {
        order.classList.add('open');
    }
});

document.querySelector('.emptyCart .closeBtn').addEventListener('click', () => {
    document.querySelector('.emptyCart').classList.remove('display');
});

closeCheckout.addEventListener('click', () => {
    order.classList.remove('open');
});

document.querySelector('.orderBody .form').addEventListener('submit', (event) => {
    event.preventDefault();
    localStorage.clear();
    addCartToHTML();
    body.classList.toggle('showCart');
    popUp.classList.add('display');
    order.classList.remove('open'); 
});

document.querySelector('.popUp .closeBtn').addEventListener('click', () => {
    window.location.reload();
})

document.addEventListener('DOMContentLoaded', function () {
    addCartToHTML();
})
