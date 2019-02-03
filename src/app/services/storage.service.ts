import {Injectable} from "@angular/core";
import { Router } from '@angular/router';
import {Session} from "../../app/modelos/Session";
import {Usuarios} from "../../app/modelos/Usuarios";
import * as jwt_decode from "jwt-decode";


@Injectable()
export class StorageService {

  private localStorageService;
  private currentSession : Session = null;

  constructor(private router: Router) {
    this.localStorageService = localStorage;
    this.currentSession = this.loadSessionData();
  }

  setCurrentSession(session: Session): void {
    this.currentSession = session;
    this.localStorageService.setItem('currentUser', JSON.stringify(session));
  }

  loadSessionData(): Session{
    var sessionStr = this.localStorageService.getItem('currentUser');
    return (sessionStr) ? <Session> JSON.parse(sessionStr) : null;
  }

  getCurrentSession(): Session {
    return this.currentSession;
  }

  removeCurrentSession(): void {
    
    this.localStorageService.removeItem('currentUser');
    this.currentSession = null;
  }

  isAuthenticated(): boolean {
    return (this.getCurrentToken() != null) ? true : false;
  };

  getCurrentToken(): string {
    var session = this.getCurrentSession();
    return (session && session.token) ? session.token : null;
  };

  logout(): void{
    this.removeCurrentSession();
    this.router.navigate(['/login']);
    window.location.reload();
   
  }

  tokenValido()//VERIFICA SI EL TOKEN NO HA EXPIRADO
  {
  
      try{
        let token= this.getCurrentToken();

        
        let decode=jwt_decode(token);
         let today= new Date();
         
          
         let dateExp=new Date(decode.exp*1000);
     
         if(today<=dateExp)
         {
           return true;
         }
         else{
        return false;
         }
      }
      catch(Error){
          console.log( Error);
      }
    
  }

  getUser()
  {

let user:any;
    let token= this.getCurrentToken();

    let decode=jwt_decode(token);

    
       user=
      {
        "nombres":decode.nombres,
        "email": decode.email,
      }
   
    return  user;
  }


}