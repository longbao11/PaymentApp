import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; //connect API
import { environment } from '../../environments/environment.development';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url:string = environment.apiBaseUrl + '/PaymentDetail'
  //model.ts
  list: PaymentDetail[] = [];
  //for form key in new data
  formData : PaymentDetail = new PaymentDetail();

  formSubmitted: boolean = false;

  constructor(private http:HttpClient) { }

  refreshList(){ //get request
    this.http.get(this.url)
    .subscribe({
      next: res => {
        this.list = res as PaymentDetail[]
      },
      error: err => {
        { console.log(err)}
      }
    })
  }

  postPaymentDetail(){
    return this.http.post(this.url, this.formData);
  }

  putPaymentDetail(){ //update record
    return this.http.put(this.url + '/' + this.formData.
      paymentDetailId, this.formData)
  }

  deletePaymentDetail(id:number){ //delete record
    return this.http.delete(this.url + '/' + id)
  }

  resetForm(form: NgForm){
    form.form.reset();
    this.formData = new PaymentDetail(); //clear model.ts
    this.formSubmitted = false;
  }
}
