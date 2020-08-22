const firstName = document.querySelector("#First");
const secondName = document.querySelector("#Second");
const number = document.querySelector("#number");
const email = document.querySelector("#email");
const picture = document.querySelector("#picture");
const form = document.querySelector("#form");
const contList = document.querySelector("#contList");
const img = document.getElementsByTagName("img");
const second = document.querySelector("#second");
const Wnumber = document.querySelector("#Wnumber");
const warning = document.querySelector("#warning");
const success = document.querySelector("#success");
const search = document.querySelector("#search");
const label = document.querySelector("#label");
const add = document.querySelector("#add");
const addContact = document.querySelector("#aCont");
const contactForm = document.querySelector("#contactForm");
const contL = document.querySelector("#contL");
const list = document.querySelector("#list");

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
  li.innerHTML = ` <div class="row mt-5" id="list">
<div class="card-image text-left col-sm-4 mx-auto" id="image-container"><img src="${contact.img}" alt="" id="img">
</div>
<span class="card-text col-sm-8">
   <ul class="list-unstyled">
       <li  id="sea"><span id="colon">Name</span>: ${contact.firstName} ${contact.secondName}</li>
       <li><span id="colon"> Phone</span>: ${contact.number}</li>
       <li><span id="colon">Whatsapp Number</span>: ${contact.Wnumber}</li>
       <li><span id="colon"> Email</span>: <a href="mailto: ${contact.email}"> ${contact.email}</a></li>
   </ul>
   <img src="./phone.svg"  class=" mt-4 img" id="call" href="tel: ${contact.number}" />
   <img src="./whatsapp.svg"   class=" mt-4 img" id="message" href="https://wa.me/+234${contact.Wnumber}" />
   <a href="#"> <img src="./trash-alt.svg" class=" mt-4 img" id="delete" /></a>
</span>
<hr>
</div>`;
  contList.appendChild(li);
  firstName.value = "";
  secondName.value = "";
  Wnumber.value = "";
  email.value = "";
  number.value = "";
  img.src = "";
};

class Store {
  static getContacts() {
    let contacts;
    if (localStorage.getItem("contacts") === null) {
      contacts = [];
    } else {
      contacts = JSON.parse(localStorage.getItem("contacts"));
    }
    return contacts;
  }

  static contactCheck = () => {
    const contacts = Store.getContacts();
    if (contacts.length === 0) {
      add.style.display = "block";
    } else {
      add.style.display = "none";
    }
  };

  static displayContacts() {
    const contacts = Store.getContacts();
    Store.contactCheck();
    contacts.forEach(function (contact) {
      const ui = new UI();
      ui.addToContact(contact);
    });
  }

  static addContacts(contact) {
    const contacts = Store.getContacts();
    contacts.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }

  static removeContacts(target) {
    const contacts = Store.getContacts();

    if (target.id === "delete") {
      contacts.forEach(function (contact, index) {
        const question = confirm("Are you sure?");
        if (question) {
          contacts.splice(index, 1);
        }
      });
      localStorage.setItem("contacts", JSON.stringify(contacts));
      Store.contactCheck();
    }
  }
}

UI.prototype.deleteContact = function (target) {
  if (target.id === "delete") {
    target.parentElement.parentElement.parentElement.remove();
  }
};

UiLoaded();

function UiLoaded() {
  form.addEventListener("submit", postContact);
  contList.addEventListener("click", Delete);
  search.addEventListener("keyup", Filter);
}
document.addEventListener("DOMContentLoaded", Store.displayContacts);

function postContact(e) {
  if (firstName.value === "") {
    firstName.classList.add("is-invalid");
    setTimeout(function () {
      firstName.classList.remove("is-invalid");
    }, 3000);
  } else if (secondName.value === "") {
    secondName.classList.add("is-invalid");
    setTimeout(function () {
      secondName.classList.remove("is-invalid");
    }, 3000);
  } else if (number.value === "") {
    number.classList.add("is-invalid");
    setTimeout(function () {
      number.classList.remove("is-invalid");
    }, 3000);
  } else if (email.value === "") {
    email.classList.add("is-invalid");
    setTimeout(function () {
      email.classList.remove("is-invalid");
    }, 3000);
  } else {
    const contact = new Contactss(
      firstName.value,
      secondName.value,
      Wnumber.value,
      email.value,
      number.value,
      img.src
    );
    const ui = new UI();
    ui.addToContact(contact);

    Store.addContacts(contact);
    Store.contactCheck();
    document.querySelector(".contact-added").style.display = "block"
    setTimeout(() => {
        document.querySelector(".contact-added").style.display = "none"
    }, 2000);
  }

  e.preventDefault();
}

function Delete(e) {
  const ui = new UI();
  ui.deleteContact(e.target);
  Store.removeContacts(e.target);
}

picture.addEventListener("change", readURL, true);

function readURL() {
  var file = picture.files[0];
  label.textContent = picture.files[0].name;
  var reader = new FileReader();
  reader.onloadend = function () {
    img.src = reader.result;
  };
  if (file) {
    reader.readAsDataURL(file);
  } else {
  }
}

function Filter(e) {
  text = e.target.value.toLowerCase();
  document.querySelectorAll("#sea").forEach(function (contact) {
    const item = contact.firstChild.nextSibling.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      contact.parentElement.parentElement.parentElement.style.display = "block";
    } else {
      contact.parentElement.parentElement.parentElement.style.display = "none";
    }
  });
}

const showForm = () => {
  addContact.classList.remove("inactive");
  contL.classList.add("inactive");
  contactForm.style.display = "block";
  list.style.display = "none";
};
const showList = () => {
  addContact.classList.add("inactive");
  contL.classList.remove("inactive");
  contactForm.style.display = "none";
  list.style.display = "block";
};
addContact.addEventListener("click", showForm);
contL.addEventListener("click", showList);
