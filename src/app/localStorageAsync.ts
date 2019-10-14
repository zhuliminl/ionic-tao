import { Injectable } from "@angular/core";
import { LocalStorage } from "@ngx-pwa/local-storage";

@Injectable()
export class LocalStorageAsync {
  constructor(private localStorage: LocalStorage) {

  }

  async getAsync(key) {
    return new Promise(resolve => {
      this.localStorage.getItem(key).subscribe((data) => {
        resolve(data);
      })
    });
  }

  async setAsync(key, value) {
    return new Promise(resolve => {
      this.localStorage.setItem(key, value).subscribe(() => {
        resolve();
      })
    });
  }

  async clearAsync() {
    return new Promise(resolve => {
      this.localStorage.clear().subscribe(() => {
        resolve();
      })
    })
  }

  async removeAsync(key) {
    return new Promise(resolve => {
      this.localStorage.removeItem(key).subscribe(() => {
        resolve();
      })
    })
  }
}
