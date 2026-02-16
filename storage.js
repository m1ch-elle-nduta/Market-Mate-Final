// storage.js
// Central file for handling localStorage logic

// Retrieve vegetables array from localStorage, or return empty array if none saved
function getVegetables() {
return JSON.parse(localStorage.getItem("mboga")) || [];
}

// Save updated vegetables array back to localStorage
function saveVegetables(vegetables) {
localStorage.setItem("mboga", JSON.stringify(vegetables));
}