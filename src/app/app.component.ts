import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  
  collection: string = "";

  constructor() { }

  changeMainContent($event){
    this.collection = $event;
  }
}
