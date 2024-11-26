document.addEventListener('DOMContentLoaded', function() {
    // Fetch manufacturers data from the external JSON file
    fetch('manufacturers.json')
        .then(response => response.json())
        .then(data => {
            populateManufacturers(data.manufacturers);
        })
        .catch(error => {
            console.error('Error fetching manufacturers:', error);
        });
});

// Populate manufacturer dropdown list
function populateManufacturers(manufacturers) {
    const manufacturerSelect = document.getElementById('manufacturer');
    
    // Clear existing options (in case there are any default ones)
    manufacturerSelect.innerHTML = '';

    // Create and append manufacturer options
    manufacturers.forEach(function(manufacturer) {
        const option = document.createElement('option');
        option.value = manufacturer.name;
        option.textContent = `${manufacturer.name} (${manufacturer.classification})`;
        manufacturerSelect.appendChild(option);
    });
}

// Calculation logic (same as before)
function calculateHomeValue() {
    let age = parseFloat(document.getElementById('age').value);
    let size = parseFloat(document.getElementById('size').value);
    let condition = document.getElementById('condition').value;
    let numRooms = parseInt(document.getElementById('numRooms').value);
    let homeType = document.getElementById('homeType').value;
    let locationDemand = document.getElementById('locationDemand').value;
    let manufacturer = document.getElementById('manufacturer').value;

    // Check if all fields are filled
    if (!age || !size || !condition || !numRooms || !homeType || !locationDemand || !manufacturer) {
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('errorMessage').textContent = 'All fields are required!';
        return;
    } else {
        document.getElementById('errorMessage').style.display = 'none';
    }

    // Basic value calculation (example)
    let baseValue = size * 50; // Example base value

    // Adjust for condition
    if (condition === 'Good') {
        baseValue *= 1.2;
    } else if (condition === 'Fair') {
        baseValue *= 1.0;
    } else if (condition === 'Poor') {
        baseValue *= 0.8;
    }

    // Adjust for home type
    if (homeType === 'Double Wide') {
        baseValue *= 1.5;
    }

    // Adjust for number of rooms
    baseValue += numRooms * 2000;

    // Adjust for location demand
    if (locationDemand === 'High') {
        baseValue *= 1.3;
    } else if (locationDemand === 'Medium') {
        baseValue *= 1.1;
    } else {
        baseValue *= 0.9;
    }

    // Adjust for manufacturer
    if (manufacturer === 'Clayton Homes') {
        baseValue *= 1.4;
    } else if (manufacturer === 'Palm Harbor Homes') {
        baseValue *= 1.3;
    }

    // Display the result
    document.getElementById('result').textContent = `Estimated Home Value: $${baseValue.toFixed(2)}`;
}
