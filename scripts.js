const myLibrary = []

function Book(title, author, pages, read){
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.id = crypto.randomUUID(); 
        this.read = read;
        this.readString = (this.read == true) ? "Read" : "Not read yet"
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
            
            status.textContent = `Status: ${myLibrary[i].read == true ? "Not read yet" : "Read"}`;
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
    delButton.textContent = "Remove"
    delButton.id = myLibrary[i].id

    delButton.addEventListener("click", () => {
        deleteBookById(newDiv.id);
    })

    newDiv.append(title, author, pages, status, statusToggle, delButton);

    mainContent = document.getElementById("main");

    addBook = document.getElementById("add-book-container");

    mainContent.append(newDiv);

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
