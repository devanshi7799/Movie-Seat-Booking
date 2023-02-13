const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

populateUI();

//save selected movie index and price
function setMovieData(movieIndex,moviePrice) {
  localStorage.setItem('SelectedMovieIndex',movieIndex);
  localStorage.setItem('SelectedMoviePrice',moviePrice);
}

//update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  //To store data in the local memory
  //copy the selected seats into an array 
  //map through the array
  //return a new array indexes 

  const seatsIndex = [...selectedSeats].map(function(seat) {
    return [...seats].indexOf(seat);

  });
  //... is a spread operator which eill copy the data of selectedseats variable into the array

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCounts = selectedSeats.length;

  count.innerText = selectedSeatsCounts;
  total.innerText = selectedSeatsCounts * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats!== null && selectedSeats.length>0) {
    seats.forEach((seat,index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

  if(selectedMovieIndex!==null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie Select Event
movieSelect.addEventListener('change' , e=> {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex,e.target.value);
  updateSelectedCount();
} )

//seat click event
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') &&
  !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
})

//Initial count and total seat
updateSelectedCount();