import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {LoginService} from './login.service';

interface Login{
  emailId:string,
  password: string
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string;
  constructor(  public dialogRef: MatDialogRef<LoginComponent>, @Inject(MAT_DIALOG_DATA) public data: Login,
  private loginService: LoginService) { }
  
  ngOnInit(): void {

  }

  login(): void {
    console.log(this.data); 
    this.loginService.validateUser(this.data).subscribe((result) => {
      console.log(result);
      if(result && result['status'] == 'success'){
        this.dialogRef.close(result);
      }else{
        this.errorMessage = "Something went wrong."
      }
      
    },(err) => {
      this.errorMessage = err.error && err.error.errorMessage ? err.error.errorMessage : "Something went wrong." ;
    },() => {

    });    
  }

  

}
