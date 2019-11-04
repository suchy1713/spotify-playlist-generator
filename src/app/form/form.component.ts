import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiAccessService } from '../_services/api-access.service';
import { TokenManagementService } from '../_services/token-management.service';
import { NotificationService } from '../_services/notification.service';
import { User } from '../_models/user';
import { Playlist } from '../_models/playlist';
import { returnedPlaylist } from '../_models/returnedPlaylist';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  paramsForm: FormGroup;
  generated: boolean = false;
  clickedOnGenerate: boolean = false;
  user: User;
  playlist: Playlist;

  songs: returnedPlaylist;

  constructor(private fb: FormBuilder, private apiAccessService: ApiAccessService, private token: TokenManagementService, private notification: NotificationService) {
   }

  ngOnInit() {
    this.token.throwOutUser();
    window.scrollTo(0, 0);
    this.generated = false;
    this.clickedOnGenerate = false;
    this.generateForm();
  }

  generateForm(){
    this.paramsForm = this.fb.group({
      seed_genres: ['', []],
      limit: [20, [Validators.required, Validators.min(1), Validators.max(100)]],
      min_acousticness: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_danceability: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_energy: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_instrumentalness: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_liveness: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_popularity: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_speechiness: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_valence: [0, [Validators.required, Validators.min(0), Validators.max(1)]],
      min_tempo: [0, [Validators.required, Validators.min(0), Validators.max(220)]],
      max_acousticness: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      max_danceability: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      max_energy: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      max_instrumentalness: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      max_liveness: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      max_popularity: [100, [Validators.required, Validators.min(0), Validators.max(100)]],
      max_speechiness: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      max_valence: [1, [Validators.required, Validators.min(0), Validators.max(1)]],
      max_tempo: [220, [Validators.required, Validators.min(0), Validators.max(220)]],
    }, { validator: this.minGreaterThanMaxValidator});
  }

  minGreaterThanMaxValidator(g: FormGroup) {
    var errors: {[k: string]: any} = {};

    if(g.get('min_acousticness').value > g.get('max_acousticness').value){
      errors.acousticness = true;
    }

    if(g.get('min_danceability').value > g.get('max_danceability').value){
      errors.danceability = true;
    }

    if(g.get('min_energy').value > g.get('max_energy').value){
      errors.energy = true;
    }

    if(g.get('min_instrumentalness').value > g.get('max_instrumentalness').value){
      errors.instrumentalness = true;
    }

    if(g.get('min_liveness').value > g.get('max_liveness').value){
      errors.liveness = true;
    }

    if(g.get('min_popularity').value > g.get('max_popularity').value){
      errors.popularity = true;
    }

    if(g.get('min_speechiness').value > g.get('max_speechiness').value){
      errors.speechiness = true;
    }

    if(g.get('min_valence').value > g.get('max_valence').value){
      errors.valence = true;
    }

    if(g.get('min_tempo').value > g.get('max_tempo').value){
      errors.tempo = true;
    }

    if(g.get('seed_genres').value.length < 1) {
      errors.min_genres = true;
    }

    if(g.get('seed_genres').value.length > 5) {
      errors.max_genres = true;
    }

    return errors;
  }

  sendForm(){
    this.clickedOnGenerate = true;

    this.apiAccessService.GetSongs(this.paramsForm.value).subscribe((songs: any) => {
      this.songs = songs;
      this.generated = true;
      window.scrollTo(0, 0);
    }, error => {
      this.notification.error('Something went wrong. Try again.');
      this.clickedOnGenerate = false;
    });
  }

  sended(){
    return this.generated;
  }

  clicked(){
    return this.clickedOnGenerate;
  }

  goBackToForm(){
    this.generated = false;
    this.clickedOnGenerate = false;
    window.scrollTo(0, 0);
  }

  startOver(){
    this.ngOnInit();
  }

  addToSpotify(){
    this.getUser();
  }

  getUser(){
    this.apiAccessService.GetUser().subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.notification.error('Something went wrong. Try again.');
    }, () => {
      this.createPlaylist();
    });
  }

  createPlaylist(){
    this.apiAccessService.CreatePlaylist(this.user.id).subscribe((playlist: Playlist) => {
      this.playlist = playlist;
    }, error => {
      this.notification.error('Something went wrong. Try again.');
    }, () => {
      this.addSongs();
    })
  }

  addSongs(){
    var urisToAdd = this.songs.tracks.map(function(song) {
      return song.uri;
    });

    this.apiAccessService.AddSongs(this.playlist.id, urisToAdd).subscribe(() => {
      this.notification.success("Playlist added successfully.");
    }, error => {
      this.notification.error('Something went wrong. Try again.');
    }, () => {
      this.ngOnInit();
    });
    
  }
}