import { Component, ViewChild, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { RoomCreateService } from './room-create.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.css']
})
export class RoomCreateComponent implements OnInit {
  @ViewChild('ejDateTimePicker') ejDateTimePicker: DateTimePickerComponent;
  errorMessage: string;
  roomForm: FormGroup;
  games = ['Pubg mobile'];
  gameTypes = ['Squad', 'Duo', 'Solo'];
  gameModes = ['Survival'];
  minDate: Date;

  constructor(public dialogRef: MatDialogRef<RoomCreateComponent>, @Inject(MAT_DIALOG_DATA) public data,
    private roomCreateService: RoomCreateService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.roomForm = this.formBuilder.group({
      roomName: ['', Validators.required],
      gameName: ['', Validators.required],
      gameMode: ['', Validators.required],
      gameType: ['', Validators.required],
      gameTime: ['', Validators.required],
      userId: [this.data.userId]
    });
    let timeNow = new Date(Date.now());
    if (timeNow.getMinutes() < 30) {
      timeNow.setMinutes(30, 0, 0);
    }
    if (timeNow.getMinutes() > 30) {
      timeNow.setMinutes(60, 0, 0);
    }
    this.minDate = timeNow;
  }

  get form() {
    return this.roomForm.controls;
  }

  createRoom(): void {
    if (this.roomForm.invalid) {
      return;
    }
    let payload = {
      roomDetails: this.roomForm.value
    }
    this.roomCreateService.createRoom(payload).subscribe((result) => {
      console.log(result);
      if (result && result['status'] == 'success') {
        this.dialogRef.close(result);
      } else {
        this.errorMessage = "Something went wrong."
      }
    }, (err) => {
      console.log('>>', err);
      this.errorMessage = err.error && err.error.errorMessage ? err.error.errorMessage : "Something went wrong.";
    });
  }
}
