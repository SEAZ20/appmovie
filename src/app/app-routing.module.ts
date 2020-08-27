import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: "home",
    canActivate: [LoginGuard],
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "buscarpelicula",
    canActivate: [LoginGuard],
    loadChildren: () =>
      import("./page/buscarpelicula/buscarpelicula.module").then(
        (m) => m.BuscarpeliculaPageModule
      ),
  },
  {
    path: "detail/:id",
    canActivate: [LoginGuard],
    loadChildren: () =>
      import("./page/detail/detail.module").then((m) => m.DetailPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'setting',
    canActivate: [LoginGuard],
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
