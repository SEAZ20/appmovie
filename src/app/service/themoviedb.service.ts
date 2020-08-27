import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { promise } from "protractor";
import { resolve } from "dns";
import { rejects } from "assert";
@Injectable({
  providedIn: "root",
})
export class ThemoviedbService {
  constructor(private http: HttpClient) { }
  //urlbase = "https://api.themoviedb.org/3";

  getMovies(name: string, page: number) {
    let url =
      "https://api.themoviedb.org/3/search/movie?api_key=2a140d383b8edf96a9f5a167b4b2ee43&language=en-US&query=" +
      name +
      "&page=" +
      page +
      "&include_adult=false";

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getMoviesPolular(page: number) {
    let url =
      "https://api.themoviedb.org/3/movie/popular?api_key=2a140d383b8edf96a9f5a167b4b2ee43&language=en-US&page=" +
      page +
      "";

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  getMoviesDetails(idMovie: string) {
    let url =
      "https://api.themoviedb.org/3/movie/" +
      idMovie +
      "?api_key=2a140d383b8edf96a9f5a167b4b2ee43&language=en-US";
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  getVideos(idMovie: string) {
    let url =
      "https://api.themoviedb.org/3/movie/" +
      idMovie +
      "/videos?api_key=2a140d383b8edf96a9f5a167b4b2ee43&language=en-US";
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
