import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  user: any;
  id: string;
  codigo: string;
  constructor(
    private Usuario: UsuarioService,
    private alertctrl: AlertController,
    private toastctrl: ToastController,
    private loadingctrl: LoadingController,
    private router: Router
  ) { }

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })

  async onSubmit() {
    const loading = await this.loadingctrl.create({ message: 'Cargando...' });
    await loading.present();

    this.Usuario.validaruser(this.form.value)
      .then(async (data) => {
        this.user = data["result"];
        this.codigo = data["Codigo"];

        if (this.codigo == "406") {
          loading.dismiss();
          const alert = this.alertctrl.create({ message: 'Usuario o contraseña incorrectos', buttons: ['OK'] });
          (await alert).present();
          console.log(this.user);
          console.log(this.codigo);
        } else {
          for (let i = 0; i < this.user.length; i++) {
            this.id = data["result"][i].id;
          }
          loading.dismiss();
          /* this.Usuario.sendusuario(this.user);*/
          localStorage.setItem('iniciosesion', 'true');
          localStorage.setItem('iduser', this.id)
          this.router.navigate(['/home']);
          console.log(this.id);
          console.log(this.codigo);

        }

      })
      .catch((error) => {
        async () => {
          const alert = await this.alertctrl.create({ message: 'algo salio mal', buttons: ['OK'] });
          await alert.present();
        }
      });
    //console.log(this.form.value.nombre);
  }

}
