import { Component, OnInit, Input } from '@angular/core';
import { Movie, DEFAULT_IMAGE } from '../../../models';

@Component({
  selector: 'movie-component',
  templateUrl: './movie.component.html',
})
export class MovieComponent implements OnInit {
  @Input() movie : Movie;
  defaultImage = DEFAULT_IMAGE;
  constructor() { }

  ngOnInit() {
  }
  
}
