const grid = document.querySelectorAll('.grid-box');
//--------------
// FETCH API
//--------------
for (let i = 0; i < grid.length; i++) {
    fetchData('https://randomuser.me/api/')
    .then(data => getEmployeeInfo(data.results[0], i))
}

//--------------
// FUNCTIONS
//--------------

function fetchData(url) {
return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(`It looks like we encountered an error!, ${error}`))
}

function getEmployeeInfo(data, i) {
    let gridBox = grid[i];

    //img info
    const img = gridBox.querySelector('img.api-img');
    img.src = data.picture.large;
    
    //name info
    const empName = gridBox.querySelector('h2.name');
    empName.innerHTML = `${data.name.first} ${data.name.last}`;
    
    //email info
    const email = gridBox.querySelector('p.email');
    email.innerHTML = data.email;
    
    //location info
    const location = gridBox.querySelector('p.location');
    location.innerHTML = data.location.city;
}
