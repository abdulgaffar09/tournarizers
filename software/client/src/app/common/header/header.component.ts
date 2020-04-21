import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginComponent } from '../../login/login.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {DashboardService} from '../../dashboard/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loginObj: any = {};
  userObj: any = {};
  userId: string;
  ngOnInit(): void {
    
    this.route.paramMap.subscribe((res) => {console.log(res.params,'res'); this.userId =res.params['id'];},
    (err) => {},
     () => {
      this.dashboardService.getUser(this.userId).subscribe(userResult => {
            this.userObj = userResult['data'];
      }, err => {

      }, () => {

      });
    });

  }

  constructor(public dialog: MatDialog,  private route: ActivatedRoute,private router: Router,
    private dashboardService: DashboardService) {
    
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

  validateUser(): void{
      // console.log(this.data); 
      // this.loginService.validateUser(this.data).subscribe((result) => {
      //   console.log(result);
      //   if(result && result['status'] == 'success'){
      //     this.dialogRef.close(result);
      //   }else{
          
      //   }
        
      // },(err) => {
        
      // },() => {
  
      // });    
  }

}
