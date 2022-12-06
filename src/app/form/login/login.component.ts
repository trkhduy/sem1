import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormServiceService } from 'src/app/service/form-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private router: Router, private formService: FormServiceService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // if (!this.formData.invalid) {
    //   let acc :any = []  
    //   acc = JSON.parse(localStorage.getItem('account') as string)
    //   let data:any
    // if (acc) {
    // data = acc.find((item:any)=>{
    //   return item == this.formData.value
    // })


    //   if (data) {
    //     localStorage.setItem('user',JSON.stringify(data))
    // Swal.fire({
    //   position: 'top-end',
    //   icon: 'success',
    //   title: 'Your work has been saved',
    //   showConfirmButton: false,
    //   timer: 1500
    //   })
    //       }
    //   } else{
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Oops...',
    //       text: 'Something went wrong!',
    //       footer: '<a href="">Why do I have this issue?</a>'
    //     })
    //   }


    // } else{
    // Swal.fire({
    //   icon: 'error',
    //   title: 'Oops...',
    //   text: 'Something went wrong!',
    //   footer: '<a href="">Why do I have this issue?</a>'
    // })
    // }
    this.formService.login(this.formData.value).subscribe((data) => {
      if (data[0]) {
        console.log(data)
        localStorage.setItem('account', JSON.stringify({
          name: data[0].name,
          id: data[0].id
        }))
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate([''])
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
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
