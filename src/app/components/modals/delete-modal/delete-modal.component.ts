import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
})
export class DeleteModal implements OnInit {
  @Output() deleteConfirmed: EventEmitter<void> = new EventEmitter<void>();
  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  confirmRemoval(){
    this.deleteConfirmed.emit();
  }
}
