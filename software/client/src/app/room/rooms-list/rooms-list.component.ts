import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css']
})
export class RoomsListComponent implements OnInit, OnChanges {

  @Input() roomsList: any;
  constructor() { }

  ngOnInit(): void {
    console.log('roomsList',this.roomsList)
  }

  ngOnChanges(){
    console.log('roomsList',this.roomsList)
  }

}
