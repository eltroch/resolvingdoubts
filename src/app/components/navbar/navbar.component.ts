import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  icon="login";
  textoBuscar:String ;

  constructor(private _storageService: StorageService,private _router: Router) { 
    this.textoBuscar="";

    if(this._storageService.isAuthenticated())
    {
        this.icon="off";
    }
  }

  ngOnInit() {
    this.textoBuscar='';
  }

  buscarPregunta()
  {
    this._router.navigate(['/preguntas/busqueda',this.textoBuscar]);
  }


  logout()
  {

    this._storageService.logout();
  }

  clickLL()
  {
    if(this._storageService.isAuthenticated())
    {
       this.logout();
    }
    else{

      this._router.navigate(['/login']);
    }


  }

}
