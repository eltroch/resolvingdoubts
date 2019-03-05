import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Preguntas } from './../modelos/Preguntas';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
  coleccion='respuestas';

  token='';
  url = '';
  user;

  
  getToken()
  {  
    this.token=this.localStorage.getCurrentToken();
  }

  constructor(private http: HttpClient,private _config:ConfigService,private localStorage: StorageService) { 
    this.url=_config.getUrlAPI()+'/'+this.coleccion;
    //this.getToken();
    //this.user=this.localStorage.getUser();
  }


 


  Registrar(id:number,descripcion:string) {

    let user=this.localStorage.getUser();

    let respuesta=
    {

      id_pregunta: id,
      desc_respuesta: descripcion,
      usuario: user.email
    }
    return this.http.post(`${this.url}/registro`, JSON.stringify(respuesta))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );
  }
 

  getRespuesta(id: string) {
    return this.http.get(`${this.url}/`+id);
  }

}
