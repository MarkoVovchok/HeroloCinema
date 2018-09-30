import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { MainContentComponent } from './views/main-content/main-content.component';
import { MovieComponent } from './components/movie/movie.component';
import { FlipModule } from 'ngx-flip'
import { FormsModule } from '@angular/forms';
import { MovieModal } from './components/modals/movie-modal/movie-modal.component';
import { DeleteModal } from './components/modals/delete-modal/delete-modal.component';
import { TitlePipe } from './pipes/title.pipe';
import { ImgPipe } from './img.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainContentComponent,
    MovieComponent,
    MovieModal,
    DeleteModal,
    TitlePipe,
    ImgPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    FlipModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MovieModal, DeleteModal]
})
export class AppModule { }
