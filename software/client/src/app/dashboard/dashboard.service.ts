import { Injectable } from '@angular/core';
import { CommonUtilsService} from '../utils/common-utils.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private commonService: CommonUtilsService) { }

  public getUser(id){
    return this.commonService.getRequest({},"users/"+id+"/get");
  }
}
