import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Preguntas } from '../../modelos/preguntas';
import { count } from 'rxjs/operators';
import { utf8Encode } from '@angular/compiler/src/util';
import { Router, ActivatedRoute } from '@angular/router';
import { _sanitizeStyle } from '@angular/core/src/sanitization/style_sanitizer';
import { StorageService } from '../../services/storage.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.css']
})
export class PreguntasComponent implements OnInit {
  @Output() emitEvent:EventEmitter<string> = new EventEmitter<string>();
  //@Output() outputSP = new EventEmitter<String>();
 
  preguntas:Preguntas[] = [];
  loading:boolean;
  



  constructor(private _preguntasService:PreguntasService,private _router:Router,private _ss:StorageService,private _activatedRouter:ActivatedRoute) {
    this._activatedRouter.params.subscribe(params =>
      {
        if(params['texto']!=null){
                // console.log(params['id_pregunta']);
                 this.BuscarPregunta(params['texto']);


        }
        else{
              this.cargarPreguntasDestacadas();

        }


      });

   }

  

   verDetallePregunta(id)
   {

   // this.outputSP.emit(id);

    this._router.navigate(['/preguntas',id]);


   }
  ngOnInit() {
  }
  BuscarPregunta(dato): void {

   // this.loading=true;
    this._preguntasService.getBusqueda(dato)
    .subscribe((res: any) => {


     // this.loading=false;

      this.preguntas=res.datos;

    this.agruparDatos(res.datos);

    },
    (err) => {

      alert("No se han podido cargar las preguntas");
      console.log(err);
      //this.loading=false;


    }
  );
  }

  cargarPreguntasDestacadas(): void {

    this.loading=true;
    this._preguntasService.getPreguntasDestacadas()
    .subscribe((res: any) => {


      this.loading=false;

      this.preguntas=res.datos;

    this.agruparDatos(res.datos);

    },
    (err) => {

      alert("No se han podido cargar las preguntas");
      console.log(err);
      this.loading=false;


    }
  );
  }


  like(pregunta:Preguntas)
  {
    if (this._ss.isAuthenticated()){
    
    this._preguntasService.likePregunta(pregunta.id_pregunta)
    .subscribe((res: any) => {

      if(res.estado)
      {
        pregunta.like++;

      }
    },
    (err) => {

      alert("No se han podido dar like a la pregunta");
  
    }
  );
  }
  }
  dislike(pregunta:Preguntas)
  {
    if (this._ss.isAuthenticated()){
    
    this._preguntasService.dislikePregunta(pregunta.id_pregunta)
    .subscribe((res: any) => {

      if(res.estado)
      {
        pregunta.dislike++;

      }
    },
    (err) => {

      alert("No se han podido dar like a la pregunta");
  
    }
  );

  }
}
  agruparDatos(dato:any)
  {

    

      let id_pregunta=-1;
   
    
      let preguntas: Preguntas[]=new Array();
      
      let i=0;
      let last_i=0;
      let last_t=0;
      //let numero_respuestas=data[0].numero_respuestas;
      let temas: String[];
      //let respuestas: Respuestas[]=new Array(numero_respuestas);

      let ultimo= Object.keys(dato).length;
      for(let pregunta of  dato)
      {

        if(i==0)
        {
          preguntas[last_i]=pregunta;
          last_i++;
          temas= new Array(+pregunta.num_temas);
          last_t=0;


        }else{
        
        
         
        if(pregunta.id_pregunta!=preguntas[last_i-1].id_pregunta)
        {
          preguntas[last_i]=pregunta;
                    preguntas[last_i-1].temas= temas;
                    last_i++;
                    temas= new Array(+pregunta.num_temas);
                    last_t=0;

          
        }
      
      }
      
       temas[last_t]=pregunta.tema;
       last_t++;

      if(i==ultimo-1)
      {
        preguntas[last_i-1].temas= temas;

      }
       
        i++;
      }


this.preguntas=preguntas;
    


  }

}
