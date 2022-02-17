import axios from "axios";

export default class NewApiService {
    constructor() {
        this.searchQwery = "";
        this.page = 1;
    }

    fetchImages = async () => {
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "25728701-c83c0487db4f1d7b899af3be5";
    const saerchParameters = "image_type=photo&orientation=horizontal&safesearch=true&per_page=40";
    try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQwery}&${saerchParameters}&page=${this.page}`);
        const images = response.data;
        this.incrementPage();
        console.log(response)
         return images;
        } catch (error) { console.log(error) };
    }
    
    incrementPage() {
        this.page+=1
    }

    resetPage() {
        this.page=1
    }

    get query() {
        return this.searchQwery;
    }

    set query(newQwery) {
        this.searchQwery = newQwery; 
    }
}


  