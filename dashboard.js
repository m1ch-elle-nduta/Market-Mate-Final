// dashboard.js
document.addEventListener("DOMContentLoaded", () => {
// Gets the total items element on the dashboard
const totalItemsEl = document.getElementById("total-items");


// Only run on the dashboard page
if (!totalItemsEl) return;

// Load vegetables from localStorage and display the count
const vegetables = getVegetables();
totalItemsEl.textContent = vegetables.length;


});