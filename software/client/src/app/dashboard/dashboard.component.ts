import { Component, OnInit, OnChanges } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { RoomCreateComponent } from '../room/room-create/room-create.component';
import { DashboardService } from './dashboard.service';
import { CommonUtilsService } from '../utils/common-utils.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  userObj: any;
  userId: string;
  roomsList: any;
  constructor(private route: ActivatedRoute,
    private router: Router, private dashboardService: DashboardService, private commonService: CommonUtilsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    //one way to fetch id from url params
    // this.route.paramMap.forEach(each => {
    //   console.log(each.params.id);
    // })
    this.commonService.validateUserAndGetProfile().subscribe((response) => {
      if (response['status'] == 'success' && response['data'] && response['data']['profile']) {
        this.userObj = response['data']['profile'];
        this.fetchIdAndUser();
        
      } else {
        this.logout();
        this.router.navigate(['/']);
      }
    }, (err) => {
      this.logout();
      this.router.navigate(['/']);
    });
    console.log('before changes: ', this.userObj);

    /TODO have to chck in future why this isn't working properly/


    /*this.userObj = this.route.paramMap.pipe( 
       switchMap((params: ParamMap) => {
         console.log(params.get('id'));
         console.log(this.dashboardService.getUser(params.get('id')))
          return this.dashboardService.getUser(params.get('id'));
       })
       );*/
    console.log('after changes: ', this.userObj);
  }


  ngOnChanges() {
    console.log('when changes: ', this.userObj);
  }

  fetchIdAndUser() {
    this.route.paramMap.subscribe((res) => {
      this.userId = res['params']['id'];
      console.log(res['params'], 'res userId => ', this.userId);
      this.fetchUser();
    },
      (err) => { },
      () => {

      });
  }

  fetchUser() {
    console.log(this.userId);
    this.dashboardService.getUser(this.userId).subscribe(userResult => {
      this.userObj = userResult['data'];
      this.fetchRoomsCreated();
    }, err => {

    }, () => {

    });
  }

  logout(): void{
    if(this.commonService.logout()){
      this.router.navigate(['/']);
    }
  }

  fetchRoomsCreated(){
    this.dashboardService.fetchRooms().subscribe((roomsRes) => {
        if(roomsRes && roomsRes['status'] && roomsRes['status'] == 'success'){
          this.roomsList = roomsRes['data']['data'];
        }
    }, (err) => {

    }, () => {

    });
  }

  openCreateRoomDialog(): void {
    const dialogRef = this.dialog.open(RoomCreateComponent, {
      width: '500px',
      data: { userId: this.userId }
    });
  }
}
