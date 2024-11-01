window.onload = function () {
    displayData();
};

function displayData() {
    const allData = JSON.parse(localStorage.getItem("employeeData")) || [];
    const dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";  // Clear existing data
    allData.forEach(data => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.gender}</td>
            <td>${data.birthDate}</td>
            <td>${data.joiningDate}</td>
            <td>${data.qualification}</td>
            <td>${data.phoneNumber}</td>
        `;
        dataBody.appendChild(row);
    });
}

function filterData() {
    const nameFilter = document.getElementById("searchName").value.toLowerCase();
    const ageFilter = document.getElementById("searchAge").value;
    const allData = JSON.parse(localStorage.getItem("employeeData")) || [];

    // map, filter, sort,push, pop
    const filteredData = allData.filter(data => {
        const matchesName = data.name.toLowerCase().includes(nameFilter);
        const matchesAge = ageFilter ? data.age === ageFilter : true;
        return matchesName && matchesAge;
    });

    const dataBody = document.getElementById("dataBody");
    dataBody.innerHTML = "";  // Clear existing data
    filteredData.forEach(data => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${data.name}</td>
            <td>${data.age}</td>
            <td>${data.gender}</td>
            <td>${data.birthDate}</td>
            <td>${data.joiningDate}</td>
            <td>${data.qualification}</td>
            <td>${data.phoneNumber}</td>
        `;
        dataBody.appendChild(row);
    });
}
