// add-stock.js
document.addEventListener("DOMContentLoaded", () => {
// Get the add stock form
const form = document.getElementById("add-form");


// Only run on the add stock page
if (!form) return;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Build vegetable object from form values
    // parseFloat converts text values to numbers so comparisons work correctly
    const vegetable = {
        name:      form.name.value.trim(),
        stock:     parseFloat(form.stock.value),
        buyPrice:  parseFloat(form.buy.value),
        sellPrice: parseFloat(form.sell.value),
        sold:      0,
        createdAt: new Date().toLocaleString()
    };

    // Validation
    if (!vegetable.name || !vegetable.stock) {
        alert("Please fill in required fields");
        return;
    }

    // Save to localStorage and reset form
    const vegetables = getVegetables();
    vegetables.push(vegetable);
    saveVegetables(vegetables);
    alert("Stock added successfully!");
    form.reset();
});


});