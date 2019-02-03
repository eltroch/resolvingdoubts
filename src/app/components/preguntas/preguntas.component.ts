import { Component, OnInit } from '@angular/core';
import { PreguntasService } from 'src/app/services/preguntas.service';
import { Preguntas } from '../../modelos/preguntas';
import { count } from 'rxjs/operators';
import { utf8Encode } from '@angular/compiler/src/util';

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
 
  preguntas:Preguntas[] = [];
  



  constructor(private _preguntasService:PreguntasService) {
    this.cargarPreguntasDestacadas();
   }

  

  ngOnInit() {
  }

  cargarPreguntasDestacadas(): void {

    this._preguntasService.getPreguntasDestacadas()
    .subscribe((res: any) => {



      this.preguntas=res.datos;

    this.agruparDatos(res.datos);

    },
    (err) => {

      alert("No se han podido cargar las preguntas");

    }
  );
  }
  
  agruparDatos(dato:any)
  {

    

      let id_pregunta=-1;
   
    
      let preguntas: Preguntas[]=new Array(30);
      
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
        
        
          if(i!=ultimo-1){
        if(pregunta.id_pregunta!=preguntas[last_i-1].id_pregunta)
        {
          preguntas[last_i]=pregunta;
                    preguntas[last_i-1].temas= temas;
                    last_i++;
                    temas= new Array(+pregunta.num_temas);
                    last_t=0;

          
        }
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
