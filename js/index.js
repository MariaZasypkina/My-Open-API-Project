
let apiUrl = 'https://api.artic.edu/api/v1/artworks/129884';

fetch(apiUrl)
.then((response) => {
  if(response.ok) {
    return response.json();
  } else {
    throw new Error('Failed to fetch API url');
  }
})
.then((data) => {
    console.log(data);

    let confirmationMessage = document.createElement('h4');
    confirmationMessage.innerText = 'API request of an artwork with id 129884 is successful!';

    let artworkTitle = document.createElement('p');
    artworkTitle.innerText = `Title: ${data.data.title}`;

    let artworksSection = document.getElementById('artworks');
    artworksSection.appendChild(confirmationMessage);
    artworksSection.appendChild(artworkTitle);

})
.catch((error) => {
    console.error('There was a problem with the completing the fetch: ', error);

}
);

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
