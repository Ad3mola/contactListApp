const firstName = document.querySelector('#First');
const secondName = document.querySelector('#Second');
const number = document.querySelector('#number');
const email = document.querySelector('#email');
const picture = document.querySelector('#picture');
const form = document.querySelector('#form');
const contList = document.querySelector("#contList");
const img = document.getElementsByTagName("img");
const second = document.querySelector("#second");
const Wnumber = document.querySelector("#Wnumber");
const warning = document.querySelector("#warning");
const success = document.querySelector("#success");
const search = document.querySelector("#search");
second.style.display = "none";
warning.style.display = "none";
success.style.display = "none";

function Contactss(firstName, secondName, Wnumber, email, number, img) {
    this.firstName = firstName;
    this.secondName = secondName;
    this.number = number;
    this.Wnumber = Wnumber;
    this.email = email;
    this.img = img;
}

function UI() {}

UI.prototype.addToContact = function (contact) {
    const li = document.createElement("li");
    li.id = "li";
    li.innerHTML = ` <div class="row mt-5">
<div class="card-image text-left col-sm-4"><img src="${contact.img}" alt="" id="img" height="80px">
</div>
<span class="card-text col-sm-8">
   <ul class="list-unstyled">
       <li  id="sea">Name: ${contact.firstName} ${contact.secondName}</li>
       <li>Phone: ${contact.number}</li>
       <li>Whatsapp Number: ${contact.Wnumber}</li>
       <li> Email: <a href="mailto:${contact.email}"> ${contact.email}</a></li>
   </ul>
   <a href="tel:${contact.number}"><button class="btn btn-success mt-4" id="call"> Call</button></a>
   <a href="https://wa.me/${contact.Wnumber}"><button class="btn btn-success mt-4" id="call">Message</button></a>
   <a href="#" class="delete"><button class="btn btn-danger mt-4" id="delete">Delete</button></a>
</span>
</div>`;
    contList.appendChild(li);
    second.style.display = "block";
    firstName.value = "";
    secondName.value = "";
    Wnumber.value = "";
    email.value = "";
    number.value = "";
    img.src = "";

    setTimeout(function () {
        success.remove();
    }, 3000);
}

class Store {
    static getContacts() {
        let contacts;
        if (localStorage.getItem('contacts') === null) {
            contacts = [];
        } else {
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    }

    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach(function (contact) {
            const ui = new UI;
            ui.addToContact(contact);
        });
    }

    static addContacts(contact) {
        const contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    static removeContacts(contact) {
        const contacts = Store.getContacts();
        contacts.forEach(function (contact, index) {
            contacts.splice(index, 1);
        });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

UI.prototype.deleteContact = function (target) {
    if (target.id === "delete") {
        confirm("Are you sure?");
        target.parentElement.parentElement.parentElement.parentElement.remove();
        if (document.querySelector("#li") === null) {
            second.style.display = "none";
        }
    }
}

UiLoaded();

function UiLoaded() {
    form.addEventListener("submit", postContact);
    contList.addEventListener("click", Delete);
    search.addEventListener("keyup", Filter);
}
document.addEventListener("DOMContentLoaded", Store.displayContacts);


function postContact(e) {
    if (number.value === "") {
        warning.style.display = "block";
        warning.textContent = "Please enter a valid number";
        setTimeout(function () {
            warning.remove();
        }, 3000);
    } else if (firstName.value === "") {
        warning.style.display = "block";
        warning.textContent = "Please enter a valid First Name";
        setTimeout(function () {
            warning.remove();
        }, 3000);
    } else if (secondName.value === "") {
        warning.style.display = "block";
        warning.textContent = "Please enter a valid Second Name";
        setTimeout(function () {
            warning.remove();
        }, 3000);
    } else if (email.value === "") {
        warning.style.display = "block";
        warning.textContent = "Please enter a valid Email";
        setTimeout(function () {
            warning.remove();
        }, 3000);
    } else {
        const contact = new Contactss(firstName.value, secondName.value, Wnumber.value, email.value, number.value, img.src);
        const ui = new UI();
        ui.addToContact(contact);
        Store.addContacts(contact);

        success.style.display = "block";

    }


    e.preventDefault();
}

function Delete(e) {
    const ui = new UI();
    ui.deleteContact(e.target);
    Store.removeContacts(e.target.parentElement.parentElement.parentElement.parentElement);
    e.preventDefault();
}

picture.addEventListener("change", readURL, true);

function readURL() {
    var file = picture.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        img.src = reader.result;
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {

    }
}


function Filter(e) {
    text = e.target.value.toLowerCase();
    document.querySelectorAll("#sea").forEach(function (contact) {
        const item = contact.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            contact.style.display = "block";
        } else {
            contact.style.display = "none";
        }
    });
}