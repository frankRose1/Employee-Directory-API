const userInfo = document.querySelector('div.user-info');
//--------------
// FETCH API
//--------------
fetchData('https://randomuser.me/api/')
    .then(data => getEmployeeInfo(data.results[0]))

//--------------
// FUNCTIONS
//--------------

function fetchData(url) {
return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(`It looks like we encountered an error!, ${error}`))
}

function getEmployeeInfo(data) {
    const gridBox = document.querySelectorAll('.grid-box')[0];
    //img info
    const img = document.getElementById('api-img');
    img.src = data.picture.large;
    
    //name info
    const empName = document.querySelector('h2.name');
    empName.innerHTML = `${data.name.first} ${data.name.last}`;
    
    //email info
    const email = document.querySelector('p.email');
    email.innerHTML = data.email;
    
    //location info
    const location = document.querySelector('p.location');
    location.innerHTML = data.location.city;
}
