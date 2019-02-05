import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios } from './../modelos/Usuarios';
import { map } from 'rxjs/operators';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  //url = 'https://juanmar021-websimulac.herokuapp.com';
  url = '';

  private options = {
    headers: new HttpHeaders().set('Content-Type', 'application/json')
};


  usuarios:Usuarios[];
  constructor(private http:HttpClient,private _config: ConfigService) {

    this.url=_config.getUrlAPI();
   }

  


  
  Login(uLogin:Usuarios) {
    return this.http.post(`${this.url}/usuarios/login`, JSON.stringify(uLogin))
                    .pipe(
                      map(res => {

                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );
  }

  Registro(uLogin:Usuarios) {
    return this.http.post(`${this.url}/usuarios/registrar`, JSON.stringify(uLogin))
                    .pipe(
                      map(res => {
                        if (!res) {
                          throw new Error('Value expected!');
                        }
                        return res;
                      })
                    );
  }
}
