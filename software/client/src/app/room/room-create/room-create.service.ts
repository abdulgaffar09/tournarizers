import { Injectable } from '@angular/core';
import {CommonUtilsService} from '../../utils/common-utils.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RoomCreateService {

  constructor(private commonService: CommonUtilsService) { }

  public createRoom(payload){
    return this.commonService.postRequest(payload,'rooms/create');
  }
}
