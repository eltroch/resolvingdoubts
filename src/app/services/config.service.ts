import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  urlP = 'https://juanmar021-websimulac.herokuapp.com';
  urlD = 'http://localhost';

  urlAPI = this.urlD+'/rdapi';
  constructor() { }

  
  getUrlAPI() {
    return this.urlAPI;
  }
  
}
