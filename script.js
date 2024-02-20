//array of objects Book
myLib = [];

//constructor f in reavealing design pattern
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  function readInfo() {
    return read === true ? "Book's read" : "Book's not read";
  }
  function info() {
    return { title, author, pages, read };
  }
  return {
    title,
    author,
    pages,
    read,
    readInfo,
    info,
  };
}

function addBookToLibrary(title, author, pages, read) {
  myLib.push(new Book(title, author, pages, read));
}

function render() {
  let display = document.querySelector(".display");
  while (display.firstChild) {
    display.removeChild(display.firstChild);
  }
  for (let element of myLib) {
    const para = document.createElement("p");
    const node = document.createTextNode(
      `${element.title} ${element.author} ${
        element.pages
      } ${element.readInfo()}`
    );
    para.appendChild(node);
    display.appendChild(para);
  }
}
