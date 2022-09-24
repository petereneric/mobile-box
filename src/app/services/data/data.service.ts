import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private menuSubject = new Subject<any>();
  private scrollSubject = new Subject<any>();

  constructor() { }

  callMenu(data: any) {
    this.menuSubject.next(data);
  }

  callbackMenu(): Subject<any> {
    return this.menuSubject;
  }

  scroll(data: any) {
    this.scrollSubject.next(data);
  }

  callbackScroll(): Subject<any> {
    return this.scrollSubject;
  }

}
