
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import throttle from 'lodash.throttle';
import axios from 'axios';


const API_KEY = '33139428-a4880fd896903b0937526f617';
const URL = 'https://pixabay.com/api/'
const input = document.querySelector(".searchQuery")
const form = document.querySelector(".search-form")
const list = document.querySelector(".list")

// const laadMoreBtn = document.querySelector(".load-more")

window.addEventListener('scroll', throttle(checkPosition, 250))
window.addEventListener('resize', throttle(checkPosition, 250))
form.addEventListener("submit", searchFromhUser)
// laadMoreBtn.addEventListener("click", searchOnLoadMoreBtn)

let gallery = new SimpleLightbox('.gallery a'); 
 
let pageAmount = 1;

function searchFromhUser(event) {
    // laadMoreBtn.classList.add("is-hidden")
    event.preventDefault()
    const name = event.currentTarget.searchQuery.value
    pageAmount = 1;

    // if (!name) {
    //     Notify.failure("Введіть, будь ласка, ваш запит", { position: 'center-center'})
    //     return
    // }

    fetchForUser(name, pageAmount)
        .then((foto) => {
            const card = foto.hits
            
            if (card.length === 0) {
                Notify.failure("Sorry, there are no images matching your search query. Please try again.", { position: 'center-center'})
            } else {
                list.innerHTML = ""
                Notify.info(`Hooray! We found ${foto.totalHits} images.`);

                addFotoToUserInterface(card)
             
                // laadMoreBtn.classList.remove("is-hidden")

                gallery.refresh()

                pageAmount += 1;
            }   
        })
        .catch(error => { console.log("Oops, there is error") })
        .finally(() => form.reset());

}

function checkPosition() {
  const height = document.body.offsetHeight
  const screenHeight = window.innerHeight
  const scrolled = window.scrollY

  const threshold = height - screenHeight /4
  const position = scrolled + screenHeight

      if (position >= threshold) {
    searchOnLoadMoreBtn()
  }
}

function searchOnLoadMoreBtn() {
    const name = input.value
    pageAmount += 1;

    fetchForUser(name, pageAmount)
        .then((foto) => {
            const card = foto.hits
            const totalPageAmount = Math.ceil(foto.totalHits / foto.hits.length-1)
            //console.log(totalPageAmount);

            if (pageAmount <= totalPageAmount) {

                addFotoToUserInterface(card)

                gallery.refresh()
             
            } else  Notify.warning("We're sorry, but you've reached the end of search results.",  { position: 'center-bottom'})
            // }   
        })
        .catch(error => { console.log("Oops, there is error") })
        .finally(() => form.reset());

}



async function fetchForUser(name, pageAmount) {
   const response =  await axios.get(`${URL}?key=${API_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${pageAmount}`)  
    return await response.data;

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
        <img class="image" src="${image}" alt="${description}" loading="lazy" width="288" height="187">
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

    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    });
}





//Пагінація
// При повторному сабміті форми кнопка спочатку ховається,
//     а після запиту знову відображається.



