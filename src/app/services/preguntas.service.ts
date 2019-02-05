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
  user;

  
  getToken()
  {  
    this.token=this.localStorage.getCurrentToken();
  }

  constructor(private http: HttpClient,private _config:ConfigService,private localStorage: StorageService) { 
    this.url=_config.getUrlAPI()+'/'+this.coleccion;
    this.getToken();
    this.user=this.localStorage.getUser();
  }


  public postFileImagen(imagenParaSubir: File){

    
    const formData = new FormData(); 
    formData.append('imagenPropia', imagenParaSubir, this.user.email+'-'+imagenParaSubir.name);
    return this.http.post(`${this.url}/cargarImagen`, formData);


  

}


  Registrar(pregunta:Preguntas) {
    return this.http.post(`${this.url}/registro`, JSON.stringify(pregunta))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );
  }
  getPreguntasDestacadas() {
    return this.http.get(`${this.url}/destacadas`);
  }

  getPregunta(id: string) {
    return this.http.get(`${this.url}/`+id);
  }

}
