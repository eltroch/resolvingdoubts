import { Component, OnInit,Inject, Input } from '@angular/core';
import { Preguntas } from '../../../modelos/preguntas';
import { ConfigService } from '../../../services/config.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PreguntasService } from '../../../services/preguntas.service';
import { StorageService } from '../../../services/storage.service';
import { RespuestasService } from '../../../services/respuestas.service';
import { Respuestas } from 'src/app/modelos/Respuestas';

@Component({
  selector: 'app-ver-detalles',
  templateUrl: './ver-detalles.component.html',
  styleUrls: ['./ver-detalles.component.css']
})
export class VerDetallesComponent implements OnInit {
 // @Input()  idPregunta: string;
  pregunta: any={};
  respuestas : Respuestas[]=[];
  rutaImagen:string='';
  loading:boolean;
  loadingR:boolean;
  puedeResponder=false;
  verFormResponder=false;
  idPregunta;
  descripcionRespuesta:string="";

       // this.pregunta=data;
    //let arr=['Java','Angular'];

  constructor(private _cs: ConfigService,private _activatedRouter:ActivatedRoute,
    private _ps:PreguntasService,private _ss:StorageService,private _rs: RespuestasService) { 

      if(this._ss.isAuthenticated())
      {
        this.puedeResponder=true;
      }

    this._activatedRouter.params.subscribe(params =>
      {
       this.cargarPregunta(params['id_pregunta']);
        this.idPregunta= params['id_pregunta'];   


      });


  }

  clickResponder()
  {
    this.verFormResponder=!this.verFormResponder;
  }

  cargarRespuestas(id_pregunta)
  {

    this.loadingR=true;
    this._rs.getRespuesta(id_pregunta)
    .subscribe((res: any) => {
      this.loadingR=false;

   
      this.respuestas=res.datos;

    },
    (err) => {
      this.loadingR=false;


      alert("No se ha podido cargar las respuestas");
      console.log(err);

    }
  );
  }

  guardarRespuesta()
  {
    if(this.descripcionRespuesta!="")
    {

      
      this._rs.Registrar(this.idPregunta,this.descripcionRespuesta).subscribe((res: any) => {
      
  
        if(res.estado=1)
        {
          this.cargarRespuestas(this.idPregunta);
          this.verFormResponder=false;
          
        }
       
      },
      (err) => {
   
        console.log(err);
  
      }
    );
    }
    else{
      alert("Ingrese la descripción de su respuesta");
    }

  }

  dislike( )
  {
    
    this._ps.dislikePregunta(this.idPregunta)
    .subscribe((res: any) => {

      if(res.estado)
      {
        this.pregunta.dislike++;

      }
    },
    (err) => {

      alert("No se han podido dar like a la pregunta");
  
    }
  );

  }
  

  like()
  {
    
    this._ps.likePregunta(this.idPregunta)
    .subscribe((res: any) => {

      if(res.estado)
      {
        this.pregunta.like++;

      }
    },
    (err) => {

      alert("No se han podido dar like a la pregunta");
  
    }
  );

  }
  cargarPregunta(id)
  {
    this.loading=true;
    this._ps.getPregunta(id)
    .subscribe((res: any) => {
      this.loading=false;

      this.pregunta=res.datos[0];
 
      this.cargarTemas(res.datos);
      this.cargarRespuestas(id);
      this.viewPregunta();
      if(this.pregunta.imagen!=null){

      this.getImagen(this.pregunta.imagen);
      }

    },
    (err) => {
      this.loading=false;


      alert("No se ha podido cargar la pregunta");
      console.log(err);

    }
  );
  }

  //se ejecuta cuando se abre una pregunta y aumenta el contador de visitas
  viewPregunta()
  {
    
    this._ps.viewPregunta(this.idPregunta)
    .subscribe((res: any) => {
   
    },
    (err) => {

      //alert("No se han podido dar like a la pregunta");
      console.log("Error al incrementar contador de visitas");
  
    }
  );

  }
 
  cargarTemas(datos)
  {
    let temas:string[]= new Array();

    for(let item of datos)
    {
      temas.push(item.tema);   

    }

    this.pregunta.temas=temas;


  }

  getImagen(name: string)
  {

     this.rutaImagen=this._cs.getUrlRecursos()+'/'+name;
  }
  ngOnInit() {
  }

}
