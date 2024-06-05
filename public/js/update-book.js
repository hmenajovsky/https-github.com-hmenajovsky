document.addEventListener('DOMContentLoaded', function() {

document.querySelector('form').addEventListener('submit', async (event) => {
    
    event.preventDefault(); // Empêche le rechargement de la page     

    //const formData = new FormData(event.target); // Récupère les données du formulaire

    const form = document.getElementById('update-form');
    const bookData = {
        title: form.querySelector('#title').value,
        //releaseDate: form.querySelector('#date').value
    };

    console.log(bookData);

    fetch('/api/books', {
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
    

});

});
