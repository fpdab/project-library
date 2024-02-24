class BookLibrary {
  constructor() {
    this.bookLib = [];
  }

  addBookToLibrary(title, author, pages, read) {
    this.bookLib.push(new Book(title, author, pages, read));
  }

  render() {
    //Clear display before rendering Cards
    let display = document.querySelector(".yourLib");
    while (display.firstChild) {
      display.removeChild(display.firstChild);
    }

    //Create Cards and append them to display
    for (const [index, book] of this.bookLib.entries()) {
      book.createCard(index);
      const aCard = book.aCard;
      display.appendChild(aCard);
    }
  }
}

class Book {
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
  get getReadOrNotRead() {
    return this.read === true ? `read` : "not read";
  }
  flipStatus() {
    this.read === true ? (this.read = false) : (this.read = true);
  }

  createCard(index) {
    function createCardsElement(type, sentenceClass, description, formValue) {
      const sentence = document.createElement(type);
      sentence.setAttribute("class", sentenceClass);
      const node = document.createTextNode(`${description} ${formValue}`);
      sentence.appendChild(node);
      return sentence;
    }
    //Create card container
    //All the next paragraphs will be appended to it
    const divText = document.createElement("div");
    divText.setAttribute("class", `text`);

    //Add first 3 paragraphs to the card
    divText.appendChild(
      createCardsElement("p", `title`, `Title:`, this.getTitle)
    );
    divText.appendChild(
      createCardsElement("p", `author`, `Author:`, this.getAuthor)
    );
    divText.appendChild(
      createCardsElement("p", `pages`, `Pages:`, this.getPages)
    );

    //Create mutable Status Paragraph with ability to change colors
    const statusPara = createCardsElement("p", `read`, `Status:`, ``);
    statusPara.appendChild(
      createCardsElement(
        "span",
        this.getReadOrNotRead,
        ``,
        this.getReadOrNotRead
      )
    );
    divText.appendChild(statusPara);

    //Create button paragrraph container
    const buttonPara = createCardsElement("p", `buts`, ``, ``);

    //Create button for changing Status Paragraph using flipStatus method
    const statButton = createCardsElement(
      "button",
      `statb statb${index}`,
      ``,
      `Switch Status`
    );
    statButton.addEventListener("click", () => {
      this.flipStatus();
      mainLibrary.render();
    });
    buttonPara.appendChild(statButton);

    //Create button for deleting this card
    const delButton = createCardsElement(
      "button",
      `delb delb${index}`,
      ``,
      `Delete`
    );
    delButton.addEventListener("click", () => {
      mainLibrary.bookLib.splice(index, 1);
      mainLibrary.render();
    });
    buttonPara.appendChild(delButton);

    //Append buttons to paragraph container
    divText.appendChild(buttonPara);

    //Create aCard container
    //for divText container which carries all the previous html code
    const aCard = document.createElement("div");
    aCard.setAttribute("class", `card card${index}`);
    aCard.appendChild(divText);

    //aCard property stores finished card html code
    this.aCard = aCard;
  }
}

//Function for getting form values, adding book to mainLibrary and then rendering
function getForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value === "true" ? true : false;

  mainLibrary.addBookToLibrary(title, author, pages, read);
  mainLibrary.render();
}

//Script starts here :

//Initialize main library
const mainLibrary = new BookLibrary();

//Listen for newBookButton click showing dialog
//Then listen for submit to add book to mainLibrary using getForm function
let modal = document.querySelector(".modal");
const newBookButton = document.querySelector(".newBookButton");
newBookButton.addEventListener("click", () => modal.showModal());
document.querySelector("#form").addEventListener("submit", getForm);

//Fill page with expample card
mainLibrary.addBookToLibrary("example", "example", 10, true);
mainLibrary.render();
