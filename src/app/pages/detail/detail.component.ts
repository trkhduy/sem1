import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Cart } from 'src/app/class/cart';
import { CartService } from 'src/app/service/cart.service';
import { ProductService } from 'src/app/service/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }
  customOptions1: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    navText: ['Prev', 'Next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }


  product: any = {}
  dataCart = new Cart()
  user: any
  quantity: any
  size: any
  index: any
  constructor(private proService: ProductService, private router: ActivatedRoute, private route: Router, private cartService: CartService) { }

  ngOnInit(): void {
    let _id = this.router.snapshot.params['id']
    this.proService.getDeatilProduct(_id).subscribe((data) => {
      this.product = data;
    })
    let data: any = localStorage.getItem('account')
    this.user = JSON.parse(data)
  }
  addCart() {
    let temp: any = document.getElementById('quantity')
    console.log(temp.value)
    this.quantity = Number(temp.value)
    let size_pro: any = document.getElementById('size_item')
    console.log(size_pro.value)
    this.size = size_pro.value
    if (this.user) {
      console.log(this.user.id)
      this.dataCart.id_product = this.product.id
      this.dataCart.id_category = this.product.id_category_main
      this.dataCart.id_user = this.user.id
      this.dataCart.name_user = this.user.name
      this.dataCart.image = this.product.image
      this.dataCart.name = this.product.name
      this.dataCart.price = this.product.price
      this.dataCart.quantity = this.quantity
      this.dataCart.size = this.size
      this.dataCart.totalEachitem = Number(this.dataCart.quantity * this.dataCart.price)
      this.cartService.getCart(this.user.id).subscribe((data) => {
        this.index = data.find((data: any) => {
          return data.id_product == this.dataCart.id_product && data.size == this.dataCart.size
        })
        if (this.index) {
          this.index.quantity += this.quantity
          this.cartService.putCart(this.index).subscribe(() => { })
          // this.simpleAlert()
          alert('bạn đã thêm thành công')
        } else {
          this.cartService.postCart(this.dataCart).subscribe((data) => {
            if (data) {
              this.simpleAlert()
            }
          })
        }
      })
    } else {
      if (confirm('Please login before adding to cart')) {
        this.route.navigate(['/login'])
      }
    }

  }


  simpleAlert() {
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
  }
  mark(mark: any) {
    let quantily: any = document.getElementById('quantity')
    let quantily_768: any = document.getElementById('quantity_768')
    if (mark == '-') {
      if (quantily.value > 1) {
        quantily.value = quantily.value - 1
      }
    } else {
      quantily.value = Number(quantily.value) + 1
    }
    //768
    if (mark == '-') {
      if (quantily_768.value > 1) {
        quantily_768.value = quantily_768.value - 1
      }
    } else {
      quantily_768.value = Number(quantily_768.value) + 1
    }

  }

}
