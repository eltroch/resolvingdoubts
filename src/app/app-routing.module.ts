import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthorizatedGuard } from './components/guards/authorizathed.guard';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [ AuthorizatedGuard ]  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

 { path: 'app-root', component: AppComponent },  
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
