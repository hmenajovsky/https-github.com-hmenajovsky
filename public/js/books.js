// Fonction pour récupérer les données des livres via fetch
function getBooksData() {
    return fetch('http://localhost:8000/api/books')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

function getOneBookData(id) {
    return fetch('http://localhost:8000/api/books/' + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
}

function displayOneBook(id) {
    getOneBookData(id)
        .then(bookData => {
            displayUpdateForm(bookData);           
           
            /*           
            const isbnItem = document.createElement('li');
                 isbnItem.classList.add('grid-item');
                 isbnItem.textContent = bookData.book.id; // Remplacez par la propriété correspondante dans vos données
                 bookItem.appendChild(isbnItem);
 
                const titleItem = document.createElement('li');
                 titleItem.classList.add('grid-item');
                 titleItem.textContent = bookData.book.title; // Remplacez par la propriété correspondante dans vos données
                 bookItem.appendChild(titleItem);
 
                 const dateItem = document.createElement('li');
                 dateItem.classList.add('grid-item');
                 dateItem.textContent = bookData.book.releaseDate; // Remplacez par la propriété correspondante dans vos données
                 bookItem.appendChild(dateItem);
 
                 const submitItem = document.createElement('li');
                 submitItem.classList.add('grid-item');               
                 const submitButton = document.createElement('submit');                
                 submitButton.innerHTML = 'valider'; // Remplacez par la propriété correspondante dans vos données
                 submitButton.classList.add('edit-button');
                 submitItem.appendChild(submitButton);               
                 bookItem.appendChild(submitItem); */
        });
}

function displayUpdateForm(data) {
    fetch('http://localhost:8000/public/book.html')
    .then(function (response) {
        return response.text(); // Récupère le contenu HTML sous forme de texte

    })
    .then(function (htmlContent) {
        // Traitez le contenu HTML ici (par exemple, affichez-le dans la console)
        console.log(data);
        const bookItem = document.getElementById("book-item");
        bookItem.innerHTML = htmlContent;
        const isbnItem = document.getElementById('isbn');        
        isbnItem.textContent = data.book.id;

        const parser = new DOMParser();
        const parsedHtml = parser.parseFromString(htmlContent, 'text/html');
        const form = parsedHtml.getElementById('update-form');
                      
        form.addEventListener('submit',  function(e) {
           e.preventDefault(); // Empêche le rechargement de la page  
            
            const bookData = {
                title: this.querySelector('#title').value,
                //releaseDate: form.querySelector('#date').value
            };
            console.log(bookData);
            //updateBooks(bookData);
        })
    })
    .catch(error => {
        console.error('Erreur :', error);
    });

}

function displayUpdateFormTest(data) {
    fetch('http://localhost:8000/public/book.html')
        .then(function (response) {
            return response.text(); // Récupère le contenu HTML sous forme de texte

        })
        .then(function (htmlContent) {
            // Traitez le contenu HTML ici (par exemple, affichez-le dans la console)
            console.log(data);
            const bookItem = document.getElementById("book-item");
            bookItem.innerHTML = htmlContent;
            const isbnItem = document.getElementById('isbn');
            console.log(isbnItem);
            isbnItem.textContent = data.book.id;

            const parser = new DOMParser();
            const parsedHtml = parser.parseFromString(htmlContent, 'text/html');
            const form = parsedHtml.querySelector('#update-form');

            form.addEventListener('submit', async (event) => {

                event.preventDefault(); // Empêche le rechargement de la page     

                //const formData = new FormData(event.target); // Récupère les données du formulaire

                const bookData = {
                    title: this.querySelector('#title').value,
                    //releaseDate: form.querySelector('#date').value
                };
                console.log(bookData);
                //updateBooks(bookData);
            })
        })
        .catch(error => {
            console.error('Erreur :', error);
        });

}


// Fonction pour afficher les données des livres dans la grille HTML
function displayBooks() {
    const bookList = document.getElementById('book-list');
    getBooksData()
        .then(booksData => {
            console.log(booksData);
            const buttons = [];
            const items = [];

            // Ajoutez les éléments de la liste
            booksData.forEach((book, index) => {
                const isbnItem = document.createElement('li');
                isbnItem.setAttribute('data-id', book.id);
                items.push(isbnItem);
                isbnItem.classList.add('grid-item');
                isbnItem.textContent = book.id; // Remplacez par la propriété correspondante dans vos données
                bookList.appendChild(isbnItem);

                const titleItem = document.createElement('li');
                titleItem.setAttribute('data-id', book.id);
                items.push(titleItem);
                titleItem.classList.add('grid-item');
                titleItem.textContent = book.title; // Remplacez par la propriété correspondante dans vos données
                bookList.appendChild(titleItem);

                const dateItem = document.createElement('li');
                dateItem.setAttribute('data-id', book.id);
                items.push(dateItem);
                dateItem.classList.add('grid-item');
                dateItem.textContent = book.releaseDate; // Remplacez par la propriété correspondante dans vos données
                bookList.appendChild(dateItem);

                const editItem = document.createElement('li');
                editItem.setAttribute('data-id', book.id);
                items.push(editItem);
                editItem.classList.add('grid-item');
                const button = document.createElement('button');
                buttons.push(button);
                button.setAttribute('data-id', book.id);
                button.setAttribute('id', index + 1);
                button.innerHTML = 'modifier'; // Remplacez par la propriété correspondante dans vos données
                button.classList.add('edit-button');
                editItem.appendChild(button);
                bookList.appendChild(editItem);
            });

            console.log(buttons);
            const buttonsNodeList = [];
            for (let i = 1; i < buttons.length + 1; i++) {
                buttonsNodeList.push(document.getElementById(i));
            }
            buttonsNodeList.forEach(button => {
                button.addEventListener("click", function () {
                    console.log('clicked');
                    const isbn = this.getAttribute('data-id');
                    /*const filteredItems = items.filter(item => item.getAttribute('data-id') === isbn);    
                    filteredItems.forEach(item => item.textContent = '') */
                    return displayOneBook(isbn);
                });
            });

        });
}

// Appelez la fonction pour afficher les données des livres au chargement de la page
//displayBooks();


const form = document.querySelector('#update-form');

form.addEventListener('submit',  function(e) {
    e.preventDefault(); // Empêche le rechargement de la page  

    const isbnItem= document.getElementById("isbn");
     
     const bookData = {
         title: this.querySelector('#title').value,
         //releaseDate: form.querySelector('#date').value
     };
     console.log(bookData);
     //updateBooks(bookData);
 })



function updateBooks(id) {

    fetch('/api/books/id', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book: bookData }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Problème avec la requête Fetch');
            }
            console.log('Livre mis à jour avec succès !');
            console.log(bookData);
        })
        .then(data => {
            // Gérez ici la réponse de succès
            window.location.reload();
        })
        .catch(error => {
            console.error('Erreur:', error);
            // Gérez ici les erreurs
        });

}



