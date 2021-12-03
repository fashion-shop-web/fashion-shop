const searchBar = document.getElementById('serch');

searchBar.onkeydown = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
        document.location.href = (`/product/search?name=${e.target.value}`);
    }
}