async function fetchBookCover(title) {
    const query = encodeURIComponent(title);
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`);
    const data = await response.json();

    if (data.totalItems > 0) {
        const thumbnail = data.items[0].volumeInfo.imageLinks?.thumbnail;
        return thumbnail || null;
    }

    return null;
}

const myLibrary = []

function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID(); 
        this.read = read;
        this.readString = (this.read == true) ? "read" : "not read yet"
        this.isDisplayed = false
        
    }

Book.prototype.changeReadStatus = function(){
        if(this.read===true){
            this.read = false;
        }
        else if(this.read===false){
            this.read = true;
        }
}

Book.prototype.info = function(){
        return(`${this.title} by ${this.author}, ${this.pages} pages, ${this.readString}`)
}

function addBookToLibrary(title, author, pages, read){
    myLibrary.push(new Book(title, author, pages, read,))
}

function deleteBookById(id){
    for(let i = 0; i < myLibrary.length; i++){
        if(id === myLibrary[i].id){
            myLibrary.splice(i, 1);
            const cardToDel = document.getElementById(`${id}`)
            cardToDel.remove();
        }


    }
}

function updateReadStatusById(divID, statusID){

    for(let i = 0; i < myLibrary.length; i++){
        if(divID === myLibrary[i].id){
            myLibrary[i].changeReadStatus();
            const status = document.getElementById(`${statusID}`)
            
            status.textContent = `Status: ${myLibrary[i].read == true ? "not read yet" : "read"}`;
            console.log("yep")
        }
    }
}






function createBookDisplayCard(i){
    const newDiv = document.createElement("div")
    newDiv.className = "bookCard";
    newDiv.id = myLibrary[i].id

    const title = document.createElement("div")
    title.textContent = `Title: ${myLibrary[i].title}`

    const author = document.createElement("diterationv")
    author.textContent = `Author: ${myLibrary[i].author}`

    const pages = document.createElement("div")
    pages.textContent = `Pages: ${myLibrary[i].pages}`

    const status = document.createElement("div")
    status.textContent = `Status: ${myLibrary[i].readString}`;
    status.id = crypto.randomUUID(); 

    const statusToggle = document.createElement("button");
    statusToggle.className="toggle";
    statusToggle.textContent = "Change Status";

    statusToggle.addEventListener("click", () => {
        updateReadStatusById(newDiv.id, status.id);
        console.log("im here")
    })
                                     






    const delButton = document.createElement("button");
    delButton.className = "delete-book";
    delButton.id = myLibrary[i].id

    delButton.addEventListener("click", () => {
        deleteBookById(newDiv.id);
    })

    fetchBookCover(myLibrary[i].title)
    .then(imageUrl => {
        if (imageUrl) {
            const img = document.createElement("img");
            img.src = imageUrl;
            newDiv.append(img);
        } else {
            console.log("No image found.");
        }
    });

    newDiv.append(title, author, pages, status, statusToggle, delButton);

    const newDivContainer = document.createElement("div");

    newDivContainer.className = "grid-item-container"

    newDivContainer.append(newDiv);

    mainContent = document.getElementById("main");

    addBook = document.getElementById("add-book-container");

    mainContent.append(newDivContainer);

    myLibrary[i].isDisplayed = true;
}


function displayLibrary(){
    for (let i = 0; i < myLibrary.length;){
        if(myLibrary[i].isDisplayed === true){
            i++;
        }

        else{
        createBookDisplayCard(i);
        i++;}
    }
}

addBookToLibrary("Boy swollows universe", "Trent Dalton", 450, false);


const dialog = document.getElementById("add-book-dialog") 
const closeBtn = document.getElementById("close") 
const openBtn = document.getElementById("add-book-button")

openBtn.addEventListener("click", () => {
   dialog.showModal(); 
})

closeBtn.addEventListener("click", () => {
    dialog.close();
})



const form = document.getElementById("new-book-details")

form.addEventListener("submit", function(e){
    e.preventDefault();
    
    const newTitle = document.getElementById("new-title").value;
    const newAuthor = document.getElementById("new-author").value;
    const newPages = document.getElementById("new-pages").value;
    const status = document.querySelector("input[name='choice']:checked").value === "true";

    addBookToLibrary(newTitle, newAuthor, newPages, status);

    displayLibrary();

    dialog.close();





});


displayLibrary();