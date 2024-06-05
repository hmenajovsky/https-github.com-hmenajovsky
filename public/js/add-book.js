document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('addBookForm'); // Remplacez par l'ID de votre formulaire
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const bookData = {
            title: form.querySelector('#title').value,
            releaseDate: form.querySelector('#date').value
        };

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
});
