import { async } from '@angular/core/testing';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ThemoviedbService } from "../service/themoviedb.service";
import { from } from "rxjs";
import { error } from "console";
import { IonInfiniteScroll, AlertController } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  constructor(private themoviedbService: ThemoviedbService,
    private Usuario: UsuarioService,
    private router: Router,
    private alertController: AlertController) { }
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  ngOnInit() {
    this.getMovie(event);
    // this.Usuario.$usuario.subscribe(data => this.user = data).unsubscribe();
    console.log(this.user)
  }
  user: any;
  ListMovie: any = [];
  name: string;
  nameanterior: string;
  NumberPage: number = 1;
  textobuscar = "";
  Irbuscarpelicula() {
    // this.Usuario.sendusuario(this.user);
    this.router.navigate(['/buscarpelicula']);
  }
  getMovie(event) {
    this.themoviedbService
      .getMoviesPolular(this.NumberPage)
      .then((data) => {
        //this.ListMovie = data["results"];
        for (let i = 0; i < data["results"].length; i++) {
          this.ListMovie.push(data["results"][i]);
        }
        if (this.ListMovie.length == 200) {
          event.target.disabled = true;
        }
        event.target.complete();
        this.NumberPage++;
        console.log(this.ListMovie);
      })
      .catch((error) => {
        // debugger;
      });
  }
  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
  async clickeo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'dio en pelicula',
      message: '?',
      buttons: [
        {
          text: 'ok',
          handler: () => {

          }
        }
      ]
    });
  }
}
