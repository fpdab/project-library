class BookLibrary {
  constructor() {
    this.bookLib = [];
  }

  addBookToLibrary(title, author, pages, read) {
    this.bookLib.push(new SingleBook(title, author, pages, read));
  }
  render() {
    //Count Cards
    let counter = 0;

    //Get and clear display before rendering Cards
    let display = document.querySelector(".yourLib");
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }

    //Create Cards and append them to display
    for (let book of this.bookLib) {
      const aCard = book.createCard(counter);
      display.appendChild(aCard);
    }

    /*   let delbuts = document.querySelectorAll(".delb");
    delbuts.forEach((book) => {
      let x = book.getAttribute("class").replace(/[^\d-]/g, "");
      book.addEventListener("click", () => {
        this.bookLib.splice(Number(x), 1);
        render();
      });
    });
    let statbuts = document.querySelectorAll(".statb");
    statbuts.forEach((book) => {
      let x = book.getAttribute("class").replace(/[^\d-]/g, "");
      book.addEventListener("click", () => {
        this.bookLib[Number(x)].flipStatus();
        render();
      });
    }); */
  }
}

class SingleBook {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  get getTitle() {
    return this.title;
  }
  get getAuthor() {
    return this.author;
  }
  get getPages() {
    return this.pages;
  }
  get ifRead() {
    return this.read === true ? `read` : "not read";
  }
  flipStatus() {
    this.read === true ? (this.read = false) : (this.read = true);
  }

  createCard(counter) {
    function createSentence(type, sentenceClass, description, formValue) {
      const sentence = document.createElement(type);
      sentence.setAttribute("class", sentenceClass);
      const node = document.createTextNode(`${description} ${formValue}`);
      sentence.appendChild(node);
      return sentence;
    }

    const divText = document.createElement("div");
    divText.setAttribute("class", `text`);

    divText.appendChild(createSentence("p", `title`, `Title:`, this.getTitle));
    divText.appendChild(
      createSentence("p", `author`, `Author:`, this.getAuthor)
    );
    divText.appendChild(createSentence("p", `pages`, `Pages:`, this.getPages));

    const statusPara = createSentence("p", `read`, `Status:`, ``);
    statusPara.appendChild(
      createSentence("span", this.ifRead, ``, this.ifRead)
    );
    divText.appendChild(statusPara);

    const buttonPara = createSentence("p", `buts`, ``, ``);
    const statButton = createSentence(
      "button",
      `statb statb${counter}`,
      ``,
      `Switch Status`
    );
    buttonPara.appendChild(statButton);
    const delButton = createSentence(
      "button",
      `delb delb${counter}`,
      ``,
      `Delete`
    );
    buttonPara.appendChild(delButton);
    divText.appendChild(buttonPara);

    const aCard = document.createElement("div");
    aCard.setAttribute("class", `card card${counter}`);
    counter++;
    aCard.appendChild(divText);
    this.aCard = aCard;
    console.log(typeof divText);
  }
}

// get DOM
const mainLibrary = new BookLibrary();
let modal = document.querySelector(".modal");
document
  .querySelector(".newBookButton")
  .addEventListener("click", () => modal.showModal());
document.querySelector("#form").addEventListener("submit", getForm);

function getForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value === "true";

  mainLibrary.addBookToLibrary(title, author, pages, read);
  mainLibrary.render();
}

mainLibrary.addBookToLibrary("example", "example", 10, true);
mainLibrary.render();
