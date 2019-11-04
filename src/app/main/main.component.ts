import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../_services/api-access.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenManagementService } from '../_services/token-management.service';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private apiAccessService: ApiAccessService, private route: ActivatedRoute, private token: TokenManagementService, private router: Router, private notification: NotificationService) { }

  ngOnInit() {
    this.token.deleteTokenIfExpired();
    this.retrieveToken();
  }

  connect(){
    this.apiAccessService.GetAccessToken(window.location.href);
  }

  retrieveToken(){
    this.route.fragment.subscribe((fragment: string) => {
      if(fragment){
        this.token.saveToken(new URLSearchParams(fragment).get('access_token'), String(new Date(new Date().getTime() + (1000 * 60 * 60))));
        this.router.navigate(['/spotify-playlist-generator/']);
      }
    });
  }

  isConnected(){
    return this.token.exists();
  }
}
