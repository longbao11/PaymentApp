import { Component, OnInit } from '@angular/core';
import { PaymentDetailFormComponent } from './payment-detail-form/payment-detail-form.component';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  standalone: true,
  imports: [PaymentDetailFormComponent,
    CommonModule, //use CommonModule for ngFor
  ],
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit {
//RouterLink, RouterLinkActive

  constructor(public service: PaymentDetailService, private toastr: ToastrService){

  }
  ngOnInit(): void { 
    this.service.refreshList();
  }

  populateForm(selectedRecord:PaymentDetail){
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id:number){
    if(confirm('Are you sure to delete this record?'))
      this.service.deletePaymentDetail(id)
        .subscribe({
          next: res => {
            this.service.list = res as PaymentDetail[]
            this.toastr.error('Deleted Successfully', 'Payment Details Register')
          },
          error: err => { console.log(err) }
        })
  }
}
