import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  constructor() {}

  setLocalStorage(name: string, item: any) {
    localStorage.setItem(name, item);
  }

  getLocalStorage(item: string) {
    return JSON.parse(localStorage.getItem(item) || '{}');
  }

  removeLocalStorage(name: string) {
    localStorage.removeItem(name);
  }
}
