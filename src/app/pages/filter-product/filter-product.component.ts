import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {
  id: any
  cate_food: any
  cate_beverage: any
  dataPro: any = []
  product: any = []
  min_price: any
  max_price: any
  keyword: any
  id_filter: any
  constructor(private productService: ProductService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit(): void {
    this.productService.getCategoryFood().subscribe((data) => {
      this.cate_food = data
    })
    this.productService.getCategoryBeverage().subscribe((data) => {
      this.cate_beverage = data
    })
    this.router.paramMap.subscribe((params: ParamMap) => {
      this.id = Number(params.get('id'))
      Number.isInteger(Number(this.id)) ? this.getPro() : this.getProductChild()
    }
    )
    this.productService.getAllProduct().subscribe((data) => {
      this.product = data
      console.log(this.product)
    })
  }

  getPro() {
    this.productService.getPro(this.id).subscribe((data) => {
      this.dataPro = data
      console.log(this.dataPro)
    })
  }
  getProductChild() {
    this.productService.getProChild(this.id).subscribe((data) => {
      this.dataPro = data
    })
  }
  get_id(id: number) {
    this.id_filter = id
    console.log(this.id_filter)
    // document.getElementById(`title${id}`)?.classList.add('title_item_click')
  }
  filter_food(data: any) {
    if (this.id_filter)
      data = data.filter((element: any) => {
        return this.id_filter == element.id_category_child
      })
    return data
    // console.log(data)
    // console.log(this.id);
  }
  filter_price(data: any) {
    if (this.min_price && this.max_price) {
      data = data.filter((element: any) => {
        return Number(this.min_price) <= element.price && Number(this.max_price) >= element.price
      })
    }
    console.log(this.min_price, this.max_price)
    return data
    // console.log(data)
  }
  filter_general() {
    if (this.filter_price(this.product) == this.product && this.filter_food(this.product) == this.product) {
      this.router.paramMap.subscribe((params: ParamMap) => {
        this.id = Number(params.get('id'))
        Number.isInteger(Number(this.id)) ? this.getPro() : this.getProductChild()
      }
      )
      return this.dataPro
    } else {
      let result: any = []
      result = this.filter_food(this.product)
      result = this.filter_price(result)
      this.dataPro = result
      console.log(result)
    }
  }
  clear_all() {
    this.max_price = '';
    this.min_price = ''
    this.id = ''
    this.route.navigate(['/shop'])
  }




  check: any = true
  clickIcon() {
    if (this.check) {
      document.getElementById('icon')?.classList.add('change_icon')
      document.getElementById('filter')?.classList.add('none_sort')
      this.check = false
    } else {
      document.getElementById('icon')?.classList.remove('change_icon')
      document.getElementById('filter')?.classList.remove('none_sort')
      this.check = true
    }

  }
  clickIcon1() {
    if (this.check) {
      document.getElementById('icon1')?.classList.add('change_icon')
      document.getElementById('menu_food')?.classList.add('none_sort')
      this.check = false
    } else {
      document.getElementById('icon1')?.classList.remove('change_icon')
      document.getElementById('menu_food')?.classList.remove('none_sort')
      this.check = true
    }

  }
  clickIcon2() {
    if (this.check) {
      document.getElementById('icon2')?.classList.add('change_icon')
      document.getElementById('menu_drink')?.classList.add('none_sort')
      this.check = false
    } else {
      document.getElementById('icon2')?.classList.remove('change_icon')
      document.getElementById('menu_drink')?.classList.remove('none_sort')
      this.check = true
    }
  }
}
