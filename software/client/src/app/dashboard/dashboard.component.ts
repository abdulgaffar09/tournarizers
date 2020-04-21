import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {DashboardService} from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  userObj: any;
  userId: string;
  constructor( private route: ActivatedRoute,
    private router: Router,private dashboardService: DashboardService) { }

  ngOnInit(): void {
    //one way to fetch id from url params
    // this.route.paramMap.forEach(each => {
    //   console.log(each.params.id);
    // })
    console.log('before changes: ',this.userObj);

    /TODO have to chck in future why this isn't working properly/
    this.route.paramMap.subscribe((res) => {
      this.userId = res.params['id'];
      console.log(res.params,'res userId => ',this.userId); 
      this.fetchUser();
    },
    (err) => {},
     () => {
      
    });

  
   /*this.userObj = this.route.paramMap.pipe( 
      switchMap((params: ParamMap) => {
        console.log(params.get('id'));
        console.log(this.dashboardService.getUser(params.get('id')))
         return this.dashboardService.getUser(params.get('id'));
      })
      );*/
      console.log('after changes: ',this.userObj);
 
    
  }

  ngOnChanges(){
    console.log('when changes: ',this.userObj);
  }

  fetchUser(){
    console.log(this.userId);
    this.dashboardService.getUser(this.userId).subscribe(userResult => {
          this.userObj = userResult['data'];
    }, err => {

    }, () => {

    });
  }

}
