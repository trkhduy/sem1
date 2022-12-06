import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  formData = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    subject: new FormControl('', [
      Validators.required
    ]),
    message: new FormControl('', [
      Validators.required
    ])
  })
  constructor() { }

  ngOnInit(): void {

  }
  submitForm(): void {
    if (this.formData.invalid){
      return;
    }
    console.log(this.formData.value)
  }
  get form(): any {
    return this.formData.controls;
  }
}
