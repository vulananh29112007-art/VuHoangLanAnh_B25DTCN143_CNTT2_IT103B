let contacts = [];

let contactName = document.getElementById("contact-name");
let contactPhone = document.getElementById("contact-phone");
let contactEmail = document.getElementById("contact-email");
let contactTbody = document.getElementById("contact-tbody");


contact - form.addEventListener("submit", addContact);

function addContact(e) {
    e.preventDefault();

    let contact = {
        id: Date.now(),
        name: contactName.value.trim(),
        phoneNumber: Number(contactPhone).value,
        email: contactEmail.value.trim(),
    }

    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    renderContact();
    contact - form.reset();
}

function renderContact() {
    contactTbody.innerHTML = "";

    contacts.forEach((p) => {
        let createTr = document.createElement("tr");

        createTr.innerHTML`
        <td>${p.id}</td>
        <td>${p.contactName}</td>
        <td>${p.contactPhone}</td>
        <td>${p.contactEmail}</td>
        <td>
        <button>Sửa</button>
        <button>Xóa</button>
        </td>
        `
    })
    contactTbody.appendChild(createTr);
}