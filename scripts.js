let books;
const getBooks = async () => {
    try {
        let res = await fetch("https://striveschool-api.herokuapp.com/books", {method: "GET"})
        books= await res.json()
        renderBooks(books);
    } catch(err) {
        console.log(err)
    }
}
let cardArray=[];
bookLocation = document.getElementById("book-location");
renderBooks= (books)=>{
    bookLocation.innerHTML="";
    books.forEach(book => {
        bookLocation.innerHTML+=`
        <div class='col col-sm-6 col-lg-3 col-md-4'>
            <div class="card">
                <img src="${book.img}" class="card-img-top" alt="...">
                <div class="genre-badge hidden""><p>In Cart</p></div>
                <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  <p>$${book.price}</p>
                  <button type="button card-button" class="btn btn-primary" onclick="addToCart(this)">Add to Cart</button>
                  <button type="button card-button" class="btn btn-danger" onclick="skipCard(this)">Skip</button>
                </div>
            </div> 
        </div>`
    });
    arrayOfCards();
}

dropdownMenu = document.getElementById("dropdown-menu");
dropdownCount = document.getElementById("dropdown-count");
addToCart=(button)=>{
    bookTitle = button.previousSibling.previousSibling.previousSibling.previousSibling.textContent;
    dropdownMenu.innerHTML+=`<li>${bookTitle} <button class="dropdownButton" type="button" onclick="deleteLi(this)">X</button></li>`
    button.parentNode.previousSibling.previousSibling.classList.remove("hidden");
    checkCartCount();
    arrayOfCards();
}



deleteLi= (button)=>{
    button.parentNode.remove();
    checkCartCount();
    arrayOfCards();
}

checkCartCount=()=>{
    console.log(dropdownMenu.children.length);
    //list.reduce((acc,cur)=>acc+1);
    dropdownCount.innerHTML=`Cart (${dropdownMenu.children.length})`
}

emptyCart=()=>{
    dropdownMenu.innerHTML="";
    checkCartCount();
    arrayOfCards();
}
skipCard= (button)=>{
    button.parentNode.parentNode.parentNode.remove();
    arrayOfCards();
}

arrayOfCards=()=>{
    cardArray = document.querySelectorAll(".card")
    console.log(cardArray);
    console.log()
    checkInCart();
}

checkInCart =()=>{
    cardArray.forEach(card =>{
        cardBody = card.closest(".card-body")
        console.log(cardBody);
        arrayOfNodes= Array.from(dropdownMenu.children)
        arrayOfNodes.forEach(title=>{
            //if(title.includes(card.))
            
        })
    })
}

let searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", ()=>{
    let search = searchInput.value;
    if(search.length<3){
        renderBooks(books);
    }else{
        newBooks = books.filter(contains =>contains.title.toLowerCase().includes(search.toLowerCase()))
        renderBooks(newBooks);
    }

});



window.onload = ()=>{
    getBooks();
}