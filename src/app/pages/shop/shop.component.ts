import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  id: any
  product: any = []
  page: any = 1;
  cate_food: any
  cate_beverage: any
  keyword: any
  datas: any = []
  max_price: any
  min_price: any
  number_page: any = []
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    // duyệt sản phẩm
    this.productService.getAllProductPage(this.page).subscribe((data) => {
      this.product = data;
      // console.log(data)
    })
    this.productService.getCategoryFood().subscribe((data) => {
      this.cate_food = data
    })
    this.productService.getCategoryBeverage().subscribe((data) => {
      this.cate_beverage = data
    })
    this.getAllProduct()
  }
  getAllProduct() {
    this.productService.getAllProduct().subscribe((data) => {
      this.datas = data
      for (let i = 1; i <= Math.round(this.datas.length / 9); i++) {
        this.number_page.push(i)
      }
    })
  }
  get_id(id: number) {
    this.id = id
    // document.getElementById(`title${id}`)?.classList.add('title_item_click')
  }
  filter_food(data: any) {
    if (this.id)
      data = data.filter((element: any) => {
        return this.id == element.id_category_child
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
    return data
    // console.log(data)
  }
  filter_general() {

    if (this.filter_price(this.datas) == this.datas && this.filter_food(this.datas) == this.datas) {
      this.PageChange(this.page)
      return this.product
    } else {
      let result: any = []
      result = this.filter_food(this.datas)
      result = this.filter_price(result)
      this.product = result
      console.log(result)
    }
  }
  clear_all() {
    this.max_price = '';
    this.min_price = ''
    this.id = ''
    this.PageChange(this.page)
    console.log(this.product)

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


  PageChange(number: any) {
    // alert(number)
    this.page = number;
    this.productService.getAllProductPage(this.page).subscribe((data) => {
      this.product = data;
    })

  }
}
