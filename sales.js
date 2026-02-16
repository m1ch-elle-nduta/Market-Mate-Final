// sales.js
// This file manages everything that happens on the sales page

document.addEventListener("DOMContentLoaded", () => {


const form = document.getElementById("sale-form");
if (!form) return;

const dropdown = document.getElementById("item");

// Reads vegetables from localStorage and builds the dropdown list
// Only vegetables that still have stock are shown as options
getVegetables().forEach((v, i) => {
    if (v.stock > 0) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = v.name + " (" + v.stock + "kg)";
        dropdown.appendChild(option);
    }
});

// Listen for when the user clicks Record Sale
form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Both fields must be filled before we proceed
    if (!dropdown.value || !form.qty.value) {
        alert("Please fill in required fields");
        return;
    }

    const vegetables = getVegetables();
    const vegetable  = vegetables[dropdown.value];
    const qty        = parseFloat(form.qty.value);

    // Cannot sell more than what is physically available  in stock
    if (qty > vegetable.stock) {
        alert("Not enough stock available");
        return;
    }

    //  Stop the sale if quantity exceeds what is available
    vegetable.stock -= qty;
    vegetable.sold  += qty;

    // Save so that numbers don't reset
    saveVegetables(vegetables);
    alert("Sale recorded successfully!");
    form.reset();
});


});