const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

function addContact() {
  const name = document.getElementById("name").value;
  const imageUrl = document.getElementById("imageUrl").value;
  const phone = document.getElementById("phone").value;

  const contact = { name, imageUrl, phone };
  contacts.push(contact);

  localStorage.setItem("contacts", JSON.stringify(contacts));
  displayContacts();
}

function displayContacts() {
  const contactsDiv = document.getElementById("contacts");
  contactsDiv.innerHTML = "";

  for (const contact of contacts) {
    const contactDiv = document.createElement("div");

    const imageUrl = contact.imageUrl || "https://via.placeholder.com/100";

    const image = document.createElement("img");
    image.src = imageUrl;
    image.alt = contact.name;

    const name = document.createElement("p");
    name.textContent = contact.name;

    const phone = document.createElement("p");
    phone.textContent = contact.phone;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
      const contactIndex = contacts.indexOf(contact);
      contacts.splice(contactIndex, 1);

      localStorage.setItem("contacts", JSON.stringify(contacts));
      displayContacts();
    };

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => {
      const newContact = prompt(
        'Enter updated contact info using format "name,imageUrl,phone"',
        `${contact.name},${contact.imageUrl},${contact.phone}`
      );
      const [name, imageUrl, phone] = newContact.split(",");

      contact.name = name;
      contact.imageUrl = imageUrl;
      contact.phone = phone;

      localStorage.setItem("contacts", JSON.stringify(contacts));
      displayContacts();
    };

    contactDiv.appendChild(image);
    contactDiv.appendChild(name);
    contactDiv.appendChild(phone);
    contactDiv.appendChild(deleteButton);
    contactDiv.appendChild(editButton);

    contactsDiv.appendChild(contactDiv);
  }
}

displayContacts();
