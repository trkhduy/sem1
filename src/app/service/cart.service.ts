import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../class/cart';

const url = 'https://json-server-blush-nine.vercel.app'
@Injectable({
  providedIn: 'root'
})
export class CartService {
  lengthCart = new Subject<number>()
  constructor(private http: HttpClient) { }
  getCart(id: any): Observable<any> {
    this.http.get<Cart[]>(`${url}/cart?id_user=${id}`).subscribe(data => {
      this.lengthCart.next(data.length)
    })
    return this.http.get<any>(`${url}/cart?id_user=${id}`)
  }
  postCart(data: Cart): Observable<Cart> {
    let dataUser: any = localStorage.getItem('account')
    let user = JSON.parse(dataUser)
    this.getCart(user.id).subscribe(data => {
      this.lengthCart.next(data.length)
    })
    return this.http.post<Cart>(`${url}/cart`, data)
  }
  putCart(data: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${url}/cart/${data.id}`, data)
  }
  removeCart(id: any): Observable<any> {
    let dataUser: any = localStorage.getItem('account')
    let user = JSON.parse(dataUser)
    this.getCart(user.id).subscribe(data => {
      this.lengthCart.next(data.length)
    })
    return this.http.delete<any>(`${url}/cart/${id}`)
  }
  // removeAll(id: number): Observable<any> {
  //   return this.http.delete<any>(`${url}/cart?id_user=${id}`)
  // }


  // home
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
    this.getCart(user.id).subscribe((data) => {
      this.lengthCart.next(data.length)
    })
    return this.http.get<any>(`${url}/product`)
  }
}
