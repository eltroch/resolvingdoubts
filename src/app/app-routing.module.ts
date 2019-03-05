import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizatedGuard } from './components/guards/authorizathed.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CrearPreguntaComponent } from './components/preguntas/crear-pregunta/crear-pregunta.component';
import { Preguntas } from './modelos/preguntas';
import { PreguntasComponent } from './components/preguntas/preguntas.component';
import { VerDetallesComponent } from './components/preguntas/ver-detalles/ver-detalles.component';
import { MisPreguntaComponent } from './components/preguntas/mis-pregunta/mis-pregunta.component';
import { EstadisticasComponent } from './components/preguntas/estadisticas/estadisticas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },

 { path: 'app-root', component: AppComponent },  
 { path: 'preguntas/registrar', component: CrearPreguntaComponent,canActivate: [ AuthorizatedGuard ]  },  
 { path: 'preguntas/destacadas', component: PreguntasComponent },  
 { path: 'preguntas/mis-preguntas', component: MisPreguntaComponent },  
 { path: 'preguntas/:id_pregunta', component: VerDetallesComponent},   
 { path: 'preguntas/busqueda/:texto', component: PreguntasComponent },
 { path: 'estadisticas', component: EstadisticasComponent },



  { path: 'login', component: LoginComponent },
 
  { path: '**', redirectTo: '/home'}

  //{ path: 'inicio/:id', component: NavbarComponent },

  //{ path: 'path/:routeParam', component: MyComponent },
  //{ path: 'staticPath', component: ... },
  //{ path: '**', component: ... },
  //{ path: 'oldPath', redirectTo: '/staticPath' },
  //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
