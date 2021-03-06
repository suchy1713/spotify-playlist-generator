import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, UrlSerializer } from '@angular/router';
import { Observable } from 'rxjs';
import { returnedPlaylist } from '../_models/returnedPlaylist';
import { User } from '../_models/user';
import { Playlist } from '../_models/playlist';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient, private router: Router, private urlSerializer: UrlSerializer, private datepipe: DatePipe) { }

  UpdateHeaders(){
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('access-token') });
    this.options = { headers: this.headers };  
  }

  GetAccessToken(){
    var params = {
      client_id: this.clientId,
      response_type: 'token',
      redirect_uri: environment.redirectUrl,
      scope: 'playlist-modify-public'
    }

    var tree = this.router.createUrlTree([], { queryParams: params });
    var queryString = this.urlSerializer.serialize(tree).substring('/'.length);
    
    window.location.href = this.url + 'authorize' + queryString;
  }

  GetSongs(params: any): Observable<returnedPlaylist>{
    this.UpdateHeaders();

    var tree = this.router.createUrlTree([], { queryParams: params });
    var queryString = this.urlSerializer.serialize(tree).substring('/generate'.length);

    return this.http.get<returnedPlaylist>(this.apiUrl + 'recommendations' + queryString, this.options);
  }

  GetUser() : Observable<User>{
    return this.http.get<User>(this.apiUrl + 'me', this.options);
  }

  CreatePlaylist(userId): Observable<Playlist>{
    var date = new Date();
    var formatted_date = this.datepipe.transform(date, 'yyyy-MM-dd HH:mm').toString();
    return this.http.post<Playlist>(this.apiUrl + 'users/' + userId + '/playlists', {'name': 'SPG - ' + formatted_date}, this.options);
  }

  AddSongs(playlistId, urisToAdd: string[]) {
    return this.http.post(this.apiUrl + 'playlists/' + playlistId + '/tracks', {'uris': urisToAdd}, this.options);
  }
}
