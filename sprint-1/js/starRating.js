const starRatings = document.querySelectorAll('.rating label');

function updateStars(starRating) {
    // Clear previous ratings
    starRating.querySelectorAll('.gold').forEach(star => {
        star.classList.remove('gold');
    });

    let rating = starRating.querySelector('input').value;
    if (rating > 5) {
        rating = 5;
    }

    for (let i = 1; i <= rating; i++) {
        starRating.querySelector(` :nth-child(${i + 1})`).classList.add('gold');
    }
}

// Initial rendering of stars
starRatings.forEach(starRating => {
    updateStars(starRating); // Call to set initial state
});
