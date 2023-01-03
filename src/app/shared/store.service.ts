import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storeRegister = new BehaviorSubject<boolean>(false);
  private storeMonth = new BehaviorSubject<string>('');

  constructor() {}

  setStoreMonth(value: string) {
    this.storeMonth.next(value);
  }

  getStoreMonth() {
    return this.storeMonth.asObservable();
  }

  setStoreIncome(value: boolean) {
    this.storeRegister.next(value);
  }

  getStoreIncome() {
    return this.storeRegister.asObservable();
  }
}
