"use strict";
const API_KEY = '33139428-a4880fd896903b0937526f617';
const URL = 'https://pixabay.com/api/'
const input = document.querySelector(".searchQuery")
const form = document.querySelector(".search-form")
const list= document.querySelector(".list")

form.addEventListener("submit", searchUser)

function searchUser(event) {
    event.preventDefault()
    const name = event.currentTarget.searchQuery.value
    fetchForUser(name)
}

function fetchForUser(name) {
    return fetch(`${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true`)  
    .then((response) => response.json())
        .then((foto) => {
            const card = foto.hits
            
            for (let i = 0; i < card.length; i +=1) {
                const image = card[i].webformatURL
                const description = card[i].tags
                const likesAmount = card[i].likes
                const viewsAmount = card[i].views
                const commentsAmount = card[i].comments
                const downloadsAmount = card[i].downloads
    
                list.innerHTML += `<li class="item">
        <img src="${image}" alt="${description}" loading="lazy">
        <ul>
          <li>
            <p>Likes</p>
            <p>${likesAmount}</p>
          </li>
          <li>
            <p>Views</p>
            <p>${viewsAmount}</p>
          </li>
          <li>
            <p>Comments</p>
            <p>${commentsAmount}</p>
          </li>
          <li>
            <p>Downloads</p>
            <p>${downloadsAmount}</p>
          </li>
        </ul>
      <li>`
    }
})
}
