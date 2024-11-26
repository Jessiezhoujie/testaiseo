document.addEventListener("DOMContentLoaded", function () {
    const manufacturerSelect = document.getElementById("manufacturer");
    const otherManufacturerInput = document.getElementById("otherManufacturer");

    manufacturerSelect.addEventListener("change", function () {
        if (manufacturerSelect.value === "Other") {
            otherManufacturerInput.style.display = "block";
            otherManufacturerInput.setAttribute("required", "true");
        } else {
            otherManufacturerInput.style.display = "none";
            otherManufacturerInput.removeAttribute("required");
        }
    });

    document.getElementById("calculateBtn").addEventListener("click", function () {
        const age = parseFloat(document.getElementById("age").value);
        const condition = parseFloat(document.getElementById("condition").value);
        const location = parseFloat(document.getElementById("location").value);
        const size = parseFloat(document.getElementById("size").value);
        const type = parseFloat(document.getElementById("type").value);
        const rooms = parseInt(document.getElementById("rooms").value, 10);
        const manufacturer = manufacturerSelect.value === "Other" 
            ? otherManufacturerInput.value 
            : manufacturerSelect.value;

        if (!age || !condition || !location || !size || !type || !rooms || !manufacturer) {
            alert("Please fill out all required fields.");
            return;
        }

        const baseValue = size * type * 50; // Example calculation base value
        const conditionFactor = baseValue * condition;
        const locationFactor = conditionFactor * location;
        const ageDepreciation = locationFactor - age * 200;
        const roomBonus = rooms * 1000;

        const finalValue = ageDepreciation + roomBonus;
        document.getElementById("valueOutput").textContent = 
            `The estimated value of your mobile home is: $${finalValue.toFixed(2)}`;
    });
});
