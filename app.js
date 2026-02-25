const products = [
    {
        id: 1,
        title: 'Петушок 1',
        price: 3000,
    },
    {
        id: 2,
        title: 'Петушок 2',
        price: 1800,
    },
    {
        id: 3,
        title: 'Марат',
        price: -1
    },
];

let orders = [];

function addToBasket(productId) {
    if (orders.findIndex(order => order.id === productId) !== -1) {
        alert('Данный товар уже есть в корзине.');
        return;
    } else {
        orders = [products.find(product => product.id === productId), ...orders]
        orders.sort((order1, order2) => order2.id - order1.id);
    }
    renderCart();
    rerenderTotalPrice();
}

function removeFromBasket(productId) {
    const indexRemove = orders.findIndex(order => order.id === productId);
    if (indexRemove === -1) {
        return;
    } else {
        orders.splice(indexRemove, 1);
    }
    renderCart();
    rerenderTotalPrice();
}

function rerenderTotalPrice() {

    const totalPrice = orders.reduce((acc, order) => {
        return acc + order.price;
    }, 0);
    document.getElementById('total').innerText = totalPrice;
}

function renderCart() {
    const cart = document.getElementById('basket-items');

    cart.innerHTML = '';
    orders.forEach(item => {
        const el = document.createElement('li');
        el.innerText = item.title;
        el.onclick = () => removeFromBasket(item.id);
        cart.appendChild(el);
    })
}