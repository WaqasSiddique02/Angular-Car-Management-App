import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private toastr:ToastrService) { }

  success(){
   return this.toastr.success('Request Completed','Success', {
      timeOut: 3000,
    });
  }

  error(){
    return this.toastr.success('Try again ','Error', {
      timeOut: 3000,
    });
  }
}
