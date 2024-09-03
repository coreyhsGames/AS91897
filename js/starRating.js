const starRatings = document.querySelectorAll('.rating label');

starRatings.forEach(starRating => {
    let rating = starRating.querySelector('input').value;
    if (rating > 5) {
        rating = 5;
    }
    for (let i = 1; i <= rating; i++) {
        console.log(i);
        starRating.querySelector(` :nth-child(${i+1})`).classList.add('gold');
    }
});