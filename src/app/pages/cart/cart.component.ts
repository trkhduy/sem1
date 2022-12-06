import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { elementAt } from 'rxjs';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  user: any
  cartPro: any
  total: any
  constructor(private cartService: CartService, private route: Router, private router: ActivatedRoute) { }

  ngOnInit(): void {
    let dataUser: any = localStorage.getItem('account')
    this.user = JSON.parse(dataUser)
    this.getCartPro()

  }

  getCartPro() {
    this.cartService.getCart(this.user.id).subscribe((data) => {
      this.cartPro = data
      this.total = 0
      this.cartPro.forEach((element: any) => {
        this.total += Number(element.totalEachitem)
      });
      console.log(this.total)
    })

  }
  removePro(id: number) {
    if (confirm('Are you sure')) {
      this.cartService.removeCart(id).subscribe((data) => { })
      this.getCartPro()
    }
  }
  removeAll() {
    location.reload()
  }







  mark(mark: any, id: number) {
    let quantily: any = document.getElementById(`quantity${id}`)
    let quantily_768: any = document.getElementById(`quantity_768${id}`)
    // location.reload()
    if (mark == '-') {
      if (quantily.value > 1) {
        quantily.value = quantily.value - 1
        let datas = this.cartPro.find((element: any) => {
          return element.id == id
        })
        datas.quantity = Number(quantily.value)
        datas.totalEachitem = Number(datas.quantity * datas.price)
        this.cartService.putCart(datas).subscribe((data) => {
          console.log(data)
        })
        this.getCartPro()
      } else {
        this.removePro(id)
      }
    } else {
      quantily.value = Number(quantily.value) + 1
      let datas = this.cartPro.find((element: any) => {
        return element.id == id
      })
      datas.quantity = Number(quantily.value)
      datas.totalEachitem = Number(datas.quantity * datas.price)
      this.cartService.putCart(datas).subscribe((data) => {
        console.log()
      })
      this.getCartPro()
    }

    //768
    if (mark == '-') {
      if (quantily_768.value > 1) {
        quantily_768.value = quantily_768.value - 1
        let datas = this.cartPro.find((element: any) => {
          return element.id == id
        })
        datas.quantity = Number(quantily_768.value)
        datas.totalEachitem = Number(datas.quantity * datas.price)
        this.cartService.putCart(datas).subscribe(() => { })
        this.getCartPro()
      } else {
        this.removePro(id)
      }
    } else {
      quantily_768.value = Number(quantily_768.value) + 1
      let datas = this.cartPro.find((element: any) => {
        return element.id == id
      })
      datas.quantity = Number(quantily_768.value)
      datas.totalEachitem = Number(datas.quantity * datas.price)
      this.cartService.putCart(datas).subscribe(() => { })
      this.getCartPro()
    }

  }

}
