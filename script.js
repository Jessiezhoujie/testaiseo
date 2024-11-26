// Event listener for the manufacturer dropdown to show/hide the "other" input field
document.getElementById('manufacturer').addEventListener('change', function () {
    const otherInput = document.getElementById('otherManufacturer');
    if (this.value === 'Other') {
        otherInput.style.display = 'block';
        otherInput.required = true;
    } else {
        otherInput.style.display = 'none';
        otherInput.required = false;
    }
});

// Form submission event
document.getElementById('valueCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting to demonstrate calculation

    // Get values from the form inputs
    const age = parseInt(document.getElementById('age').value);
    const size = parseInt(document.getElementById('size').value);
    const condition = document.getElementById('condition').value;
    const rooms = parseInt(document.getElementById('rooms').value);
    const manufacturer = document.getElementById('manufacturer').value;
    const locationDemand = document.getElementById('locationDemand').value;
    const type = document.getElementById('type').value;

    let baseValue = 5000; // Starting value for the mobile home

    // Adjust value based on age
    if (age < 5) {
        baseValue += 5000; // New homes are worth more
    } else if (age < 10) {
        baseValue += 3000;
    } else if (age < 20) {
        baseValue += 1000;
    } else {
        baseValue -= 2000; // Older homes depreciate
    }

    // Adjust value based on size
    if (size > 2000) {
        baseValue += 8000; // Larger homes are worth more
    } else if (size > 1000) {
        baseValue += 4000;
    } else {
        baseValue += 1000; // Smaller homes are worth less
    }

    // Adjust value based on condition
    if (condition === 'excellent') {
        baseValue += 5000;
    } else if (condition === 'good') {
        baseValue += 3000;
    } else if (condition === 'fair') {
        baseValue += 1000;
    } else if (condition === 'poor') {
        baseValue -= 2000; // Poor condition homes are worth less
    }

    // Adjust value based on number of rooms
    baseValue += rooms * 500; // Each additional room increases value

    // Adjust value based on manufacturer
    if (manufacturer.includes('Premium')) {
        baseValue += 7000; // Premium manufacturers add value
    } else if (manufacturer.includes('Standard')) {
        baseValue += 4000;
    } else if (manufacturer.includes('Budget')) {
        baseValue += 1000;
    }

    // Adjust value based on location demand
    if (locationDemand === 'high') {
        baseValue += 5000; // High demand areas add more value
    } else if (locationDemand === 'moderate') {
        baseValue += 2000;
    } else {
        baseValue -= 2000; // Low demand areas decrease value
    }

    // Adjust value based on type of mobile home
    if (type === 'doubleWide') {
        baseValue += 5000; // Double-wide homes are worth more
    } else if (type === 'tripleWide') {
        baseValue += 10000; // Triple-wide homes are worth more
    }

    // Display the estimated value
    alert('Estimated Value of Your Mobile Home: $' + baseValue);
});
