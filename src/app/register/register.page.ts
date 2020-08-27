import { async } from '@angular/core/testing';
import { UsuarioService } from './../service/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  constructor(
    private Usuario: UsuarioService,
    private alertctrl: AlertController,
    private toastctrl: ToastController,
    private loadingctrl: LoadingController
  ) { }
  confir: string;
  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),

  })
  async onSubmit() {
    const loading = await this.loadingctrl.create({ message: 'Registrando...' });
    await loading.present();
    this.Usuario.registrar(this.form.value).then(
      async (data) => {
        const toast = await this.toastctrl.create({ message: "Usuario Registrado", duration: 2000, color: 'Success' });
        await toast.present();
        loading.dismiss();
        this.form.reset();
      }).catch((error) => {
        async () => {
          const alert = await this.alertctrl.create({ message: 'algo salio mal', buttons: ['OK'] });
          await alert.present();
        }
      });
    //console.log(this.form.value.nombre);
  }
}
