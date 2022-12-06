import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormServiceService } from 'src/app/service/form-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  listAccount: any
  formData = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private router: Router, private formService: FormServiceService) { }
  cart:any = []
  ngOnInit(): void {
    this.formService.getAllAccount().subscribe((data) => {
      this.listAccount = data
      console.log(this.listAccount)
    })
  }

  onSubmit() {
    if (this.formData.valid) {

      console.log(this.listAccount)
      let conflictAcc = this.listAccount.find((element: any) => {
        return this.formData.value.email == element.email
      })
      console.log(conflictAcc);
      if (!conflictAcc) {
        this.formService.createAcc(this.formData.value).subscribe((data) => {
          this.cart.push()
        })
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['/login'])
      } else {
        alert('Username is already taken. Try another name !')
        location.reload()
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }

  }

  get f(): any {
    return this.formData.controls;
  }

  showPas() {
    let ip: any = document.getElementById('pass') as HTMLInputElement;
    if (ip.type == "password") {
      document.getElementById('pass')?.setAttribute('type', 'text');
      document.getElementById('eye_')?.setAttribute('class', 'fa-solid fa-eye-slash')
    } else {
      document.getElementById('pass')?.setAttribute('type', 'password');
      document.getElementById('eye_')?.setAttribute('class', 'fa-solid fa-eye')
    }
  }

}
