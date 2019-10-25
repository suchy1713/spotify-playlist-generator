import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from '../_services/api-access.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private apiAccessService: ApiAccessService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.retrieveToken();
  }

  connect(){
    this.apiAccessService.GetAccessToken().subscribe((token: any) => {
      console.log(token);
    }, error => {
      console.log(error);
    });
  }

  retrieveToken(){
    this.route.fragment.subscribe((fragment: string) => {
      if(fragment){
        localStorage.setItem('access-token', new URLSearchParams(fragment).get('access_token'));
        localStorage.setItem('access-token-expires', String(new Date(new Date().getTime() + (1000 * 60 * 60))));
      }
    });
  }
}
