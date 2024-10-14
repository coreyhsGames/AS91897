// Select all label elements within elements with the class 'rating'
const starRatings = document.querySelectorAll('.rating label');

// Function to update the star ratings based on the selected value
function updateStars(starRating) {
    // Clear previous ratings by removing the 'gold' class from all currently gold stars
    starRating.querySelectorAll('.gold').forEach(star => {
        star.classList.remove('gold');
    });

    // Get the current rating value from the input associated with the star rating
    let rating = starRating.querySelector('input').value;

    // Ensure the rating does not exceed 5
    if (rating > 5) {
        rating = 5;
    }

    // Add the 'gold' class to the stars based on the current rating
    for (let i = 1; i <= rating; i++) {
        starRating.querySelector(` :nth-child(${i + 1})`).classList.add('gold');
    }
}

// Initial rendering of stars for all star ratings
starRatings.forEach(starRating => {
    updateStars(starRating);
});
