import { UsuarioService } from 'src/app/service/usuario.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ThemoviedbService } from "../../service/themoviedb.service";
import { from } from "rxjs";
import { error } from "console";
import { IonInfiniteScroll } from "@ionic/angular";
import { Router } from '@angular/router';

@Component({
  selector: "app-buscarpelicula",
  templateUrl: "./buscarpelicula.page.html",
  styleUrls: ["./buscarpelicula.page.scss"],
})
export class BuscarpeliculaPage implements OnInit {
  constructor(private themoviedbService: ThemoviedbService,
    private Usuario: UsuarioService,
    private router: Router) { }
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  ListMovie: any = [];
  name: string;
  nameanterior: string;
  NumberPage: number = 1;
  textobuscar = "";
  user: any;
  idMovie: string;
  /* Verdetalles() 
    [routerLink]="['../detail/',item.id]" 
    this.Usuario.sendusuario(this.user);
    this.router.navigate(['../detail/', this.idMovie]);
  } */
  ngOnInit() {
    //this.getMovie(event);
    // this.Usuario.$usuario.subscribe(data => this.user = data).unsubscribe();
    //console.log(this.user)
  }
  buscar(event) {
    console.log(event);
    this.textobuscar = event.detail.value;
  }
  getMovie(event) {
    if (this.name != this.nameanterior) {
      this.ListMovie.length = 0;
      this.nameanterior = this.name;
      this.NumberPage = 1;
    }
    this.themoviedbService
      .getMovies(this.name, this.NumberPage)
      .then((data) => {
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
        debugger;
      });
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }
}
