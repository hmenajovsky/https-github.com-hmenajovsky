(function () {
    document.addEventListener('DOMContentLoaded', function () {

        // déclaration des fonctions

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
                button.classList.add('update');
                editItem.appendChild(button);
                bookList.appendChild(editItem);
            });           
            getBookFromButtons();
        });
}

    function getBooksData() {
        return fetch('https://p5a0e.ciroue.com/api/books')
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

        
        function updateBook(id) {     
               
            const form = document.querySelector('#update-form');  
            //const updateButton = document.querySelector("update-button");
            //console.log(updateButton);        
                    
            form.addEventListener('submit', async (event) => {
                event.preventDefault(); // Empêche le rechargement de la page
               
                const url = `https://p5a0e.ciroue.com/api/books/${id}`; 
                
                const bookData = {
                    title: document.querySelector('#title').value,
                    //releaseDate: form.querySelector('#date').value
                };
                console.log(bookData);

                fetch(url, {
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
                        console.log(bookData);
                    })
                    .then(data => {
                        // Gérez ici la réponse de succès
                        console.log('Livre mis à jour avec succès !');
                       /* const titleItems = document.querySelectorAll("#updatedTitle");
                        console.log(titleItems);
                        const updatedItem = Array.from(titleItems).filter( item => item.getAttribute('data-id') === id);
                        console.log(updatedItem[0]);
                        updatedItem[0].textContent = bookData.title;*/

                        //window.location.reload();
                    })
                    .catch(error => {
                        console.error('Erreur:', error);
                        // Gérez ici les erreurs
                    });
            });

        }

        function adddBook() {
            const form = document.getElementById('addBookForm');
            form.addEventListener('submit', function(e) {
                e.preventDefault();
        
                const bookData = {
                    title: form.querySelector('#title').value,
                    releaseDate: form.querySelector('#date').value
                };

                console.log(bookData);
        
                fetch('/api/books', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ book: bookData }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Problème avec la requête Fetch');
                    }
                    return response.json();
                })
                .then(data => {
                    // Gérez ici la réponse de succès
                    window.location.reload();
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    // Gérez ici les erreurs
                });
            });
        }

        function getBookFromButtons() {   
            const editButtons = document.querySelectorAll('.update');       
            const buttonsNodeList = [];
            for (let i = 1; i < editButtons.length + 1; i++) {
                buttonsNodeList.push(document.getElementById(i));
            }                   
            buttonsNodeList.forEach(button => {
                button.addEventListener("click", function () {                    
                    const isbn = this.getAttribute('data-id');
                    /*const filteredItems = items.filter(item => item.getAttribute('data-id') === isbn);    
                    filteredItems.forEach(item => item.textContent = '') */          
                    displayOneBook(isbn); 
                    const updateButton = document.getElementById('update-button');                   
                    updateBook(isbn);                       
                });                         
            });            
        }   


        function getOneBook(id) {
            return fetch('https://p5a0e.ciroue.com/api/books/' + id)
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
            getOneBook(id)
                .then(bookData => {
                    console.log(bookData);
                 const bookItem = document.getElementById('book-item');

                 const isbnItem = document.createElement('li');
                 isbnItem.classList.add('grid-item');
                 isbnItem.textContent = bookData.book.id; 
                 bookItem.appendChild(isbnItem);

                 const titleItem = document.createElement('li');
                 titleItem.classList.add('grid-item');                           
                 const titleInput = document.createElement('input');
                 titleInput.setAttribute('type', 'text');
                 titleInput.setAttribute('id', 'title');
                 titleInput.setAttribute('name', 'title');
                 titleInput.setAttribute('placeholder', 'saisir un titre');
                 titleInput.value = "nouveau titre";
                 titleItem.appendChild(titleInput);
                 bookItem.appendChild(titleItem);
 
                 const dateItem = document.createElement('li');
                 dateItem.classList.add('grid-item');                
                 const dateInput= document.createElement('input');
                 dateInput.setAttribute('type', 'date');
                 dateInput.setAttribute('id', 'date');
                 dateInput.setAttribute('name', 'date');                 
                 dateItem.appendChild(dateInput);
                 bookItem.appendChild(dateItem);

                 const submitItem = document.createElement('li');
                 submitItem.classList.add('grid-item');              
                 const submitButton = document.createElement('button');                          
                 submitButton.innerHTML = 'valider'; // Remplacez par la propriété correspondante dans vos données
                 submitButton.classList.add('edit-button');
                 submitButton.setAttribute('id', 'update-button');
                 submitItem.appendChild(submitButton);               
                 bookItem.appendChild(submitItem); 

                }).catch(error => {
                    console.error('Erreur :', error);
                });
        }

    

        //execution des fonctions au chargement
        
        displayBooks();  
        adddBook();   
        //getBookFromButtons();
        //updateBook('978-9973-223-5-62');

        //displayOneBook('978-9973-223-5-62');

        

        

    });
})();
