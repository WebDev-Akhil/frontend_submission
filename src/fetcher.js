import axios from "axios";

// All of your API requests should be in this file

class API {
  constructor() {
    this.apiBaseUrl = "https://api.themoviedb.org/3";
  }

  getPopularMovies(queryStr = "") {
    return axios.get(
      this.apiBaseUrl +
        `/discover/movie?api_key=8134434a46fcca75ff3a29addbf19274${queryStr}`
    );
  }

  getMovies(queryStr = "") {
    return axios.get(
      this.apiBaseUrl +
        `/search/movie?api_key=8134434a46fcca75ff3a29addbf19274${queryStr}`
    );
  }

  handleError(error) {
    console.log(error.message);
  }
}

export default API;
