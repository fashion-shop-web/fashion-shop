//for men
const menListPage = Array.from(document.querySelectorAll('.men-pagination .page-list .page a'));
menListPage.pop();
menListPage.shift();
const menProduct = document.querySelector('#men-current-page');
const forwardMen = document.querySelector('.men-pagination .page-list .page:last-child a');
const backwardMen = document.querySelector('.men-pagination .page-list .page:first-child a');

const handleNextPage = (event) => {
    event.preventDefault();
    const currentPage = parseInt(menProduct.getAttribute('name')) - 1;
    if (currentPage === menListPage.length - 1) {
        return;
    } else {
        menListPage[currentPage + 1].click();
    }
}

const handleBackPage = (event) => {
    event.preventDefault();
    const currentPage = parseInt(menProduct.getAttribute('name')) - 1;
    if (currentPage === 0) {
        return;
    } else {
        menListPage[currentPage - 1].click();
    }
}

const handleChangeMenCurrentPage = (e) => {
    for (let i = 0; i < menListPage.length; i++) {
        menListPage[i].parentElement.classList.remove('current-page');
    }
    e.target.parentElement.classList.add('current-page');
}

if (menProduct) {
    menListPage[parseInt(menProduct.getAttribute('name')) - 1].parentElement.classList.add('current-page');
    for (let i = 0; i < menListPage.length; i++) {
        menListPage[i].addEventListener('click', event => handleChangeMenCurrentPage(event));
    }
}

if (forwardMen || backwardMen) {
    forwardMen.addEventListener('click', event => handleNextPage(event));
    backwardMen.addEventListener('click', event => handleBackPage(event));
}

//for women
const womenListPage = Array.from(document.querySelectorAll('.women-pagination .page-list .page a'));
womenListPage.pop();
womenListPage.shift();

const womenProduct = document.querySelector('#women-current-page');
const forwardWomen = document.querySelector('.women-pagination .page-list .page:last-child a');
const backwardWomen = document.querySelector('.women-pagination .page-list .page:first-child a');

const handleChangeWomenCurrentPage = (e) => {
    for (let i = 0; i < womenListPage.length; i++) {
        womenListPage[i].parentElement.classList.remove('current-page');
    }
    e.target.parentElement.classList.add('current-page');
}

const handleNextPageW = (event) => {
    event.preventDefault();
    const currentPage = parseInt(womenProduct.getAttribute('name')) - 1;
    if (currentPage === womenListPage.length - 1) {
        return;
    } else {
        womenListPage[currentPage + 1].click();
    }
}

const handleBackPageW = (event) => {
    event.preventDefault();
    const currentPage = parseInt(womenProduct.getAttribute('name')) - 1;
    if (currentPage === 0) {
        return;
    } else {
        womenListPage[currentPage - 1].click();
    }
}

if (womenProduct) {
    womenListPage[parseInt(womenProduct.getAttribute('name')) - 1].parentElement.classList.add('current-page');
    for (let i = 0; i < womenListPage.length; i++) {
        womenListPage[i].addEventListener('click', event => handleChangeWomenCurrentPage(event));
    }
}

if (forwardWomen || backwardWomen) {
    forwardWomen.addEventListener('click', event => handleNextPageW(event));
    backwardWomen.addEventListener('click', event => handleBackPageW(event));
}

