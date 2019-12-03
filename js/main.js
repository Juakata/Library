let form = document.getElementById("form");

let myLibrary = [];
render();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  formData = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    pages: document.getElementById("pages").value,
    read: document.getElementById("already-read").checked
  };
  const book = new Book(
    formData.title,
    formData.author,
    formData.pages,
    formData.read
  );
  myLibrary.push(book);
  render();
}

function removeBook(i) {
  myLibrary.splice(i, 1);
  render();
}

function checkRead(book, i) {
  if (book.read) {
    return `<button id='read-btn${i}' onclick='changeStatus(${i})'>Already read</button>`;
  } else {
    return `<button id='read-btn${i}' onclick='changeStatus(${i})'>You haven't read this book</button>`;
  }
}

function render() {
  let container = document.getElementById("book-cont");
  container.innerHTML = "";
  myLibrary.forEach((book, i) => {
    container.innerHTML += `<h1>${book.title}</h1>
                            <h2>${book.author}</h2>
                            <h2>${book.pages}</h2>
                            <h2><span>Status:</span>${checkRead(book, i)}</h2>
                            <button id='delete-book${i}' onclick='removeBook(${i})'>Delete</button>`;
  });
}

function changeStatus(i) {
  let button = document.getElementById("read-btn" + i);
  if (button.innerHTML === "You haven't read this book") {
    button.innerHTML = "Already read";
  } else {
    button.innerHTML = "You haven't read this book";
  }
}

function displayForm() {
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}
