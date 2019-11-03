import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';
import { Observable } from 'rxjs';
import { returnedPlaylist } from '../_models/returnedPlaylist';
import { User } from '../_models/user';
import { Playlist } from '../_models/playlist';

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService {
  url = 'https://accounts.spotify.com/';
  apiUrl = 'https://api.spotify.com/v1/'
  clientId = 'bc07d1e72d334e599fa82752510bedba';

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('access-token') });
  options = { headers: this.headers };

  constructor(private http: HttpClient, private router: Router, private urlSerializer: UrlSerializer) { }

  GetAccessToken(){
    var params = {
      client_id: this.clientId,
      response_type: 'token',
      redirect_uri: 'https://localhost:4200',
      scope: 'playlist-modify-public'
    }

    var tree = this.router.createUrlTree([], { queryParams: params });
    var queryString = this.urlSerializer.serialize(tree);

    return this.http.get(this.url + 'authorize' + queryString);
  }

  GetSongs(params: any): Observable<returnedPlaylist>{
    var tree = this.router.createUrlTree([], { queryParams: params });
    var queryString = this.urlSerializer.serialize(tree).substring('/form'.length);
    console.log(queryString);

    return this.http.get<returnedPlaylist>(this.apiUrl + 'recommendations' + queryString, this.options);
  }

  GetUser() : Observable<User>{
    return this.http.get<User>(this.apiUrl + 'me', this.options);
  }

  CreatePlaylist(userId): Observable<Playlist>{
    return this.http.post<Playlist>(this.apiUrl + 'users/' + userId + '/playlists', {'name': 'Spotify Playlist Generator'}, this.options);
  }
}
