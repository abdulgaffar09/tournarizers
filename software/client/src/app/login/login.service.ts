import { Injectable } from '@angular/core';
import {CommonUtilsService} from '../utils/common-utils.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private commonService: CommonUtilsService) { }

  public validateUser(payload){
    return this.commonService.postRequest(payload,'login');
  }
}
