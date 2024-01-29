
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "orderBy"
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], sortBy: string, order?: string): any[] {
    if (order && !['asc', 'desc'].includes(order)) {
      return array;
    }

    let comparison = (a: any, b: any) => a[sortBy] < b[sortBy];
    if (order === 'asc' || !order) {
      comparison = (a: any, b: any) => a[sortBy] > b[sortBy];
    }

    return array.sort((a, b) => comparison(a, b) ? -1 : 1)
  }
}
