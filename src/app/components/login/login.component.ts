import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Usuarios } from 'src/app/modelos/Usuarios';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Session } from 'src/app/modelos/Session';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registro: boolean=false;
  usuario: Usuarios;
  btn1="Ingresar";
  btn2="Registro";

  constructor( private fb: FormBuilder, private _router:Router,private title: Title,private _usuariosService:UsuariosService,private storageService: StorageService) { 
    title.setTitle('Resolving Doubts LOGIN');
    this.buildForm();
  }

  btn1OnClick()
  {

    if(this.registro)
    {//registrar

      this.Registrar();
    }
    else{//ingresar

      this.Login();
    }
  }
  
  btn2OnClick()
  {
    if(this.registro)
    {//cancelar

      this.btn2="Registro";
      this.btn1="Ingresar";

    }
    else{//formulario registro
     
      this.btn2="Cancelar";
      this.btn1="Registrarme";

    }
    this.registro=!this.registro;
    
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['',[Validators.required,Validators.email] ],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(4)]) ],
      nombres: ['', Validators.compose([Validators.required]) ],
      user_type: ['0', Validators.compose([Validators.required]) ]

    });
   
   

    
  }

  
  Login()
{
  
  if(this.loginForm.value.email != ''){

    if(this.loginForm.value.pass != ''){

      let data=this.loginForm.value;

      this.usuario = new Usuarios(data.nombres,data.email,data.pass,"");

    this._usuariosService.Login(this.usuario).subscribe(datos => {
      if (datos['estado'] == 200) {
        
        let data: Session=new Session();
        data.token=datos['token'] ;
        this.storageService.setCurrentSession(data);
        this._router.navigate(['/home']);
        location.reload();

        
      } else {
        alert(datos['mensaje']);

      }

    });
  }else{
    alert("Ingrese su contraseña");
  }
 
  
}
else
{
  alert('Ingrese su correo');
}
}



Registrar(){
  

  if(this.loginForm.value.email != ''){

    if(this.loginForm.value.pass != ''){


      if(this.loginForm.value.nombres != ''){


  let data=this.loginForm.value;
  this.usuario = new Usuarios(data.nombres,data.email,data.pass,"");
  
  
    this._usuariosService.Registro(this.usuario).subscribe(datos => {
      if (datos['estado'] == 200) {
        
        let data: Session=new Session();
        data.token=datos['token'] ;
        this.storageService.setCurrentSession(data);
        this._router.navigate(['/home']);
        
      } else {

        if(datos['estado'] == 23000){
                  alert('El email ya se encuentra registrado');

        }
        else{
          alert("No registrado");
        }

      }

    });

  }else{
    alert("Ingrese sus nombres");
  }

  }else{
    alert("Ingrese su contraseña");
  }
 
  
}
else
{
  alert('Ingrese su correo');
}
    
    
}



  ngOnInit() {
  }

}
