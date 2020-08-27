import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {

  }
  login: any = false;
  canActivate() {
    this.login = localStorage.getItem('iniciosesion');
    if (!this.login) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }




}
