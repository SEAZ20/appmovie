import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { BuscarpeliculaPageRoutingModule } from "./buscarpelicula-routing.module";

import { BuscarpeliculaPage } from "./buscarpelicula.page";
import { PipesModule } from "../../pipes/pipes.module";
import { from } from "rxjs";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarpeliculaPageRoutingModule,
    PipesModule,
  ],
  declarations: [BuscarpeliculaPage],
})
export class BuscarpeliculaPageModule {}
