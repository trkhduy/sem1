import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog: any;
  pages: any = 1;
  Allblog: any = []
  numberPage: any = []
  constructor(private blogService: BlogService) { }

  ngOnInit(): void {
    this.blogService.getAllPage(this.pages).subscribe((data) => {
      this.blog = data;
    })
    this.getAllBlog()
  }

  Pages(number: any) {
    this.pages = number
    this.blogService.getAllPage(number).subscribe((data) => {
      this.blog = data;
      // console.log(data);
    })
  }
  getAllBlog() {
    this.blogService.getAllBlog().subscribe((data) => {
      this.Allblog = data
      for (let i = 1; i <= Math.round(Number(this.Allblog.length / 5)); i++) {
        this.numberPage.push(i)
      }
      console.log(this.numberPage)
    })
  }
}
