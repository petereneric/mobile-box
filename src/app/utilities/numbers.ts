import {Injectable} from '@angular/core';

@Injectable()

export class Numbers {

  constructor() {
  }

  getNumberFormatted(value) {
    if (value !== undefined) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    } else {
      return "-"
    }

  }

}
