import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartService } from './cart.service';

const url = 'https://json-server-blush-nine.vercel.app'
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  lengthCart = new Subject<number>()
  constructor(private http: HttpClient, private cartService: CartService) { }
  getCategoriesMain(): Observable<any> {
    return this.http.get<any>(`${url}/category_main`)
  }
  getCategoriesFood(): Observable<any> {
    return this.http.get<any>(`${url}/category_food`)
  }
  getCategoriesBeverage(): Observable<any> {
    return this.http.get<any>(`${url}/category_beverage`)
  }
  getCategoriesCombo(): Observable<any> {
    return this.http.get<any>(`${url}/category_combo`)
  }
  getCategoryById1(): Observable<any> {
    return this.http.get<any>(`${url}/category_main?id=1`)
  }
  getCategoryById2(): Observable<any> {
    return this.http.get<any>(`${url}/category_main?id=2`)
  }
  getAllPro(): Observable<any> {
    let dataUser: any = localStorage.getItem('account')
    let user = JSON.parse(dataUser)
    this.cartService.getCart(user.id).subscribe((data) => {
      this.lengthCart.next(data.length)
    })
    return this.http.get<any>(`${url}/product`)
  }
}
