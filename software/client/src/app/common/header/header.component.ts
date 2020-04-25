import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {CommonUtilsService} from '../../utils/common-utils.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginObj: any = {};
  userObj: any = {};
  userId: string;

  constructor(public dialog: MatDialog,  private route: ActivatedRoute,private router: Router,
    private commonService: CommonUtilsService) {

  }

  ngOnInit(): void {
    this.commonService.validateUserAndGetProfile().subscribe((response) => {
        if(response['status'] == 'success' && response['data'] && response['data']['profile']){
          console.log('response : ',response);
          this.userObj = response['data']['profile'];
        }else{
          this.logout();
        }
    }, (err) => {
      this.logout();
    });
  }

  logout(): void{
    if(this.commonService.logout()){
      this.router.navigate(['/'],{ relativeTo: this.route });
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      data:  {emailId:'', password:''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result['status'] == 'success'){
        this.router.navigate([result['data']['userId']+'/dashboard'], { relativeTo: this.route });
      }
    });
  }

}
