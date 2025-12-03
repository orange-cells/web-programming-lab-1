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

document.querySelector('.shoppingCart').addEventListener('click', (event) => {

    let clickedButton = event.target;
    let itemID = clickedButton.parentElement.parentElement.dataset.id;

    if (clickedButton.classList.contains('less') || clickedButton.classList.contains('more')) {
        let type = 'less';
        if (clickedButton.classList.contains('more')) {
            type = 'more';
        }
        changeCartQuantity(itemID, type);
    }
})

const changeCartQuantity = (itemID, type) => {
    let itemInCart = cart.findIndex((value) => value.itemId === itemID);
    console.log(itemID, itemInCart, cart[itemID]);
    if (itemInCart >= 0) {
        switch (type) {
            case 'more':
                cart[itemInCart].quantity = cart[itemInCart].quantity + 1;
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

if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
    addCartToHTML();
}
