"use strict";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const API_KEY = '33139428-a4880fd896903b0937526f617';
const URL = 'https://pixabay.com/api/'
const input = document.querySelector(".searchQuery")
const form = document.querySelector(".search-form")
const list = document.querySelector(".list")
const laadMoreBtn = document.querySelector(".load-more")

form.addEventListener("submit", searchUser)
laadMoreBtn.addEventListener("click", searchOnLoadMoreBtn)

function searchUser(event) {
    event.preventDefault()
    const name = event.currentTarget.searchQuery.value
    const pageAmount = 1;
    fetchForUser(name, pageAmount)
        .then((foto) => {
            const card = foto.hits
            
            if (card.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.")
            } else {
                list.innerHTML = ""
                Notify.info(`Hooray! We found ${foto.totalHits} images.`)

                addFotoToUserInterface(card)

                let gallery = new SimpleLightbox('.gallery a');
                gallery.on('show.simplelightbox', function () {
	                console.log("BIG");
                });
            }   
        })
        .catch(error => { console.log("Oops, there is error") })
        .finally(() => form.reset());

}

// async function searchOnLoadMoreBtn() {
//     const response =  await fetch(`${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageAmount}`)  
//     return await response.json();
// }


async function fetchForUser(name, pageAmount) {
   const response =  await fetch(`${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageAmount}`)  
    return await response.json();
}


function addFotoToUserInterface(card) {
            
    for (let i = 0; i < card.length; i += 1) {

        const imageeLarge = card[i].largeImageURL   
        const image = card[i].webformatURL
        const description = card[i].tags
        const likesAmount = card[i].likes
        const viewsAmount = card[i].views
        const commentsAmount = card[i].comments
        const downloadsAmount = card[i].downloads

        list.innerHTML += `<li class="item">
        <div class="gallery">
        <a class"link" href="${imageeLarge}">
        <img class="image" src="${image}" alt="${description}" loading="lazy">
        </a>
        </div>
    <ul class="info">
        <li>
        <p>Likes</p>
        <p class="amount">${likesAmount}</p>
        </li>
        <li>
        <p>Views</p>
        <p class="amount">${viewsAmount}</p>
        </li>
        <li>
        <p>Comments</p>
        <p class="amount">${commentsAmount}</p>
        </li>
        <li>
        <p>Downloads</p>
        <p class="amount">${downloadsAmount}</p>
        </li>
    </ul>
    <li>`
    }
}


// Для HTTP-запитів використана бібліотека axios.

//Пагінація

//SimpleLightbox Бібліотека містить метод refresh(), який обов'язково потрібно викликати
// щоразу після додавання нової групи карток зображень.

//плавне прокручування

//Нескінченний скрол
