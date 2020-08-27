import { User } from './../register/user.model';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url = "https://moviesraquel.herokuapp.com/api"
  /* private objetsource = new BehaviorSubject<{}>({});
  $usuario = this.objetsource.asObservable(); */
  constructor(private http: HttpClient) { }

  /* sendusuario(data: any) {
    this.objetsource.next(data);
  } */
  /* registrar(user: User) {
    return this.http.post(this.url + "/registraruser", user);
  } */
  registrar(user: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/registraruser", user).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
  validaruser(data: any) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + "/validaruser", data).subscribe(
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
