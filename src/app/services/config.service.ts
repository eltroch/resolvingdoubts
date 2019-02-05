import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  urlP = 'https://bici-monteria.000webhostapp.com';
  urlD = 'http://localhost';

  urlAPI = this.urlP+'/RDApi/src';
  urlRecursos=this.urlP+'/RDApi/assets/recursos';
  constructor(public snackBar: MatSnackBar) { }

  
  getUrlAPI() {
    return this.urlAPI;
  }
  
  getUrlRecursos() {
    return this.urlRecursos;
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Aceptar', {
      duration: 2000,
    });
  }
  
}
