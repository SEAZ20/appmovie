import { async } from '@angular/core/testing';
import { Comentario } from './comentario.model';
import { Component, OnInit } from "@angular/core";
import { ThemoviedbService } from "../../service/themoviedb.service";
import { ComentarioService } from "./../../service/comentario.service";
import { ActivatedRoute } from "@angular/router";
import { from } from "rxjs";
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { UsuarioService } from 'src/app/service/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: "app-detail",
  templateUrl: "./detail.page.html",
  styleUrls: ["./detail.page.scss"],
})
export class DetailPage implements OnInit {
  constructor(
    private themoviedbService: ThemoviedbService,
    private router: ActivatedRoute,
    private comentarioService: ComentarioService,
    private Usuario: UsuarioService,
    private alertctrl: AlertController,
    private toastctrl: ToastController,
    private loadingctrl: LoadingController
  ) { }
  detailMovie: any = [];
  idMovie: string;
  cajacomentario: boolean = false;
  Comentarios: any = [];
  existetrailer: boolean = false;
  //Video: string;
  coment: Array<Comentario> = [];
  comenta: string;
  codigo: string;
  user: any;
  ngOnInit() {
    //console.log(this.router.snapshot.paramMap.get("id"));
    this.idMovie = this.router.snapshot.paramMap.get("id");

    this.getMovieDetail();
    this.getVideo();
    // this.Usuario.$usuario.subscribe(data => this.user = data).unsubscribe();
    // console.log(this.user)
    this.getcomentarios();
  }
  getcomentarios() {
    this.comentarioService
      .getComentarios(this.idMovie)
      .then((data) => {
        //debugger;
        this.Comentarios = data["results"];
      })
      .catch((error) => { });
  }
  Vercomen() {
    this.cajacomentario = !this.cajacomentario;
  }
  getMovieDetail() {
    this.themoviedbService
      .getMoviesDetails(this.idMovie)
      .then((data) => {
        this.detailMovie = data;
      })
      .catch((error) => { });
  }
  Video: string;
  getVideo() {
    this.themoviedbService
      .getVideos(this.idMovie)
      .then((data) => {
        // debugger;
        for (let i = 0; i < 1; i++) {
          this.Video = data["results"][i].key;
        }
        if (this.Video.length != 0) {
          this.existetrailer = true;
        }
        //this.Video = data;
      })
      .catch((error) => { });
  }
  form = new FormGroup({
    comenta: new FormControl('', [Validators.required, Validators.minLength(3)]),
  })
  async insertarComentario() {
    let datos = {
      'comentario': this.form.value.comenta,
      'idMovie': this.idMovie,
      'usuario_id': localStorage.getItem('iduser'),
    }
    const loading = await this.loadingctrl.create({ message: 'Agregando comentario...' });
    await loading.present();

    this.comentarioService.InsertarComentario(datos).then(async (data) => {

      this.codigo = data["Codigo"];
      if (this.codigo == "406") {
        loading.dismiss();
        const alert = this.alertctrl.create({ message: 'error al comentar', buttons: ['OK'] });
        (await alert).present();
        console.log(this.codigo);

      } else {
        loading.dismiss();
        const toast = await this.toastctrl.create({ message: "Comentario Registrado", duration: 2000, color: 'Success' });
        await toast.present();
        this.form.reset();
        //console.log(this.codigo);
        this.Comentarios.length = 0;
        this.getcomentarios();
      }

    })
      .catch((error) => {
        async () => {
          const alert = await this.alertctrl.create({ message: 'algo salio mal', buttons: ['OK'] });
          await alert.present();
        }
      });

  }

}
