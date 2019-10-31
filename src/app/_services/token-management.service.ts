import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TokenManagementService {

  constructor(private router: Router, private notification: NotificationService) { }

  saveToken(token: string, expires: string){
    localStorage.setItem('access-token', token);
    localStorage.setItem('access-token-expires', expires);
  }

  isExpired(){
    var expires = new Date(localStorage.getItem('access-token-expires'));

    if(expires.getTime() < new Date().getTime()){
      return true;
    }

    return false;
  }

  deleteToken(){
    localStorage.removeItem('access-token');
    localStorage.removeItem('access-token-expires');
  }

  exists(){
    return localStorage.getItem('access-token') == null ? false : true;
  }

  deleteTokenIfExpired(){
    if(this.isExpired()){
      this.deleteToken();
    }
  }

  throwOutUser(){
    this.deleteTokenIfExpired();

    if(!this.exists()){
      this.notification.error('You have to connect your account!');
      this.router.navigate(['/']);
    }
  }
}
