
let exhibitionsApiUrl = 'https://api.artic.edu/api/v1/exhibitions';

fetch(exhibitionsApiUrl)
.then((response) => {
  if(response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch API url');
  }
})
.then((data) => {
    console.log(data);

    let confirmationMessage2 = document.createElement('h4');
    confirmationMessage2.innerText = 'API request of an exhibition info is successful!';

    let exhibitionsTotal = document.createElement('p');
    exhibitionsTotal.innerText = `Total number of exhibitions: ${data.pagination.total}`;

    let exhibitionSection = document.getElementById('exhibitions');
    exhibitionSection.appendChild(confirmationMessage2);
    exhibitionSection.appendChild(exhibitionsTotal);

})
.catch((error) => {
    console.error('There was a problem with the completing the fetch: ', error);

}
);

function getRandom20(){
  let randomPage = Math.floor(Math.random() * 100) + 1; //getting random page 
  return `https://api.artic.edu/api/v1/artworks?fields=id,title,artist_title,date_display,image_id&page=${randomPage}&limit=20`;
}

let artworksApiUrl = getRandom20(); 

fetch(artworksApiUrl)
  .then(response => response.json())
  .then(data => {
    displayArtworks(data.data);
  })
  .catch(error => console.error('Error fetching artworks:', error));

  function displayArtworks(artworks) {
    let artworksSection = document.getElementById('artworks-container');
    artworksSection.innerHTML = '';  // Deleting previous content of section before loading artworks
  
    artworks.forEach(artwork => {
      // Creating miniature of an artwork
      let imgElement = document.createElement('img');
      imgElement.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/200,/0/default.jpg`; 
      imgElement.alt = artwork.title;
      imgElement.style.cursor = 'pointer';
  
      // Creating action on click
      imgElement.addEventListener('click', () => displayArtworkDetails(artwork));
  
      // Adding miniature to the section
      artworksSection.appendChild(imgElement);
    });
  }  

  // Function to display extened info about selected artwork
function displayArtworkDetails(artwork) {
  let artworkDetailsContainer = document.getElementById('one-selected-artwork-container');
  artworkDetailsContainer.innerHTML = '';

 // Getting an artwork image
 let imgElement = document.createElement('img');
 imgElement.src = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`;
 imgElement.alt = artwork.title;

 // Getting the title of selected artwork
 let artworkTitle = document.createElement('p');
 artworkTitle.innerText = `Title: ${artwork.title}`;

 // Name of artist
 let artistName = document.createElement('p');
 artistName.innerText = `Artist: ${artwork.artist_title}`;

 // When created
 let creationDate = document.createElement('p');
 creationDate.innerText = `Created: ${artwork.date_display}`;

 // Adding elements to the section
 artworkDetailsContainer.appendChild(imgElement);
 artworkDetailsContainer.appendChild(artworkTitle);
 artworkDetailsContainer.appendChild(artistName);
 artworkDetailsContainer.appendChild(creationDate);

 artworkDetailsContainer.style.display = 'block';
  }
  
  // Adding event for the 'Close' button
  document.getElementById('close-button').addEventListener('click', () => {
    let artworkDetailsContainer = document.getElementById('one-selected-artwork-container');
    artworkDetailsContainer.style.display = 'none'; // Hiding section with art details
  });

  //Hiding section with art details while no art is selected
  
  // Adding event for the Refreshing button
  document.getElementById('refresh-button').addEventListener('click', () => {
    let artworksSection = document.getElementById('artworks-container');
    artworksSection.innerHTML = '';
    artworksApiUrl = getRandom20();
    fetch(artworksApiUrl)
      .then(response => response.json())
      .then(data => {
        displayArtworks(data.data); // Refreshing the list of artworks
      })
      .catch(error => console.error('Error fetching artworks:', error));
  });
  