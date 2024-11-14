
// Function to generate a dynamic, sortable, and filterable table
function createDynamicTable(data, containerId) {
    const container = document.getElementById(containerId);
    let table = document.createElement("table");
    let headers = Object.keys(data[0]);
    let currentSortColumn = null;
    let isAscending = true;

    // Function to render table rows based on data
    function renderRows(filteredData) {
        const tbody = document.createElement("tbody");
        filteredData.forEach(row => {
            const tr = document.createElement("tr");
            headers.forEach(header => {
                const td = document.createElement("td");
                td.innerText = row[header] || "";
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
        table.replaceChild(tbody, table.querySelector("tbody") || document.createElement("tbody"));
    }

    // Function to sort data
    function sortData(column) {
        if (column === currentSortColumn) isAscending = !isAscending;
        else {
            currentSortColumn = column;
            isAscending = true;
        }
        data.sort((a, b) => {
            if (a[column] < b[column]) return isAscending ? -1 : 1;
            if (a[column] > b[column]) return isAscending ? 1 : -1;
            return 0;
        });
        renderRows(data);
    }

    // Function to filter data
    function filterData(searchTerm) {
        const filteredData = data.filter(row => 
            headers.some(header => row[header]?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
        );
        renderRows(filteredData);
    }

    // Create header row with sorting functionality
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");
    headers.forEach(header => {
        const th = document.createElement("th");
        th.innerText = header;
        th.style.cursor = "pointer";
        th.onclick = () => sortData(header);
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Add table body
    table.appendChild(document.createElement("tbody"));
    renderRows(data);

    // Search box for filtering
    const searchBox = document.createElement("input");
    searchBox.type = "text";
    searchBox.placeholder = "Search...";
    searchBox.oninput = () => filterData(searchBox.value);
    container.appendChild(searchBox);
    container.appendChild(table);
}

// Sample data
const data = [
    { Name: "Alice", Age: 25, City: "New York" },
    { Name: "Bob", Age: 30, City: "Los Angeles" },
    { Name: "Charlie", Age: 35, City: "Chicago" }
];

// Initialize table in a container with ID 'table-container'
window.onload = function() {
    createDynamicTable(data, "table-container");
};
