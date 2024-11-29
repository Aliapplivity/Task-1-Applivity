// Function to validate birth date and age
function validateAgeAndBirthDate() {
  const age = parseInt(document.getElementById("age").value.trim());
  const birthDate = new Date(document.getElementById("birthDate").value.trim());
  
  if (isNaN(birthDate.getTime()) || isNaN(age)) {
    return false; // Invalid birth date or age
  }

  const today = new Date();
  const calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const isBeforeBirthday =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

  const exactAge = isBeforeBirthday ? calculatedAge - 1 : calculatedAge;

  return exactAge === age; // Return true if the age matches
}

// Main form submission handler
document.getElementById("infoForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get form field values
  const name = document.getElementById("name").value.trim();
  const age = document.getElementById("age").value.trim();
  const gender = document.querySelector('input[name="gender"]:checked');
  const birthDate = document.getElementById("birthDate").value.trim();
  const joiningDate = document.getElementById("joiningDate").value.trim();
  const qualification = document.getElementById("qualification").value.trim();
  const phoneNumber = document.getElementById("phoneNumber").value.trim();

  // Clear existing error messages
  const errorMessages = document.querySelectorAll(".error-message");
  errorMessages.forEach((el) => (el.textContent = ""));

  // Validation logic
  let isValid = true;

  if (name === "") {
    document.getElementById("nameError").textContent = "Name cannot be empty.";
    isValid = false;
  }
  if (age === "" || isNaN(age) || age < 18 || age > 100) {
    document.getElementById("ageError").textContent = "Age must be between 18 and 100.";
    isValid = false;
  }
  if (!gender) {
    document.getElementById("genderError").textContent = "Please select a gender.";
    isValid = false;
  }
  if (birthDate === "" || !validateAgeAndBirthDate()) {
    document.getElementById("birthDateError").textContent = "Birth date and age must match.";
    isValid = false;
  }
  if (joiningDate === "") {
    document.getElementById("joiningDateError").textContent = "Joining date cannot be empty.";
    isValid = false;
  }
  if (qualification === "") {
    document.getElementById("qualificationError").textContent = "Please select a qualification.";
    isValid = false;
  }
  const phonePattern = /^\+\d{1,3}-\d{3}-\d{7}$/;
  if (!phonePattern.test(phoneNumber)) {
    document.getElementById("phoneNumberError").textContent =
      "Phone number must be in the format +123-456-7890123.";
    isValid = false;
  }

  // If form is invalid, stop further processing
  if (!isValid) return;

  // Store data in localStorage
  const formData = {
    name,
    age,
    gender: gender.value,
    birthDate,
    joiningDate,
    qualification,
    phoneNumber,
  };

  let employees = JSON.parse(localStorage.getItem("employees")) || [];
  const editIndex = localStorage.getItem("editIndex");

  if (editIndex !== null) {
    // Update the existing record
    employees[editIndex] = formData;
    localStorage.removeItem("editIndex");
  } else {
    // Add a new record
    employees.push(formData);
  }

  localStorage.setItem("employees", JSON.stringify(employees));

  alert("Form submitted successfully!");
  document.getElementById("infoForm").reset(); // Reset the form
  window.location.href = "view.html"; // Redirect to the view page
});

// Prefill form if editing
window.onload = function () {
  const editData = JSON.parse(localStorage.getItem("editData"));
  if (editData) {
    document.getElementById("name").value = editData.name;
    document.getElementById("age").value = editData.age;
    document.querySelector(`input[name="gender"][value="${editData.gender}"]`).checked = true;
    document.getElementById("birthDate").value = editData.birthDate;
    document.getElementById("joiningDate").value = editData.joiningDate;
    document.getElementById("qualification").value = editData.qualification;
    document.getElementById("phoneNumber").value = editData.phoneNumber;

    // Clear edit data after prefilling
    localStorage.removeItem("editData");
  }
};
