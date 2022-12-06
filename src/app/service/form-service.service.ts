import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../class/user';

const url = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})
export class FormServiceService {

  constructor(private http: HttpClient) { }
  createAcc(data: User): Observable<User> {
    return this.http.post<User>(`${url}/account`, data)
  }
  login(data: any): Observable<any> {
    return this.http.get<any>(`${url}/account?email=${data.email}&password=${data.password}`, data)
  }
  getAllAccount(): Observable<any> {
    return this.http.get<any>(`${url}/account`)
  }
}
