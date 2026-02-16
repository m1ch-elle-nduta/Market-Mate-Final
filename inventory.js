// inventory.js
document.addEventListener("DOMContentLoaded", () => {
// Get the inventory table
const table = document.querySelector("table");


// Only run on the inventory page
if (!table) return;

// Load vegetables from localStorage
const vegetables = getVegetables();

// Create a row for each vegetable and append to table
vegetables.forEach((vegetable, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${vegetable.name}</td>
        <td>${vegetable.sold}</td>
        <td>${vegetable.stock}</td>
        <td>KSh ${vegetable.sellPrice}</td>
    `;
    table.appendChild(row);
});


});