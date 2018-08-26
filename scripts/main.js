/**
 * Employee Directory API
 *      Get data about 12 random people from the random user API
 *      Populate the DOM with employee information, including a modal with detailed info about the employee
 */

const gridItems = document.querySelectorAll('.grid-box');
const overlay = document.querySelector('.overlay');
const modal = document.getElementById('js-modal');
const closeIcon = document.querySelector('.close');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const apiResults = []; //store the response from the random user API

//--------------
// FETCH API
//--------------
function fetchData(){
    fetch('https://randomuser.me/api/?results=12&nat=us')
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Network response was not ok.');
            }
        })
        .then(data => storeData(data))
        .catch(err => handleErrors(err));
}

//--------------
// FUNCTIONS
//--------------

//Store the reponse in an array then call the function to populate the html with employee info
function storeData(data) {
    apiResults.push(...data.results);

    populateGrid(apiResults);
}

function handleErrors(err){
    const html = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <h2>Oops, we encountered an error! Please try again later.</h2>
            <h4>${err.message}</h4>
        </div>
    `;
    document.querySelector('.grid').innerHTML = html;
}

//Fill the grid items with information from the API
function populateGrid(employees){
    gridItems.forEach( (item, i) => {
        item.querySelector('img.api-img').src = employees[i].picture.large ;
        item.querySelector('h2.name').innerHTML = `${employees[i].name.first} ${employees[i].name.last}` ;
        item.querySelector('p.email').innerHTML = employees[i].email ;
        item.querySelector('p.location').innerHTML = employees[i].location.city ;
        item.dataset.position = i;
    });
}

//convert the birthday to a mm/dd/yy format 
function convertDate(date) {
    const shortDate = date.substr(0, 10);
    const mm = shortDate.slice(5, 7);
    const dd = shortDate.slice(8, 10);
    const yy = shortDate.slice(2, 4);  
    return `${mm}/${dd}/${yy}`;
}

//Cycle through the directory while staying in the modal
function navigateModal(e){
    e.stopPropagation();
    //find the user that is currently being shown(get the index)
    const current = this.parentElement.parentElement.parentElement;
    const index = parseInt(current.dataset.index);
    //if on last user jump to first and vice versa
    if (index === 11 && this === next) {
        showModal(0);
        return; // exit
    } else if (index === 0 && this === prev) {
        showModal(11);
        return; //exit!
    }
    //cycle through the users
    if (this === prev) {
        showModal(index - 1);
    } else if (this === next) {
        showModal(index + 1);
    }
}

//When a grid item is clicked, show the modal with that employees information
function showModal(i) {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    //set the modal index to be used to navigate through the apiResults
    modal.dataset.index = i;
    
    const mdImg = document.querySelector('img.md-img');
    mdImg.src = apiResults[i].picture.large;
    
    const mdH2 = document.querySelector('h2.md-h2');
    mdH2.innerHTML = `${apiResults[i].name.first} ${apiResults[i].name.last}`;
    
    const mdEmail = document.querySelector('p.md-email');
    mdEmail.innerHTML = apiResults[i].email;
    
    const mdLocation = document.querySelector('p.md-location');
    mdLocation.innerHTML = apiResults[i].location.city;
    
    const mdPhone = document.querySelector('.md-phone');
    mdPhone.innerHTML =  apiResults[i].phone;

    const mdAddress = document.querySelector('.md-address');
    mdAddress.innerHTML =  `${apiResults[i].location.street} 
                            ${apiResults[i].location.city}, 
                            ${abbrState(apiResults[i].location.state, 'abbr')}
                            ${apiResults[i].location.postcode}`;
    
    const mdDOB = document.querySelector('.md-dob');
    mdDOB.innerHTML = `Birthday: ${convertDate(apiResults[i].dob.date)}`;
    document.querySelector('.results').innerText = `${i + 1} of 12 results.`;
}

//--------------
// EVENT HANDLERS
//--------------

gridItems.forEach(gridItem => gridItem.addEventListener('click', function() {
    const i = parseInt(this.dataset.position);
    showModal(i);
}));

//use bubbling to hide the modal and overlay
document.body.addEventListener('click', (e) => {
    if (e.target == overlay || e.target == closeIcon) {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }
});

//navigate through the directory while staying in the modal
prev.addEventListener('click', navigateModal);
next.addEventListener('click', navigateModal);


//start the app
fetchData();