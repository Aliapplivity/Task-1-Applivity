window.onload = function () {
    displayData();
};

function displayData() {
    const allData = JSON.parse(localStorage.getItem("employeeData")) || [];
    const dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";  // Clear existing data

    allData.forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.gender}</td>
            <td>${data.birthDate}</td>
            <td>${data.joiningDate}</td>
            <td>${data.qualification}</td>
            <td>${data.phoneNumber}</td>
            <td>
                <button onclick="editData(${index})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteData(${index})"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        dataBody.appendChild(row);
    });
}

function filterData() {
    const nameFilter = document.getElementById("searchName").value.toLowerCase();
    const ageFilter = document.getElementById("searchAge").value;
    const allData = JSON.parse(localStorage.getItem("employeeData")) || [];

    const filteredData = allData.filter(data => {
        const matchesName = data.name.toLowerCase().includes(nameFilter);
        const matchesAge = ageFilter ? data.age === ageFilter : true;
        return matchesName && matchesAge;
    });

    const dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";  // Clear existing data
    filteredData.forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.gender}</td>
            <td>${data.birthDate}</td>
            <td>${data.joiningDate}</td>
            <td>${data.qualification}</td>
            <td>${data.phoneNumber}</td>
            <td>
                <button onclick="editData(${index})"><i class="fas fa-edit"></i></button>
                <button onclick="deleteData(${index})"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        dataBody.appendChild(row);
    });
}

function editData(index) {
    // Retrieve all data from localStorage
    const allData = JSON.parse(localStorage.getItem("employeeData"));
    const dataToEdit = allData[index];

    // Save the index of the data being edited in localStorage (or a global variable)
    localStorage.setItem("editIndex", index);

    // Navigate to the input form page and populate it with the data
    window.location.href = "index.html";

    // Once on the form page, populate the fields (handled by on-page script)
}


function deleteData(index) {
    // Confirmation dialog
    const confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (!confirmDelete) {
        // If the user clicks "Cancel", exit the function
        return;
    }

    // If confirmed, proceed to delete the data
    const allData = JSON.parse(localStorage.getItem("employeeData"));
    allData.splice(index, 1); // Remove the data at the specified index
    localStorage.setItem("employeeData", JSON.stringify(allData)); // Save the updated data
    displayData(); // Refresh the table to reflect the deletion
    alert("Entry deleted successfully!"); // Optional success message
}

