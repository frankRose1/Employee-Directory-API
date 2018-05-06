const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid');
const grid = document.querySelectorAll('.grid-box');
const overlay = document.querySelector('.overlay');
const closeIcon = document.querySelector('.close');

//--------------
// FETCH API
//--------------
grid.forEach( gridBox => {
     fetchData('https://randomuser.me/api/')
    .then(data => getEmployeeInfo(data.results[0], gridBox))
});

//--------------
// FUNCTIONS
//--------------

function fetchData(url) {
return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(`It looks like we encountered an error!, ${error}`))
}

function getEmployeeInfo(data, gridBox) {
    let employeeGrid = gridBox;

    //img info
    const img = employeeGrid.querySelector('img.api-img');
    img.src = data.picture.large;
    
    //name info
    const empName = employeeGrid.querySelector('h2.name');
    empName.innerHTML = `${data.name.first} ${data.name.last}`;
    
    //email info
    const email = employeeGrid.querySelector('p.email');
    email.innerHTML = data.email;
    
    //location info
    const location = employeeGrid.querySelector('p.location');
    location.innerHTML = data.location.city;
}


//--------------
// EVENT HANDLERS
//--------------

gridContainer.addEventListener('click', () => {
    overlay.style.display = 'block';
}); 

body.addEventListener('click', (e) => {
    if (e.target == overlay || e.target == closeIcon) {
        overlay.style.display = 'none';
    }
});