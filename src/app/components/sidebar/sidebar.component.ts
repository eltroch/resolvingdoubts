import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from '../../services/sidebar.service';
import { faCoffee ,faQuestionCircle} from '@fortawesome/free-solid-svg-icons';

// import { MenusService } from './menus.service';
import { StorageService } from '../../services/storage.service';
import { Usuarios } from '../../modelos/Usuarios';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent implements OnInit {

  usuario:Usuarios;
  faCoffee = faCoffee;
  faQuestionCircle=faQuestionCircle;
  menus = [
    {
      title: 'General',
      type: 'header'
    },
    {
      title: 'Preguntas',
      icon: 'question-mark.png',
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
      icon: 'notification.png',
      active: false,
      type: 'dropdown',
      submenus: [
        {
          title: 'Mis preguntas',
        },
        {
          title: 'Mis respuestas'
        }
      ]
    },
    {
      title: 'Temas',
      icon: 'chat.png',
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
      icon: 'settings.png',
      active: false,
      type: 'simple',
     
    },
    {
      title: 'Mis estadísticas',
      icon: 'pie-chart.png',
      active: false,
      type: 'simple'
    },
  
  ];
  constructor(public sidebarservice: SidebarService,private _storageService: StorageService) {
this.cargarUsuario();   }


  ngOnInit() {
  }

  cargarUsuario()
  {
    this.usuario=this._storageService.getUser();
  }
  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }

}
