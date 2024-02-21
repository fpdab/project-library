// get DOM
myLib = [];
let modal = document.querySelector(".modal");
document
  .querySelector(".newBookButton")
  .addEventListener("click", () => modal.showModal());
document.querySelector("#form").addEventListener("submit", getForm);

function createBook(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

createBook.prototype = {
  readInfo: function () {
    return this.read === true ? `read` : "not read";
  },
  info: function () {
    return [this.title, this.author, this.pages];
  },
  changeReadStatus: function () {
    this.read === true ? (this.read = false) : (this.read = true);
  },
};

function addBookToLibrary(title, author, pages, read) {
  myLib.push(new createBook(title, author, pages, read));
}

function getForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value === "true";

  addBookToLibrary(title, author, pages, read);
  render();
}

function render() {
  let display = document.querySelector(".yourLib");
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  let counter = 0;
  for (let element of myLib) {
    const divText = document.createElement("div");
    divText.setAttribute("class", `text`);

    const para1 = document.createElement("p");
    para1.setAttribute("class", `title`);
    const title = document.createTextNode(`Title: ${element.info()[0]}`);
    para1.appendChild(title);
    divText.appendChild(para1);

    const para2 = document.createElement("p");
    para2.setAttribute("class", `author`);
    const author = document.createTextNode(`Author: ${element.info()[1]}`);
    para2.appendChild(author);
    divText.appendChild(para2);

    const para3 = document.createElement("p");
    para3.setAttribute("class", `pages`);
    const pages = document.createTextNode(`Pages: ${element.info()[2]}`);
    para3.appendChild(pages);
    divText.appendChild(para3);

    const para4 = document.createElement("p");
    para4.setAttribute("class", `read`);
    const read = document.createTextNode(`Status: `);

    const span = document.createElement("span");
    span.setAttribute("class", `${element.readInfo()}`);
    const stat = document.createTextNode(`${element.readInfo()}`);
    span.appendChild(stat);

    para4.appendChild(read);
    para4.appendChild(span);
    divText.appendChild(para4);

    const divCard = document.createElement("div");
    divCard.setAttribute("class", `card card${counter}`);
    counter++;

    divCard.appendChild(divText);
    display.appendChild(divCard);
  }
  let cards = document.querySelectorAll(".card");
  cards.forEach((element) => {
    let x = element.getAttribute("class").replace(/[^\d-]/g, "");
    element.addEventListener("click", () => {
      myLib.splice(Number(x), 1);
      render();
    });
  });
}
