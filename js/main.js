const userInfo = document.querySelector('div.user-info');
//--------------
// FETCH API
//--------------
fetchData('https://randomuser.me/api/')
    .then(data => getImage(data.results[0].picture.large))


//--------------
// FUNCTIONS
//--------------

function fetchData(url) {
return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(`It looks like we encountered an error!, ${error}`))
}

function getImage(data) {
    const gridBox = document.querySelectorAll('.grid-box')[0];
    const img = document.getElementById('api-img');
    img.src = data;
}