import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import NewApiService from './js/apiClass';

const newApiService = new NewApiService;
const searchFormEl = document.querySelector("#search-form");
const loadMoreButton = document.querySelector(".load-more");
const galleryEl = document.querySelector(".gallery");
var lightbox = new SimpleLightbox('.gallery a');
const allCardsEl = galleryEl.getElementsByTagName("a");

const searchImagesHandle = (event) => {
    event.preventDefault();
    galleryEl.innerHTML = "";
    newApiService.query = event.currentTarget.searchQuery.value;
    newApiService.resetPage();
  newApiService.fetchImages().then((images) => {
    if (newApiService.query === "") { loadMoreButton.classList.add("is-hidden"); return };    
    if (images.hits.length === 0) {
      loadMoreButton.classList.add("is-hidden");
      return Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
    }
    addImageMarkup(images.hits);
    Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
        loadMoreButton.classList.remove("is-hidden");   
      lightbox.refresh()      
    })
};

const imageMarkup = (images) => {
    const markup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => { 
        return `<a href="${largeImageURL}">
         <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width=100% />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>: ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>: ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>: ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>: ${downloads}
    </p>
  </div>
</div>
</a>`
    }).join("");
    return markup
};

const addImageMarkup = (images) => {
    galleryEl.insertAdjacentHTML("beforeend", imageMarkup(images))
};
const doMoreImageHandle = () => {
    loadMoreButton.classList.add("is-hidden");
    newApiService.fetchImages().then(images => {
        addImageMarkup(images.hits);         
      lightbox.refresh();
      if (images.totalHits !== allCardsEl.length) {
        loadMoreButton.classList.remove("is-hidden");
      }else{Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");}
    });
    
}

searchFormEl.addEventListener("submit", searchImagesHandle);
loadMoreButton.addEventListener("click", doMoreImageHandle);



