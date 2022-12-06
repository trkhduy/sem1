import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const urlApiBlog = "https://json-server-blush-nine.vercel.app"

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private http:HttpClient) { }

  getAllBlog():Observable<any>{
    return this.http.get<any>(`${urlApiBlog}/blog`)
  }

  getAllPage(number:any):Observable<any>{
    return this.http.get<any>(`${urlApiBlog}/blog?_page=${number}&_limit=5`)
  }
}
