import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  paramsForm: FormGroup;
  generated: boolean = false;

  constructor(private fb: FormBuilder) {
   }

  ngOnInit() {
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

  createForm(){

  }

  sendForm(){
    console.log(this.paramsForm.value);
    this.generated = true;
  }

  sended(){
    return this.generated;
  }

}
