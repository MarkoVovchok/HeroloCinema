import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Movie, DEFAULT_IMAGE } from '../../../../models';
const uuidv4 = require('uuid/v4');

@Component({
  selector: 'movie-modal',
  templateUrl: './movie-modal.html'
})
export class MovieModal implements OnInit {
  @Input() movie: Movie;
  @Output() movieEdited: EventEmitter<Movie> = new EventEmitter<Movie>();
  @Output() newMovieAdded: EventEmitter<Movie> = new EventEmitter<Movie>();
  @Output() deletePressed: EventEmitter<void> = new EventEmitter<void>();
  @Output() validationNeeded: EventEmitter<string> = new EventEmitter<string>();
  editableMovie: Movie = <any>{};
  editMode: boolean = false;
  newMode: boolean = false;
  titleValid: boolean = true;
  defaultImage = DEFAULT_IMAGE;
  yearValid: boolean = true;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.processIfNewMovie();
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    this.editableMovie = JSON.parse(JSON.stringify(this.movie));
  }

  onPictureChanged($event) {
    if ($event.target.files && $event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.editableMovie.Poster = event.target.result;
      }
      reader.readAsDataURL($event.target.files[0]);
    }
  }

  saveChanges() {
    this.editMode = false;
    this.movie = JSON.parse(JSON.stringify(this.editableMovie));
    if (this.newMode) {
      this.newMode = false;
      this.newMovieAdded.emit(this.movie);
    } else {
      this.movieEdited.emit(this.movie);
    }
  }

  cancelOrPreviewChanges() {
    this.editMode = false;
    if (this.newMode) {
      this.movie = this.editableMovie;
    }
  }

  openDeletePopup() {
    this.deletePressed.emit();
  }

  processIfNewMovie() {
    if (!this.movie.imdbID) {
      this.movie.imdbID = uuidv4();
      this.toggleEditMode();
      this.newMode = true;
    }
  }

  askForValidation($event) {
    if ($event !== this.movie.Title) {
      this.validationNeeded.emit($event);
    }
  }

  validateDate($event) {
    let releaseDate = new Date($event);
    if (releaseDate.getFullYear() < 1889) {
      this.yearValid = false;
    } else {
      this.yearValid = true;
    }
  }
}
