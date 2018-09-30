import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Output() queryChanged: EventEmitter<string> = new EventEmitter<string>();

  public isCollapsed = false;

  constructor() { }

  ngOnInit() {
  }

  changeCollection(str: string) {
    this.queryChanged.emit(str);
  }

}
