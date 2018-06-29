const body = document.querySelector('body');
const gridContainer = document.querySelector('.grid');
const grid = document.querySelectorAll('.grid-box');
const overlay = document.querySelector('.overlay');
const modal = document.getElementById('js-modal');
const closeIcon = document.querySelector('.close');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const arr = [];

//--------------
// FETCH API
//--------------
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(res => res.json())
    .then(data => storeData(data))
    .catch(err => handleErrors);

//--------------
// FUNCTIONS
//--------------

//store the reponse in an array then call the function to populate the html with employee info
function storeData(data) {
    arr.push(data);
    
    arr[0].results.forEach( function(employee, index) {
        getEmployeeInfo(employee, grid[index]);
    });
}

function handleErrors(){
    const html = `
        <div class="error">
            <i class="fas fa-exclamation-circle"></i>
            <h2>Oops, we encountered an error! Please try again later.</h2>
        </div>
    `;
    gridContainer.innerHTML = html;
}

//fills the 12 grid items with employee info from the API response
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

//shows the modal with the targeted employee's information
function showModal(i) {
    overlay.style.display = 'block';
    modal.style.display = 'block';
    modal.dataset.idx = i;
    const employeeData = arr[0].results;
    
    const mdImg = document.querySelector('img.md-img');
    mdImg.src = employeeData[i].picture.large;
    
    const mdH2 = document.querySelector('h2.md-h2');
    mdH2.innerHTML = `${employeeData[i].name.first} ${employeeData[i].name.last}`;
    
    const mdEmail = document.querySelector('p.md-email');
    mdEmail.innerHTML = employeeData[i].email;
    
    const mdLocation = document.querySelector('p.md-location');
    mdLocation.innerHTML = employeeData[i].location.city;
    
    const mdPhone = document.querySelector('.md-phone');
    mdPhone.innerHTML =  employeeData[i].phone;
   
    const mdAddress = document.querySelector('.md-address');
    mdAddress.innerHTML =  `${employeeData[i].location.street} 
                            ${employeeData[i].location.city}, 
                            ${abbrState(employeeData[i].location.state, 'abbr')}
                            ${employeeData[i].location.postcode}`;
    
    const mdDOB = document.querySelector('.md-dob');
    // mdDOB.innerHTML = `Birthday: ${convertDate(employeeData[i].dob)}`;
    document.querySelector('.results').innerText = `${i + 1} of 12 results.`;
}

//convert the date to a mm/dd/yy format 
function convertDate(date) {
    const shortDate = date.substring(0, 10);
    const mm = shortDate.slice(5, 7);
    const dd = shortDate.slice(8, 10);
    const yy = shortDate.slice(2, 4);  
    return `${mm}/${dd}/${yy}`; // return a template literal that will be input in to the modal html 
}

//to cycle through the modal windows
function navigateModal(e){
    e.stopPropagation();
    //find the user that is currently being shown(get the index)
    const current = this.parentElement.parentElement.parentElement;
    const idx = parseInt(current.dataset.idx);
    //if on last user jump to first and vice versa
    if (idx === 11 && this === next) {
        showModal(0);
        return; // exit
    } else if (idx === 0 && this === prev) {
        showModal(11);
        return; //exit!
    }
    //cycle through the users
    if (this === prev) {
        showModal(idx - 1);
    } else if (this === next) {
        showModal(idx + 1);
    }
}

//--------------
// EVENT HANDLERS
//--------------
for (let i = 0; i < grid.length; i++) {
        gridContainer.children[i].onclick = function () {
            showModal(i);
        };
    }

body.addEventListener('click', (e) => {
    if (e.target == overlay || e.target == closeIcon) {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }
});

prev.addEventListener('click', navigateModal);
next.addEventListener('click', navigateModal);