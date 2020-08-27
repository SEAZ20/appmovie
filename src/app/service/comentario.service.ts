import { Comentario } from './../page/detail/comentario.model';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ComentarioService {
  private url = "https://moviesraquel.herokuapp.com/api"
  constructor(private http: HttpClient) { }
  getComentarios(idMovie: string) {
    let url = "https://moviesraquel.herokuapp.com/api/comentarios/" + idMovie + "";
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
  InsertarComentario(comentario: Comentario) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/registrarcomentario", comentario).subscribe(
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
