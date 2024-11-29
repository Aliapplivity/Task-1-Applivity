function displayEmployees() {
  const employees = JSON.parse(localStorage.getItem("employees")) || [];
  const tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = ""; // Clear previous content

  // Get filter values
  const nameFilter = document.getElementById("nameFilter").value.trim().toLowerCase();
  const ageFilter = document.getElementById("ageFilter").value.trim();

  // Filter and display employees
  employees.forEach((employee, index) => {
    const matchesName = !nameFilter || employee.name.toLowerCase().includes(nameFilter);
    const matchesAge = !ageFilter || employee.age == ageFilter; // Compare as string

    if (matchesName && matchesAge) {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.age}</td>
        <td>${employee.gender}</td>
        <td>${employee.birthDate}</td>
        <td>${employee.joiningDate}</td>
        <td>${employee.qualification}</td>
        <td>${employee.phoneNumber}</td>
        <td>
          <span class="status ${employee.status === 'active' ? 'status-active' : 'status-inactive'}">
            ${employee.status || 'Inactive'}
          </span>
        </td>
        <td class="actions">
          <button class="edit" onclick="editEmployee(${index})">Edit</button>
          <button class="delete" onclick="deleteEmployee(${index})">Delete</button>
        </td>
      `;

      tableBody.appendChild(row);
    }
  });
}

// Event listeners for filter inputs
document.getElementById("nameFilter").addEventListener("input", displayEmployees);
document.getElementById("ageFilter").addEventListener("input", displayEmployees);


// Other functions like deleteEmployee() and editEmployee() remain unchanged.

  function deleteEmployee(index) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const confirmDelete = confirm("Are you sure you want to delete this employee?");
    if (confirmDelete) {
      employees.splice(index, 1);
      localStorage.setItem("employees", JSON.stringify(employees));
      displayEmployees();
    }
  }
  
  function editEmployee(index) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const employee = employees[index];
  
    // Redirect to the input page with pre-filled data
    localStorage.setItem("editIndex", index);
    localStorage.setItem("editData", JSON.stringify(employee));
    window.location.href = "index.html"; // Assuming this is your form page
  }
  
  // Load employees when the page is ready
  window.onload = displayEmployees;
  