import { Component, OnInit, Input } from '@angular/core';
import { Movie, MovieSearchResults } from '../../../models';
import { MovieInfoProviderService } from '../../services/movie-info-provider.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MovieModal } from '../../components/modals/movie-modal/movie-modal.component';
import { DeleteModal } from '../../components/modals/delete-modal/delete-modal.component';

@Component({
  selector: 'main-content',
  templateUrl: './main-content.component.html',
})
export class MainContentComponent implements OnInit {
  private _collection: string;

  @Input()
  get collection() {
    return this._collection;
  }

  set collection(collection: string) {
    this._collection = collection;
    this.populateMoviesToShow(this.collection);
  }

  moviesToShow: Movie[] = [];

  constructor(private movieInfoService: MovieInfoProviderService, private modalService: NgbModal) { }

  ngOnInit() {
    this.populateMoviesToShow("Batman");
  }

  openInfoPopup(movie?: Movie) {
    if (movie) {
      this.openAndControlMovieModal(movie);
    } else {
      let newMovie: Movie = <any>{};
      this.openAndControlMovieModal(newMovie);
    }
  }

  private populateMoviesToShow(movieQuery: string) {
    this.moviesToShow = [];
    this.movieInfoService.provideSearchResults(movieQuery).subscribe((data: MovieSearchResults) => {
      if (data.Search) {
        for (let datum of data.Search) {
          this.movieInfoService.provideMovieInfo(datum.imdbID).subscribe((movie: Movie) => {
            this.moviesToShow.push(movie);
          }), err => {
            this.movieInfoService.handleError(err);
          }
        }
      }
    }, err => {
      this.movieInfoService.handleError(err);
    })
  }

  openAndControlMovieModal(movie: Movie) {
    const modalRef = this.modalService.open(MovieModal);
    modalRef.componentInstance.movie = movie;
    modalRef.componentInstance.movieEdited.subscribe((movie: Movie) => {
      this.findAndReplaceMovie(movie);
    })
    modalRef.componentInstance.deletePressed.subscribe(() => {
      let deleteModal = this.modalService.open(DeleteModal, { centered: true });
      deleteModal.componentInstance.deleteConfirmed.subscribe(() => {
        this.findAndDeleteMovie(movie.imdbID);
        this.modalService.dismissAll();
      })
    })
    modalRef.componentInstance.newMovieAdded.subscribe((movie: Movie) => {
      this.moviesToShow.push(movie);
    })
    modalRef.componentInstance.validationNeeded.subscribe((title: string) => {
      let valid: boolean = this.validateTitle(title);
      modalRef.componentInstance.titleValid = valid;
    })
  }

  private findAndReplaceMovie(movie: Movie) {
    let indexToReplace = this.moviesToShow.findIndex(x => x.imdbID === movie.imdbID);
    this.moviesToShow[indexToReplace] = movie;
  }

  private findAndDeleteMovie(id: string) {
    let indexToDelete = this.moviesToShow.findIndex(x => x.imdbID === id);
    this.moviesToShow.splice(indexToDelete, 1);
  }

  private validateTitle(title: string): boolean {
    let i = this.moviesToShow.findIndex(x => x.Title === title);
    if (i === -1) {
      return true;
    } else {
      return false;
    }
  }
}

