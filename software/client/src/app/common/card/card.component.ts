import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  panelOpenState = false;
  @Input() cardObj: any;
  constructor() { }

  ngOnInit(): void {
    console.log('cardObj',this.cardObj);
  }

}
