// Load the manufacturers list from the JSON file and populate the dropdown
function loadManufacturers() {
    fetch('manufacturers.json') // Path to the JSON file
        .then(response => response.json())
        .then(data => {
            const manufacturerSelect = document.getElementById('manufacturer');
            
            // Loop through categories (Premium, Standard, Budget, etc.)
            for (const category in data) {
                const optgroup = document.createElement('optgroup');
                optgroup.label = category;

                data[category].forEach(manufacturer => {
                    const option = document.createElement('option');
                    option.value = manufacturer.value;
                    option.textContent = manufacturer.name + ` (${category})`;
                    optgroup.appendChild(option);
                });

                manufacturerSelect.appendChild(optgroup);
            }
        })
        .catch(error => console.error('Error loading manufacturers:', error));
}

// Function to calculate the value of the mobile home
function calculateHomeValue() {
    const homeAge = parseInt(document.getElementById('home-age').value);
    const homeSize = parseInt(document.getElementById('home-size').value);
    const homeCondition = document.getElementById('home-condition').value;
    const numRooms = parseInt(document.getElementById('num-rooms').value);
    const homeType = document.getElementById('home-type').value;
    const locationDemand = parseInt(document.getElementById('location-demand').value);
    const manufacturer = document.getElementById('manufacturer').value;

    let value = 50000; // Base value for a used mobile home

    // Age of Home: Deduct value based on the age
    if (homeAge <= 5) {
        value *= 1.2; // New homes get a boost
    } else if (homeAge > 20) {
        value *= 0.8; // Older homes lose value
    }

    // Size of Home: Increase value based on size
    value += homeSize * 15;

    // Condition of Home: Adjust value based on condition
    if (homeCondition === 'excellent') {
        value *= 1.3;
    } else if (homeCondition === 'good') {
        value *= 1.1;
    } else if (homeCondition === 'fair') {
        value *= 0.9;
    } else {
        value *= 0.7;
    }

    // Number of Rooms:
