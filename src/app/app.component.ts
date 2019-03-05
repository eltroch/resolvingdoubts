import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'resolvingdoubts';

  constructor(
    private storageService: StorageService, private router:Router) { 

      this.router.navigate(['/home']);
  }
  public IsLogin() {
    return this.storageService.isAuthenticated();
  }
  

}
