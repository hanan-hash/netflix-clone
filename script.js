document.getElementById('search-movie-btn').addEventListener('click', function() {
    const movieTitle = document.getElementById('movie-title').value;
    if (movieTitle) {
        fetchMovieData(movieTitle);
    }
});

function fetchMovieData(title) {
    const apiKey = '402b5eb4';
    const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                displayMovieData(data);
            } else {
                displayError(data.Error);
            }
        })
        .catch(error => {
            console.error('Error fetching movie data:', error);
            displayError('Failed to fetch movie data. Please try again.');
        });
}

function displayMovieData(data) {
    const movieInfoDiv = document.getElementById('movie-info');
    movieInfoDiv.innerHTML = `
        <div class="movie-details">
            <h3>${data.Title} (${data.Year})</h3>
            <p><strong>Genre:</strong> ${data.Genre}</p>
            <p><strong>Plot:</strong> ${data.Plot}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
            <img src="${data.Poster !== 'N/A' ? data.Poster : 'assets/images/no-image.jpg'}" alt="${data.Title}" />
        </div>
    `;
}

function displayError(message) {
    const movieInfoDiv = document.getElementById('movie-info');
    movieInfoDiv.innerHTML = `<p class="error">${message}</p>`;
}