// JavaScript for Used Mobile Home Value Calculator
document.getElementById("calculateBtn").addEventListener("click", function () {
    // Get input values
    const ageInput = document.getElementById("age");
    const conditionInput = document.getElementById("condition");
    const locationInput = document.getElementById("location");
    const sizeInput = document.getElementById("size");
    const typeInput = document.getElementById("type");

    const age = parseInt(ageInput.value);
    const condition = parseFloat(conditionInput.value);
    const location = parseFloat(locationInput.value);
    const size = parseInt(sizeInput.value);
    const type = parseFloat(typeInput.value);

    // Validation: Check for required fields
    if (!age || !condition || !location || !size || !type) {
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

    // Ensure final value is non-negative
    baseValue = Math.max(0, baseValue);

    // Display the Result
    const valueOutput = document.getElementById("valueOutput");
    valueOutput.textContent = `The estimated value of your mobile home is $${baseValue.toFixed(2)}`;
});
