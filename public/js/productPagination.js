
const ListPage = Array.from(document.querySelectorAll('.pagination .page-list .page a'));
ListPage.pop();
ListPage.shift();
const Product = document.querySelector('#current-page');
const forward = document.querySelector('.pagination .page-list .page:last-child a');
const backward = document.querySelector('.pagination .page-list .page:first-child a');

const handleNextPage = (event) => {
    event.preventDefault();
    const currentPage = parseInt(Product.getAttribute('name')) - 1;
    if (currentPage === ListPage.length - 1) {
        return;
    } else {
        ListPage[currentPage + 1].click();
    }
}

const handleBackPage = (event) => {
    event.preventDefault();
    const currentPage = parseInt(Product.getAttribute('name')) - 1;
    if (currentPage === 0) {
        return;
    } else {
        ListPage[currentPage - 1].click();
    }
}

const handleChangeCurrentPage = (e) => {
    for (let i = 0; i < ListPage.length; i++) {
        ListPage[i].parentElement.classList.remove('current-page');
    }
    e.target.parentElement.classList.add('current-page');
}

if (Product) {
    ListPage[parseInt(Product.getAttribute('name')) - 1]?.parentElement.classList.add('current-page');
    for (let i = 0; i < ListPage.length; i++) {
        ListPage[i].addEventListener('click', event => handleChangeCurrentPage(event));
    }
}

if (forward || backward) {
    forward.addEventListener('click', event => handleNextPage(event));
    backward.addEventListener('click', event => handleBackPage(event));
}


