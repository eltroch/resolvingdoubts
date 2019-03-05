import { Component, OnInit } from '@angular/core';
import { Preguntas } from 'src/app/modelos/preguntas';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-mis-pregunta',
  templateUrl: './mis-pregunta.component.html',
  styleUrls: ['./mis-pregunta.component.css']
})
export class MisPreguntaComponent implements OnInit {
  preguntas:Preguntas[] = [];
  loading:boolean;
  constructor(private _preguntasService:PreguntasService,private _router:Router,private _ss:StorageService) { 
this.cargarMisPreguntas();
  }

  ngOnInit() {
  }
  cargarMisPreguntas()
  {
    this._preguntasService.getMisPreguntas()
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
