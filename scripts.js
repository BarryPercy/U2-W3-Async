const getBooks = async () => {
    try {
        let res = await fetch("https://striveschool-api.herokuapp.com/books", {method: "GET"})
        let books= await res.json()
        console.log(books)
        renderBooks(books);
    } catch(err) {
        console.log(err)
    }
}

bookLocation = document.getElementById("book-location");
renderBooks= (books)=>{
    books.forEach(book => {
        bookLocation.innerHTML+=`
        <div class='col col-sm-6 col-lg-3 col-md-4'>
            <div class="card">
                <img src="${book.img}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <button type="button" class="btn btn-primary float-right" onclick="addToCart(this)">Add to Cart</button>
                </div>
                    
                </div>
            </div> 
        </div>`
    });
}

dropdownMenu = document.getElementById("dropdown-menu");
addToCart=(button)=>{
    bookTitle = button.previousSibling.previousSibling.textContent;
    console.log(bookTitle);
    dropdownMenu.innerHTML+=`<li>${bookTitle}} <button class="dropdownButton" type="button" onclick="deleteLi(this)">X</button></li>`
    
}

deleteLi= (button)=>{
    button.parentNode.remove();
}


window.onload = ()=>{
    getBooks();
}