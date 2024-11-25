document.getElementById("infoForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
  
    // Get form fields
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const birthDate = document.getElementById("birthDate").value.trim();
    const joiningDate = document.getElementById("joiningDate").value.trim();
    const qualification = document.getElementById("qualification").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
  
    // Validation flags
    let isValid = true;
    let errorMessage = "";
  
    // Name validation
    if (name === "") {
        isValid = false;
        document.getElementById("nameError").textContent = "Name cannot be empty.";
      } else {
        document.getElementById("nameError").textContent = "";
      }
  
    // Age validation
    if (age === "" || isNaN(age) || age < 18 || age > 100) {
      isValid = false;
      document.getElementById("ageError").textContent = "Age must be between 18 and 100.";
    } else {
      document.getElementById("ageError").textContent = "";
    }
  
    // Gender validation
    if (!gender) {
      isValid = false;
      errorMessage += "Please select a gender.\n";
    }
  
    // Birth Date validation
    if (birthDate === "") {
      isValid = false;
      errorMessage += "Birth date cannot be empty.\n";
    } else {
      const birthYear = new Date(birthDate).getFullYear();
      const currentYear = new Date().getFullYear();
      if (currentYear - birthYear !== parseInt(age)) {
        isValid = false;
        errorMessage += "Age and birth date do not match.\n";
      }
    }
  
    // Joining Date validation
    if (joiningDate === "") {
      isValid = false;
      errorMessage += "Joining date cannot be empty.\n";
    }
  
    // Qualification validation
    if (qualification === "") {
      isValid = false;
      errorMessage += "Please select a qualification.\n";
    }
  
    // Phone Number validation
    const phonePattern = /^\+\d{1,3}-\d{3}-\d{7}$/; // Example: +123-456-7890123
    if (!phonePattern.test(phoneNumber)) {
      isValid = false;
      errorMessage += "Phone number must be in the format +123-456-7890123.\n";
    }
  
    // Display errors or proceed
    if (!isValid) {
      alert(errorMessage);
    } else {
      alert("Form submitted successfully!");
      // Here you can handle the form submission logic, e.g., saving the data.
      event.target.submit(); // Optional: only submit when everything is valid
    }
  });
  