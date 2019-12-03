let form = document.getElementById("form");

let myLibrary = [];
let testLibrary = JSON.parse(localStorage.getItem("testLibrary"));

if (testLibrary == null) {
  localStorage.setItem("testLibrary", JSON.stringify(myLibrary));
}
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
  let testLibrary = JSON.parse(localStorage.getItem("testLibrary"));
  testLibrary.push(book);
  localStorage.setItem("testLibrary", JSON.stringify(testLibrary));
  render();
}

function removeBook(i) {
  let testLibrary = JSON.parse(localStorage.getItem("testLibrary"));
  testLibrary.splice(i, 1);
  localStorage.setItem("testLibrary", JSON.stringify(testLibrary));
  myLibrary.splice(i, 1);
  render();
}

function checkRead(book, i) {
  if (book.read) {
    return `<button class="btn read" id='read-btn${i}' onclick='changeStatus(${i})'>Already read</button>`;
  } else {
    return `<button class="btn not-read" id='read-btn${i}' onclick='changeStatus(${i})'>You haven't read this book</button>`;
  }
}

function render() {
  let container = document.getElementById("book-cont");
  container.innerHTML = "";
  let testLibrary = JSON.parse(localStorage.getItem("testLibrary"));
  testLibrary.forEach((book, i) => {
    container.innerHTML += `<div class="book">
                            <h1>${book.title}</h1>
                            <h2>${book.author}</h2>
                            <h2>${book.pages}</h2>
                            <h2><span>Status:</span>${checkRead(book, i)}</h2>
                            <button class="btn delete" id='delete-book${i}' onclick='removeBook(${i})'>Delete</button>
                            </div>`;
  });
}

function changeStatus(i) {
  let button = document.getElementById("read-btn" + i);
  if (button.innerHTML === "You haven't read this book") {
    button.innerHTML = "Already read";
    button.className = "btn read";
  } else {
    button.innerHTML = "You haven't read this book";
    button.className = "btn not-read";
  }
}

function displayForm() {
  form.style.display = "block";
}

function closeForm() {
  form.style.display = "none";
}
