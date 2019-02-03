import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preguntas } from './../modelos/Preguntas';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class PreguntasService {
  coleccion='preguntas';

  token='';
  url = '';

  
  getToken()
  {  
    this.token=this.localStorage.getCurrentToken();
  }

  constructor(private http: HttpClient,private _config:ConfigService,private localStorage: StorageService) { 
    this.url=_config.getUrlAPI()+'/'+this.coleccion;
    this.getToken();
  }

  getPreguntasDestacadas() {
    return this.http.get(`${this.url}/destacadas`);
  }

}
