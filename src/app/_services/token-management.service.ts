import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TokenManagementService {

  constructor(private router: Router, private notification: NotificationService, private translate: TranslateService) { }

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
      this.translate.get('TOKEN.DISCONNECTED').subscribe((res: string) => {
        this.notification.error(res);
        this.router.navigate(['/']);
      });
    }
  }
}
