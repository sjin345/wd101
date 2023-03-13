const form = document.getElementById("userf");
const entriesTable = document.getElementById("input");

let entries = [];

const displayEntries = () => {
    // Clear entriesTable
    entriesTable.innerHTML = "";

    // Create header row
    const headerRow = entriesTable.insertRow();
    const headers = ["Name", "Email", "Password", "Date of Birth", "Accepted Terms"];
    headers.forEach(headerText => {
        const headerCell = headerRow.insertCell();
        headerCell.textContent = headerText;
    });

    // Create data rows
    entries.forEach(entry => {
        const dataRow = entriesTable.insertRow();
        const data = [entry.name, entry.email, entry.password, entry.dob, entry.acceptedTerms];
        data.forEach(dataText => {
            const dataCell = dataRow.insertCell();
            dataCell.textContent = dataText;
        });
    });
}

const addEntry = entry => {
    entries.push(entry);
    localStorage.setItem("entries", JSON.stringify(entries));
    displayEntries();
}

const retrieveEntries = () => {
    const entriesString = localStorage.getItem("entries");
    if (entriesString) {
        entries = JSON.parse(entriesString);
    }
}

// Retrieve entries from localStorage
retrieveEntries();

// Display entries on page load
displayEntries();

// Handle form submit
form.addEventListener("submit", event => {
    event.preventDefault();

    const name = form.elements["name"].value;
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;
    const dob = form.elements["dob"].value;
    const acceptedTerms = form.elements["agree"].checked;

    const entry = {
        name: name,
        email: email,
        password: password,
        dob: dob,
        acceptedTerms: acceptedTerms
    };

    addEntry(entry);

    // Clear form
    form.reset();
});
