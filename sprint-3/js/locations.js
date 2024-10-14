const locationsJSONPath = './data/locations.json';

const locationsContainer = document.getElementById('locations-container');

async function loadLocations() {
    // Retrieve locations data from a data source (json)
    const locations = await getLocationsData();

    // Sort the locations array by name (alphabetical)
    locations.sort((a, b) => a.name.localeCompare(b.name));

    // Iterate over each location and create an HTML card for it
    locations.forEach(location => {

        // Create a new HTML card element
        const card = document.createElement('div');
        card.classList.add('card');
        
         // Define the card's content using template literals
        card.innerHTML = `
            <img src="${location.image}" alt="${location.name}">
            <h3>${location.name}</h3>
            <p>${location.address}</p>
            <div class="hours">${location.hours}</div>
            <button>Get Directions</button>
        `;
        
        // Append the card to the locations container element
        locationsContainer.appendChild(card);
    });
}
loadLocations();

// Gets the locations.json file
async function getLocationsData() {
    return fetch(locationsJSONPath)
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