let shop = document.getElementById('shop');
let shopItemsData = [
    {
        id: "item1",
        name: "Casual Shirt",
        price: 45,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        img: "../images/shopping-cart-js/images/img-1.jpg"
    },
    {
        id: "item2",
        name: "Office Shirt",
        price: 100,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        img: "../images/shopping-cart-js/images/img-2.jpg"
    },
    {
        id: "item3",
        name: "T Shirt",
        price: 25,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        img: "../images/shopping-cart-js/images/img-3.jpg"
    },
    {
        id: "item4",
        name: "Men Suit",
        price: 400,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
        img: "../images/shopping-cart-js/images/img-4.jpg"
    },
];
let basket = JSON.parse(localStorage.getItem("Data")) || [];
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
                <img width="220" src="${img}" alt="">
                <div class="details">
                    <h3>${name}</h3>
                    <p>${desc}</p>
                    <div class="price-quantity">
                        <h2>$ ${price}</h2>
                        <div class="buttons">
                            <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                            <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                            <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>
                </div>
            </div>
    `;
    }).join(""));
};
generateShop();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("Data", JSON.stringify(basket));
    update(selectedItem);
};
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);
    if(search !== undefined){
        if (search.item === 0) {
            return;
        } else {
            search.item -= 1;
        }
    }
    update(selectedItem);
    basket = basket.filter((x)=>x.item !== 0);
    localStorage.setItem("Data", JSON.stringify(basket));
};
function update(id) {
    let search = basket.find((x) => x.id === id.id);
    id.innerHTML = search.item;
    cal();
};

let cal = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

cal(); 