import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codertyfilter'
})
export class NgxCodertyFilterPipe implements PipeTransform {
  transform(items: any, filter?: any): any {
    return this.codertyFilter(items, filter);
  }

  /**
   * Filter an array of objects
   */
  codertyFilter(items: any, keyObj: string): any {
    if (keyObj && items) {
      let i = items.length;
      while (i-- && !items[i].hasOwnProperty('_itemSummary')) {
        const itemProperties = Object.keys(items[i]);
        let j = itemProperties.length;
        const itemSummarized = [];
        while (j--) {
          itemSummarized.push(
            this.removeAccents((items[i][itemProperties[j]] + '').toLowerCase())
          );
        }
        items[i]['_itemSummary'] = itemSummarized.join(' ');
      }

      const filter = this.removeAccents(keyObj.toLowerCase()).split(' ');
      let total = filter.length;
      while (total > 0 && filter.length > 0) {
        total--;
        items = this.filter(items, filter[total].toLowerCase());
      }
    }
    return items;
  }

  /**
   * Filter an array of objects
   */
  filter(items: any[], filterObj: string) {
    if (items) {
      return items.filter(function(item) {
        if (item._itemSummary.indexOf(filterObj) !== -1) {
          return item;
        }
      });
    } else {
      return null;
    }
  }

  /**
   * Remove accents of a string
   */
  removeAccents(value: string): string {
    return value
      .replace(/á/g, 'a')
      .replace(/é/g, 'e')
      .replace(/í/g, 'i')
      .replace(/ó/g, 'o')
      .replace(/ú/g, 'u');
  }
}
