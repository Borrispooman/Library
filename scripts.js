const myLibrary = []

function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID(); 
        this.read = read;
        this.readString = (this.read == true) ? "read" : "not read yet"
        this.info = function(){
            return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.readString}`)
        }
    }
    
    Book.prototype.info = function(){
            return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.readString}`)
    }

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read,))
}

function displayLibrary(){
    for (let i = 0; i < myLibrary.length; i++){
        const newDiv = document.createElement("div")
        newDiv.className = "bookCard";

        const title = document.createElement("div")
        title.textContent = `Title: ${myLibrary[i].title}`

        const author = document.createElement("div")
        author.textContent = `Author: ${myLibrary[i].author}`

        const pages = document.createElement("div")
        pages.textContent = `Pages: ${myLibrary[i].pages}`

        const status = document.createElement("div")
        status.textContent = `Status: ${myLibrary[i].readString}`

        newDiv.append(title, author, pages, status);

        const newDivContainer = document.createElement("div");

        newDivContainer.className = "grid-item-container"

        newDivContainer.append(newDiv);

        mainContent = document.getElementById("main");

        addBook = document.getElementById("add-book-container");

        mainContent.insertBefore(newDivContainer, addBook);
    }
}

addBookToLibrary("Boy swollows universe", "Trent Dalton", 450, false);

displayLibrary();

