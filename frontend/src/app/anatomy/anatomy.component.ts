import { Component } from '@angular/core';

@Component({
  selector: 'app-anatomy',
  templateUrl: './anatomy.component.html',
  styleUrls: ['./anatomy.component.scss'],
})
export class AnatomyComponent {

  showToken: boolean;
  jwtHeader: string;
  jwtPayload: string;
  jwtSignature: string;
  token: string;

  constructor() {
    this.showToken = false;
    this.jwtHeader = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9';
    this.jwtPayload = 'eyJkYXRhIjoiSSBzZWNyZXRseSBsaWtlIE1vbWluYSBNdXN0ZWhhbiIsImlhdCI6MTY0NjA1NjEzOCwiZXhwIjoxNjQ2MTQyNTM4LCJhdWQiOiJtaWNyb3NvZnQuY29tIiwiaXNzIjoiTWljcm9zb2Z0IEluYyIsInN1YiI6InNvbWVAdXNlci5jb20ifQ';
    this.jwtSignature = 'rvOx0iNIzDLkVvJaiM_nU7fmrE8Zh9RbR_lh9iCryOYjYmxuHviYVOOdScNJ-exmjDXssxZ84TWV34KJNUA36EHs3Ew5Pcn5N6_UechJ2MTvUaXyR6JrqdWjw8RuXBmAfkEpizST9jPKybTRWzJlqmr-QErpluTIJyonvHmd8FXCcaNzYJDuQ5T56zI7beuEiSL1tyOwx9AQhr4Q1qF28Ek8RRUg1JMlaGs0d5c4YMaNz8xJE6-YkTIr6LSH3gwXKtbY3qgJxzFwXRqmvxnkBTya9Ji1tu1OYso4NffHZHatU4F7xjex3VzQfwM9uVrsWvsspL5ZyKzJcCa67Jo0_A';
    this.token = 'b3NvZnQuY29tIiwiaXNzIjoiTWljcm9zb2Z0IEluYyIsInN1YiI6ISsexmjDXssxZ84TWV34KJNUA36EHs3Ew5Pcn5N6_UechJ2MTvUaXyR6JrqdWjw8RuXBmAfkEpizST9jPKybTRWzJlqmr-QErpluTIJyonvHmd8FXACADS';
  }

}
