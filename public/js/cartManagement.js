function addCart(e) {
    e.preventDefault();
    const loader = document.getElementById('detail-add-cart-loader');
    const addCartBtn = document.getElementById('detail-add-cart-button');
    const productID = document.getElementById('detail-product-id').getAttribute('name');
    const isLogin = document.getElementById('comment-user-id');

    //display btn and loader
    loader.style.display = 'block';
    addCartBtn.style.display = 'none';

    if (isLogin) {
        const userID = isLogin.getAttribute('name');
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
                if (data.error === 0 || data.error === 1) {
                    //deal w local storage to hot load
                    let totalItem = localStorage.getItem('cartTotal') || 0;
                    totalItem = parseInt(totalItem) + 1;
                    window.localStorage.setItem('user.totalCart', totalItem.toString());

                    //return btn
                    loader.style.display = 'none';
                    addCartBtn.style.display = 'block';

                    //notice
                    const noticeText = document.getElementById('add-cart-notice');
                    noticeText.innerText = '+ 1'
                    setTimeout(() => noticeText.innerText = '', 1000);

                }
            })
            .catch(err => console.log(err))
    } else {
        let totalItem = localStorage.getItem('totalCart') || 0;
        totalItem = parseInt(totalItem) + 1;
        window.localStorage.setItem('totalCart', totalItem.toString());

        //return btn
        loader.style.display = 'none';
        addCartBtn.style.display = 'block';

        //notice
        const noticeText = document.getElementById('add-cart-notice');
        noticeText.innerText = '+ 1'
        setTimeout(() => noticeText.innerText = '', 1000);
    }

}

const totalText = document.getElementById('header-total-cart-storage');
if (totalText) totalText.innerText = localStorage.getItem('totalCart') || 0;

//delete local storage when close tab
window.onunload = () => {
    window.localStorage.clear()
}

//butoon delete product in cart
function handleRemoveProduct(e) {
    if (e.target.id) {
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
                if (data.error === 0) {
                    const totalPriceLabel = document.getElementById('cart-total-price-label');
                    totalPriceLabel.innerText = data.cart.total + data.cart.ship;
                    e.target.parentElement.remove();
                }
            })
    } else {
        //deal with local storage
        e.target.parentElement.remove();
    }


}

