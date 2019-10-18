import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  model: any = {
    limit: 20,
    min_acousticness: 0,
    min_danceability: 0,
    min_energy: 0,
    min_instrumentalness: 0,
    min_liveness: 0,
    min_popularity: 0,
    min_speechiness: 0,
    min_valence: 0,
    max_acousticness: 1,
    max_danceability: 1,
    max_energy: 1,
    max_instrumentalness: 1,
    max_liveness: 1,
    max_popularity: 100,
    max_speechiness: 1,
    max_valence: 1,   
  };
  generated: boolean = false;

  constructor() { }

  ngOnInit() {
  
  }

  sendForm(){
    console.log(this.model);
    this.generated = true;
  }

  sended(){
    return this.generated;
  }

}
