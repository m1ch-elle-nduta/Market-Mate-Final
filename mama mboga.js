let vegetables = [];

// ── Storage helpers ──────────────────────────────────────────────────────────

function loadData() {
let savedData = localStorage.getItem("mboga");
if (savedData) {
vegetables = JSON.parse(savedData);
}
}

function saveData() {
localStorage.setItem("mboga", JSON.stringify(vegetables));
}

// ── Core logic ───────────────────────────────────────────────────────────────

function addVegetable(nameValue, stockValue, buyValue, sellValue) {
let newVegetable = {
name: nameValue,
stock: parseFloat(stockValue),
sold: 0,
buyPrice: parseFloat(buyValue),
sellPrice: parseFloat(sellValue)
};
vegetables.push(newVegetable);
saveData();
}

// ── Dashboard ────────────────────────────────────────────────────────────────

function updateDashboardDisplay() {
// Only show total number of items in stock
let itemCount = vegetables.length;


let totalItemsElement = document.getElementById("total-items");
if (totalItemsElement) totalItemsElement.textContent = itemCount;


}

// ── Messages ─────────────────────────────────────────────────────────────────

function showMessage(textValue) {
let addMessage  = document.getElementById("add-msg");
let saleMessage = document.getElementById("sale-msg");
if (addMessage)  addMessage.textContent  = textValue;
if (saleMessage) saleMessage.textContent = textValue;
}

function clearMessage() {
let addMessage  = document.getElementById("add-msg");
let saleMessage = document.getElementById("sale-msg");
if (addMessage)  addMessage.textContent  = "";
if (saleMessage) saleMessage.textContent = "";
}

// ── Sales dropdown ───────────────────────────────────────────────────────────

function populateSalesDropdown() {
let dropdown = document.getElementById("item");
if (dropdown == null) {
return;
}


// Resetting innerHTML safely clears all existing options
dropdown.innerHTML = "";

let defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.textContent = "Select item";
dropdown.appendChild(defaultOption);

for (let count = 0; count < vegetables.length; count = count + 1) {
    let vegetable = vegetables[count];
    if (vegetable.stock > 0) {
        let option = document.createElement("option");
        option.value = count;
        option.textContent = vegetable.name + " (" + vegetable.stock.toFixed(1) + "kg)";
        dropdown.appendChild(option);
    }
}


}

// ── Form handlers ─────────────────────────────────────────────────────────────

function handleAddStock(event) {
event.preventDefault();


let nameField  = document.getElementById("name").value.trim();
let stockField = document.getElementById("stock").value;
let buyField   = document.getElementById("buy").value;
let sellField  = document.getElementById("sell").value;

if (nameField.length < 1) {
    showMessage("Please enter a vegetable name");
    return;
}

let stockNum = parseFloat(stockField);
let buyNum   = parseFloat(buyField);
let sellNum  = parseFloat(sellField);

if (isNaN(stockNum) || stockNum <= 0) {
    showMessage("Please enter a valid stock quantity");
    return;
}
if (isNaN(buyNum) || buyNum <= 0) {
    showMessage("Please enter a valid buying price");
    return;
}
if (isNaN(sellNum) || sellNum <= 0) {
    showMessage("Please enter a valid selling price");
    return;
}
if (sellNum < buyNum) {
    showMessage("Selling price should not be lower than buying price");
    return;
}

addVegetable(nameField, stockNum, buyNum, sellNum);
showMessage("Stock added successfully!");
document.getElementById("add-form").reset();
updateDashboardDisplay();
setTimeout(clearMessage, 3000);


}

function handleSale(event) {
event.preventDefault();


let selectedIndex = document.getElementById("item").value;
let quantityField = document.getElementById("qty").value;

if (selectedIndex === "") {
    showMessage("Please select an item");
    return;
}

// Validate quantity — parseFloat("") returns NaN
let quantitySold = parseFloat(quantityField);
if (isNaN(quantitySold) || quantitySold <= 0) {
    showMessage("Please enter a valid quantity");
    return;
}

let vegetable = vegetables[selectedIndex];

if (quantitySold > vegetable.stock) {
    showMessage("Not enough stock available");
    return;
}

vegetable.stock = vegetable.stock - quantitySold;
vegetable.sold  = vegetable.sold  + quantitySold;
saveData();
showMessage("Sale recorded successfully!");
document.getElementById("sale-form").reset();
populateSalesDropdown();
updateDashboardDisplay();
setTimeout(clearMessage, 3000);


}

// ── Inventory ─────────────────────────────────────────────────────────────────

function updateInventoryDisplay() {
let emptyMsg        = document.getElementById("empty-msg");
let tableContainer  = document.getElementById("inventory-table-container");
let tableBody       = document.getElementById("inventory-body");


// Only run on the inventory page
if (emptyMsg == null) {
    return;
}

// Filter to items that have been sold at least once
let soldItems = [];
for (let count = 0; count < vegetables.length; count = count + 1) {
    if (vegetables[count].sold > 0) {
        soldItems.push(vegetables[count]);
    }
}

if (soldItems.length === 0) {
    // No sold items — show empty message, hide table
    emptyMsg.style.display       = "block";
    tableContainer.style.display = "none";
    return;
}

// Has sold items — hide empty message, show table
emptyMsg.style.display       = "none";
tableContainer.style.display = "block";

// Clear any existing rows before re-rendering
tableBody.innerHTML = "";

for (let count = 0; count < soldItems.length; count = count + 1) {
    let vegetable = soldItems[count];

    let row = document.createElement("tr");

    let nameCell  = document.createElement("td");
    let soldCell  = document.createElement("td");
    let stockCell = document.createElement("td");
    let priceCell = document.createElement("td");

    nameCell.textContent  = vegetable.name;
    soldCell.textContent  = vegetable.sold.toFixed(1);
    stockCell.textContent = vegetable.stock.toFixed(1);
    priceCell.textContent = "KSh " + vegetable.sellPrice.toFixed(2);

    row.appendChild(nameCell);
    row.appendChild(soldCell);
    row.appendChild(stockCell);
    row.appendChild(priceCell);

    tableBody.appendChild(row);
}


}

// ── Init ──────────────────────────────────────────────────────────────────────

document.addEventListener("DOMContentLoaded", function () {
loadData();


let addForm = document.getElementById("add-form");
if (addForm) {
    addForm.addEventListener("submit", handleAddStock);
}

let saleForm = document.getElementById("sale-form");
if (saleForm) {
    populateSalesDropdown();
    saleForm.addEventListener("submit", handleSale);
}

updateDashboardDisplay();
updateInventoryDisplay();


});