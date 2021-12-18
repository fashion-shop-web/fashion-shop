//delete local storage when close tab
window.onclose = () => {
    window.localStorage.clear()
}

const isLogin = document.getElementById('is-login-user-id');

//check if have login but still have cart guest => fetch api
if (isLogin) {
    const userID = isLogin?.getAttribute('name');
    let guestCart = JSON.parse(localStorage.getItem('guestProduct'));

    if (guestCart?.length > 0) {
        guestCart = guestCart.map(item => {
            return {
                _id: item._id,
                finalPrice: Math.ceil(item.price - (item.price * item.sale / 100))
            }
        })
        const url = window.location.origin + `/api/cart/isUser`;
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ userID, guestCart }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data => {
                const totalText = document.getElementById('header-total-cart');
                totalText.innerText = data.len;
            })
            .then(() => {
                window.localStorage.clear()
            })
            .catch(err => console.log(err))
    }
}

//check if login for header cart number
if (!isLogin) {
    const totalText = document.getElementById('header-total-cart');
    const len = JSON.parse(localStorage.getItem('guestProduct'))?.length || 0;
    totalText.innerText = len;
}

//check if login to append cart
if (!isLogin) {
    const guestCartList = document.getElementById('guest-cart-list');
    const guestCart = JSON.parse(localStorage.getItem('guestProduct'));

    if (guestCartList) {
        if (!guestCart || guestCart.length === 0) {
            guestCartList.innerHTML = `<ul class="cart-header simpleCart_shelfItem">
                                    <li class="ring-in">Empty cart</li>
                                </ul>`
        } else {
            let totalPrice = 0;
            guestCart.forEach(item => {
                item.price = Math.ceil(item.price - (item.price * item.sale / 100))
                totalPrice += item.price;
            })
            cartListHTML = guestCart.map(item => {
                return (
                    `<ul class="cart-header simpleCart_shelfItem">
                <div class="close1" onclick="handleRemoveProduct(event)" id="${item.fakeID}"></div>
                <li class="ring-in"><a href="/product/${item.slug}"><img src="${item.image[0].secure_url}"
                            width="200px" height="200px" class="img-responsive" alt=""></a>
                </li>
                <li><span class="item-name">${item.name}</span></li>
                <li><span class="item_price">$ ${item.price}</span></li>
                <div class="clearfix"> </div>
                </ul>`
                )
            }).join('')
            cartListHTML += `<div class="row cart-total">
            <div class="col-md-8 col-sm-6 col-xs-4"></div>
            <div class="col-md-4 col-sm-6 col-xs-8">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-6">
                        <div class="cart-total-label">Ship:</div>
                        <div class="cart-total-label">Total price:</div>
                    </div>
                    <div class="col-md-6 col-sm-6 col-xs-6">
                            <div>$ 5</div>
                            <div id="cart-total-price-label">$ ${totalPrice + 5}</div>
                        </div>
                    </div>
                </div>
            </div>`

            guestCartList.innerHTML = cartListHTML
        }
    }
}

function addCart(e) {
    e.preventDefault();
    const loader = document.getElementById('detail-add-cart-loader');
    const addCartBtn = document.getElementById('detail-add-cart-button');
    const productID = document.getElementById('detail-product-id').getAttribute('name');
    const isLogin = document.getElementById('is-login-user-id');

    //display btn and loader
    loader.style.display = 'block';
    addCartBtn.style.display = 'none';

    const userID = isLogin?.getAttribute('name') || null;
    const url = window.location.origin + `/api/cart/${productID}`

    fetch(url, {
        method: 'POST',
        body: JSON.stringify({ userID }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(res => res.json())
        .then(data => {
            if (data.len) {
                const totalText = document.getElementById('header-total-cart');
                totalText.innerText = data.len;

            } else if (data.product) {
                const totalText = document.getElementById('header-total-cart');

                const guestProduct = JSON.parse(localStorage.getItem('guestProduct'));
                if (guestProduct) {
                    const newProduct = data.product;
                    newProduct.fakeID = `${guestProduct.length}-${newProduct._id}`
                    guestProduct.push(newProduct);
                    totalText.innerText = guestProduct.length;
                    window.localStorage.setItem('guestProduct', JSON.stringify(guestProduct))
                } else {
                    const newProduct = data.product;
                    newProduct.fakeID = `0-${newProduct._id}`
                    window.localStorage.setItem('guestProduct', JSON.stringify([newProduct]));
                    totalText.innerText = 1;
                }
            }
        })
        .then(() => {
            //return btn
            loader.style.display = 'none';
            addCartBtn.style.display = 'block';

            //notice
            const noticeText = document.getElementById('add-cart-notice');
            noticeText.innerText = '+ 1';
            setTimeout(() => noticeText.innerText = '', 1000);
        })
        .catch(err => console.log(err))
}



//butoon delete product in cart
function handleRemoveProduct(e) {
    const isLogin = document.getElementById('is-login-user-id');
    if (isLogin) {
        const userID = document.getElementById('cart-user-id').getAttribute('name');
        const loader = document.getElementById(`remove-cart-loader-${e.target.id}`);
        const url = window.location.origin + `/api/cart/${e.target.id}`;

        //display loader
        e.target.style.display = 'none';
        loader.style.display = 'block';

        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({ userID }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
            .then(res => res.json())
            .then(data => {
                const totalText = document.getElementById('header-total-cart');
                totalText.innerText = data.len;
                e.target.parentElement.remove();

                const totalPriceLabel = document.getElementById('cart-total-price-label');
                totalPriceLabel.innerText = data.total + 5;

                if (data.len === 0) {
                    const userCartList = document.getElementById('user-cart-list')
                    userCartList.innerHTML = `<ul class="cart-header simpleCart_shelfItem">
                                                 <li class="ring-in">Empty cart</li>
                                                 </ul>`
                }
            })
    } else {
        let guestCart = JSON.parse(localStorage.getItem('guestProduct'));
        guestCart = guestCart.filter(item => item.fakeID !== e.target.id);
        window.localStorage.setItem('guestProduct', JSON.stringify(guestCart));
        e.target.parentElement.remove();

        const totalText = document.getElementById('header-total-cart');
        totalText.innerText = guestCart.length;

        if (guestCart.length === 0) {
            const userCartList = document.getElementById('guest-cart-list')
            userCartList.innerHTML = `<ul class="cart-header simpleCart_shelfItem">
                                                 <li class="ring-in">Empty cart</li>
                                                 </ul>`
        } else {
            const totalPriceLabel = document.getElementById('cart-total-price-label');
            let totalPrice = 0;
            guestCart.forEach(item => {
                totalPrice += Math.ceil(item.price - (item.price * item.sale / 100));
            })
            totalPriceLabel.innerText = `$ ${totalPrice + 5}`
        }
    }
}

