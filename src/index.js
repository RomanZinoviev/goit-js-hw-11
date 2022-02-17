import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import Notiflix from 'notiflix';
import axios from "axios";
import SimpleLightbox from 'simplelightbox';
import NewApiService from './js/apiClass';

const newApiService = new NewApiService;
const searchFormEl = document.querySelector("#search-form");
const loadMoreButton = document.querySelector(".load-more");
const galleryEl = document.querySelector(".gallery");

const searchImagesHandle = (event) => {
    event.preventDefault();
    newApiService.query = event.currentTarget.searchQuery.value;
    newApiService.resetPage();
    newApiService.fetchImages().then(images => {
        imageMarkup(images)
    })
};

const imageMarkup = (images) => {
    const markup = images.map(({ webformatURL, tags, likes, views, comments, downloads }) => { 
         return `<div class="gallery__image">
  <img src="${webformatURL}" alt="${tags}" class="gallery__picture">
  <p class="gallery__likes">${likes}</p>
  <p class="gallery__views">${views}</p>
  <p class="gallery comments">${comments}</p>
  <p class="gallery__downoads">${downloads}</p>
</div>`
    }).join("");
    galleryEl.innerHTML = markup;
};

const addImageMarkup = (images) => {
    galleryEl.insertAdjacentHTML("beforeend", imageMarkup(images))
}

searchFormEl.addEventListener("submit", searchImagesHandle)



