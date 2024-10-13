const candyViewCloseBtn = document.querySelector('.candy-view .close-btn');
const candyView = document.querySelector('.candy-view');

const candyJSONPath = './data/candy.json';

async function loadCandySection(section, filters = null) {
    const data = await getCandyData();
    let filteredData = data;

    if (filters.length > 0) {
        filteredData = data.filter(candy => {
            const tags = candy.tags.split(',').map(tag => tag.trim()); // Split and trim tags

            // Check if the "best-sellers" tag is in the filters
            const hasBestSellersFilter = filters.includes("best-sellers");

            // If "best-sellers" is a filter, remove it from the filters to check
            const effectiveFilters = hasBestSellersFilter
                ? filters.filter(filter => filter !== "best-sellers")
                : filters;

            // Check if all effective filters are present in the tags
            return effectiveFilters.every(filter => tags.includes(filter));
        });
    }

    // Check if "best-sellers" filter is present
    const isBestSellers = filters.includes('best-sellers');

    // Sort the filtered data
    if (isBestSellers) {
        filteredData.sort((a, b) => b.sold - a.sold); // Sort by number sold in descending order
    } else {
        // Default sorting if no bestsellers filter
        filteredData.sort((a, b) => a.name.localeCompare(b.name)); // Alphabetical sorting as a default
    }

    section.querySelectorAll('.card').forEach((element, i) => {
        if (i < filteredData.length) {
            const candy = filteredData[i];

            element.querySelector('.card-info .candy-name').innerText = `${candy.name} (${candy.quantity}g)`;
            element.querySelector('.card-info .price').innerText = `$${candy.price}`;
            element.querySelector('.candy-img').src = candy.img;
            element.querySelector('.candy-img').alt = `${candy.name} (${candy.quantity}g)`;
            element.querySelector('.card-info .num-sold').innerText = `${candy.sold} Sold`;

            // Star rating
            element.querySelector('.rating label input').value = candy.rating;
            updateStars(element.querySelector('.rating label'));

            element.addEventListener('click', function (event) {
                candyView.classList.remove('hide');
                candyView.classList.add('zoomIn');

                candyView.addEventListener('animationend', function () {
                    candyView.classList.remove('zoomIn');
                }, { once: true }); // Ensures the listener is removed after it's called

                candyView.querySelector('.container .candy-name').innerText = `${candy.name} (${candy.quantity}g)`;
                candyView.querySelector('.container .candy-price').innerText = `$${candy.price}`;
                candyView.querySelector('.container .candy-img').src = candy.img;
                candyView.querySelector('.container .candy-img').alt = `${candy.name} (${candy.quantity}g)`;
                candyView.querySelector('.container .candy-sold').innerText = `${candy.sold} Sold`;
                candyView.querySelector('.container .candy-description').innerHTML = candy.description;

                // Star rating
                candyView.querySelector('.candy-stats .candy-rating label input').value = candy.rating;
                updateStars(candyView.querySelector('.candy-stats .candy-rating label'));
            });
        }
    });
}

// Gets the candy.json file
async function getCandyData() {
    return fetch(candyJSONPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error: ', error);
            throw error; // Rethrow the error to be caught in loadCandySection
        });
}

candyViewCloseBtn.addEventListener('click', function () {
    candyView.classList.add('zoomOut');

    candyView.addEventListener('animationend', function () {
        candyView.classList.remove('zoomOut');
        candyView.classList.add('hide');
    }, { once: true }); // Ensures the listener is removed after it's called
});