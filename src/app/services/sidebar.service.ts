import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  toggled = false;
  _hasBackgroundImage = true;
  menus = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Preguntas',
      icon: 'fa fa-tachometer-alt',
      active: false,
      type: 'dropdown'
    ,
      submenus: [
        {
          title: 'Hacer una pregunta'
          
        },
        {
          title: 'Ver mis preguntas'
        }
      ]
    },
 
    {
      title: 'Noticaciones',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Mis preguntas',
        },
        {
          title: 'Mis respuestas '
        }
      ]
    },
    {
      title: 'Temas',
      icon: 'fa fa-globe',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Destacados',
        },
        {
          title: 'Mas botados'
        }
      ]
    },
    {
      title: 'Usuario',
      type: 'header'
    },
    {
      title: 'Mi cuenta',
      icon: 'fa fa-book',
      active: false,
      type: 'simple',
     
    },
    {
      title: 'Mis estadísticas',
      icon: 'fa fa-calendar',
      active: false,
      type: 'simple'
    },
  
  ];
  constructor() { }

  toggle() {
    this.toggled = ! this.toggled;
  }

  getSidebarState() {
    return this.toggled;
  }

  setSidebarState(state: boolean) {
    this.toggled = state;
  }

  getMenuList() {
    return this.menus;
  }

  get hasBackgroundImage() {
    return this._hasBackgroundImage;
  }

  set hasBackgroundImage(hasBackgroundImage) {
    this._hasBackgroundImage = hasBackgroundImage;
  }
}
