import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  pregunta=0;
  constructor(private _router:Router,private _ss:StorageService) { 

    //console.log("home");
    //console.log(_ss.isAuthenticated());

  
       this._router.navigate(['/estadisticas']);
    

   
  }

  ngOnInit() {
    //this._router.navigate(['/preguntas/destacadas']);
  }

  verPregunta(pregunta)
{
  this.pregunta=pregunta;

}

  public IsLogin() {
    return this._ss.isAuthenticated();
  }
  
}
