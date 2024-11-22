function validatePhoneNumber(phoneNumber) {
    const phonePattern = /^\(\d{3}\) \d{3}-\d{7}$/;
    return phonePattern.test(phoneNumber);
}

function validateAgeAndBirthDate(birthDate, age) {
    const birthYear = new Date(birthDate).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear === parseInt(age);
}

function validateAndSave() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const birthDate = document.getElementById("birthDate").value.trim();
    const joiningDate = document.getElementById("joiningDate").value.trim();
    const qualification = document.getElementById("qualification").value;
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const phoneError = document.getElementById("phoneError");
    const dateError = document.getElementById("dateError");

    // Validation logic
    if (!name || !age || !birthDate || !joiningDate || !qualification || !phoneNumber) {
        alert("Please fill in all fields.");
        return;
    }
    if (!validatePhoneNumber(phoneNumber)) {
        phoneError.style.display = "block";
        return;
    } else {
        phoneError.style.display = "none";
    }
    if (!validateAgeAndBirthDate(birthDate, age)) {
        dateError.style.display = "block";
        return;
    } else {
        dateError.style.display = "none";
    }

    // Get gender from radio buttons
    const genderElements = document.getElementsByName("gender");
    let gender = "";
    for (const element of genderElements) {
        if (element.checked) {
            gender = element.value;
            break;
        }
    }

    const employeeData = {
        name,
        age,
        gender,
        birthDate,
        joiningDate,
        qualification,
        phoneNumber,
    };

    const editIndex = localStorage.getItem("editIndex");
    let allData = JSON.parse(localStorage.getItem("employeeData")) || [];

    if (editIndex !== null) {
        // Update existing data
        allData[editIndex] = employeeData;
        localStorage.removeItem("editIndex"); // Clear edit mode
    } else {
        // Add new data
        allData.push(employeeData);
    }

    localStorage.setItem("employeeData", JSON.stringify(allData));
    alert("Data saved successfully!");
    document.getElementById("infoForm").reset();
}


document.addEventListener("DOMContentLoaded", () => {
    const editIndex = localStorage.getItem("editIndex");
    if (editIndex !== null) {
        const allData = JSON.parse(localStorage.getItem("employeeData"));
        const data = allData[editIndex];

        // Populate the form fields with the selected data
        document.getElementById("name").value = data.name;
        document.getElementById("age").value = data.age;
        document.querySelector(`input[name="gender"][value="${data.gender}"]`).checked = true;
        document.getElementById("birthDate").value = data.birthDate;
        document.getElementById("joiningDate").value = data.joiningDate;
        document.getElementById("qualification").value = data.qualification;
        document.getElementById("phoneNumber").value = data.phoneNumber;
    }
});

