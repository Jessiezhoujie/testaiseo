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

document.getElementById('valueCalculatorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting for demo purposes

    // Example calculation logic - replace with actual logic
    const age = parseInt(document.getElementById('age').value);
    const size = parseInt(document.getElementById('size').value);
    const condition = document.getElementById('condition').value;
    const rooms = parseInt(document.getElementById('rooms').value);
    const manufacturer = document.getElementById('manufacturer').value;

    let value = 5000; // base value

    // Apply modifiers based on age
    if (age < 5) value += 5000; // Newer homes are worth more
   
