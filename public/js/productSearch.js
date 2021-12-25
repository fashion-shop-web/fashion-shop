const searchBar = document.getElementById('serch');
const advanceSearchButton = document.getElementById('search-button');

searchBar.onkeydown = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
        document.location.href = (`/product/search?name=${e.target.value}`);
    }
}

advanceSearchButton.onclick=function(){
    var name = document.getElementById("name");
    var categories = document.getElementById("categories");
    var brand = document.getElementById("brand");
    var discount = document.getElementById("discount");

    document.location.href = (`/product/advancesearch?name=${name.value}&category=${categories.value}
&brand=${brand.value}&sale=${discount.value}`);
}