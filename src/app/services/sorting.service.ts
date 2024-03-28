import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  constructor() {}

  sortData(sortingList: any[], item: any) {
    if (item.direction === 'asc') {
      sortingList.sort((a, b) => this.compare(a[item.name], b[item.name]));
    } else  {
      sortingList.sort((a, b) => this.compare(b[item.name], a[item.name]));
    }
  }

  private compare(a: any, b: any): number {
    if (a === undefined || a === null) {
      return -1;
    }
    if (b === undefined || b === null) {
      return 1;
    }

    if (typeof a === 'boolean') {
      a = a ? 2 : 1;
    }
    if (typeof b === 'boolean') {
      b = b ? 2 : 1;
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    if (typeof a === 'string') {
      a = a.toLowerCase();
    }
    if (typeof b === 'string') {
      b = b.toLowerCase();
    }

    return a.localeCompare(b);
  }
}
