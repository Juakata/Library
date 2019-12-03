const form = document.getElementById('form');

const myLibrary = [];
let testLibrary = JSON.parse(localStorage.getItem('testLibrary'));

if (testLibrary == null) {
  localStorage.setItem('testLibrary', JSON.stringify(myLibrary));
}

function checkRead(book, i) {
  if (book.read) {
    return `<button class="btn read" id='read-btn${i}'>Already read</button>`;
  }
  return `<button class="btn not-read" id='read-btn${i}'>You haven't read this book</button>`;
}

function render() {
  const container = document.getElementById('book-cont');
  container.innerHTML = '';
  testLibrary = JSON.parse(localStorage.getItem('testLibrary'));
  testLibrary.forEach((book, i) => {
    container.innerHTML += `<div class="book">
                            <h1>${book.title}</h1>
                            <h2>${book.author}</h2>
                            <h2>${book.pages}</h2>
                            <h2><span>Status:</span>${checkRead(book, i)}</h2>
                            <button class="btn delete" id='delete-book${i}'>Delete</button>
                            </div>`;
    document.getElementById(`delete-book${i}`).addEventListener("click", function(){
      testLibrary = JSON.parse(localStorage.getItem('testLibrary'));
      testLibrary.splice(i, 1);
      localStorage.setItem('testLibrary', JSON.stringify(testLibrary));
      myLibrary.splice(i, 1);
      render();
    });

    document.getElementById(`read-btn${i}`).addEventListener("click", function(){
      const button = document.getElementById(`read-btn${i}`);
      if (button.innerHTML === "You haven't read this book") {
        button.innerHTML = 'Already read';
        button.className = 'btn read';
      } else {
        button.innerHTML = "You haven't read this book";
        button.className = 'btn not-read';
      }
    });
  });
}

render();

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  const formData = {
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    pages: document.getElementById('pages').value,
    read: document.getElementById('already-read').checked,
  };
  const book = new Book(
    formData.title,
    formData.author,
    formData.pages,
    formData.read,
  );
  myLibrary.push(book);
  testLibrary = JSON.parse(localStorage.getItem('testLibrary'));
  testLibrary.push(book);
  localStorage.setItem('testLibrary', JSON.stringify(testLibrary));
  render();
}

function displayForm() {
  form.style.display = 'block';
}

function closeForm() {
  form.style.display = 'none';
}

document.getElementById('new-book').addEventListener('click', displayForm);
document.getElementById('close').addEventListener('click', closeForm);
document.getElementById('add').addEventListener('click', addBookToLibrary);
