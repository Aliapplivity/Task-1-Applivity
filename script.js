function validatePhoneNumber(phoneNumber) {
    //phone number format with area code: (123) 456-7890
    const phonePattern = /^\(\d{3}\) \d{3}-\d{7}$/;
    return phonePattern.test(phoneNumber);
}

function saveData() {
    const phoneNumber = document.getElementById("phoneNumber").value;
    const phoneError = document.getElementById("phoneError");

    // ! means revert state
    if (!validatePhoneNumber(phoneNumber)) {
        phoneError.style.display = "block"; 
        return; 
    } else {
        phoneError.style.display = "none"; 
    }

    // key: value
    const employeeData = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        gender: document.getElementById("gender").value,
        birthDate: document.getElementById("birthDate").value,
        joiningDate: document.getElementById("joiningDate").value,
        qualification: document.getElementById("qualification").value,
        phoneNumber: phoneNumber
    };

    let allData = JSON.parse(localStorage.getItem("employeeData")) || [];
    allData.push(employeeData);
    localStorage.setItem("employeeData", JSON.stringify(allData));
    alert("Data saved successfully!");
    document.getElementById("infoForm").reset();
}

