import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(listData: any[], keyword: any): any[] {
    if (keyword) {
      keyword = keyword.toLowerCase()
      if (keyword == '') {
        return listData
      }
      return listData.filter(data => {
        return data.name.toLowerCase().includes(keyword)
      })
    } else {
      return listData
    }
  }

}
