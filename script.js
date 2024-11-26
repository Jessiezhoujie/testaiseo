// JavaScript for Used Mobile Home Value Calculator
document.getElementById("calculateBtn").addEventListener("click", function () {
    // Get input values
    const ageInput = document.getElementById("age");
    const conditionInput = document.getElementById("condition");
    const locationInput = document.getElementById("location");
    const sizeInput = document.getElementById("size");
    const typeInput = document.getElementById("type");
    const roomsInput = document.getElementById("rooms");
    const manufacturerInput = document.getElementById("manufacturer");

    const age = parseInt(ageInput.value);
    const condition = parseFloat(conditionInput.value);
    const location = parseFloat(locationInput.value);
    const size = parseInt(sizeInput.value);
    const type = parseFloat(typeInput.value);
    const rooms = parseInt(roomsInput.value);
    const manufacturer = manufacturerInput.value.trim().toLowerCase();

    // Validation: Check for required fields
    if (!age || !condition || !location || !size || !type || !rooms || !manufacturer) {
        alert("All fields are required. Please fill out all inputs.");
        return;
    }

    // Validation: Ensure valid input ranges
    if (age < 0) {
        alert("Age must be a positive number.");
        ageInput.focus();
        return;
    }
    if (size <= 0) {
        alert("Size must be greater than zero.");
        sizeInput.focus();
        return;
    }
    if (rooms <= 0) {
        alert("Number of rooms must be greater than zero.");
        roomsInput.focus();
        return;
    }

    // Calculation Logic

    // Base Value
    let baseValue = 50000; // Default base value in USD

    // Adjust for Mobile Home Type
    if (type === 1) {
        baseValue *= 1; // Single-wide
    } else if (type === 1.5) {
        baseValue *= 1.5; // Double-wide
    }

    // Adjust for Location
    if (location === 1) {
        baseValue *= 1; // Low-demand area
    } else if (location === 1.5) {
        baseValue *= 1.5; // Moderate-demand area
    } else if (location === 2) {
        baseValue *= 2; // High-demand area
    }

    // Adjust for Condition
    if (condition === 1) {
        baseValue *= 0.8; // Poor
    } else if (condition === 1.2) {
        baseValue *= 1; // Fair
    } else if (condition === 1.5) {
        baseValue *= 1.2; // Good
    } else if (condition === 2) {
        baseValue *= 1.5; // Excellent
    }

    // Apply Depreciation for Age
    const depreciationRate = 0.03; // 3% depreciation per year
    const depreciationFactor = Math.max(0, 1 - age * depreciationRate);
    baseValue *= depreciationFactor;

    // Adjust for Size
    const sizeFactor = size / 1000; // Assume 1,000 sqft is standard size
    baseValue *= sizeFactor;

    // Adjust for Number of Rooms
    const roomFactor = rooms / 5; // Assume 5 rooms is standard
    baseValue *= roomFactor;

    // Adjust for Manufacturer
    const premiumManufacturers = ["clayton homes", "palm harbor homes", "golden west homes", "champion homes", "silvercrest homes", "skyline homes", "cavco homes"];
    const standardManufacturers = ["fleetwood homes", "adventure homes", "fairmont homes", "sunshine homes", "nashua homes", "redman homes", "oak creek homes"];
    const budgetManufacturers = ["legacy housing", "tru homes", "hamilton homebuilders", "southern energy homes", "jessup housing", "deer valley homes"];

    if (premiumManufacturers.includes(manufacturer)) {
        baseValue *= 1.3; // Premium brand increases value by 30%
    } else if (standardManufacturers.includes(manufacturer)) {
        baseValue *= 1; // Standard brand
    } else if (budgetManufacturers.includes(manufacturer)) {
        baseValue *= 0.8; // Budget brand decreases value by 20%
    } else {
        baseValue *= 0.9; // "Other" option applies a minor decrease (10%)
    }

    // Ensure final value is non-negative
    baseValue = Math.max(0, baseValue);

    // Display the Result
    const valueOutput = document.getElementById("valueOutput");
    valueOutput.textContent = `The estimated value of your mobile home is $${baseValue.toFixed(2)}`;
});
