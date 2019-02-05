import { Component, OnInit,Inject } from '@angular/core';
import { Preguntas } from '../../../modelos/preguntas';
import { ConfigService } from '../../../services/config.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PreguntasService } from '../../../services/preguntas.service';

@Component({
  selector: 'app-ver-detalles',
  templateUrl: './ver-detalles.component.html',
  styleUrls: ['./ver-detalles.component.css']
})
export class VerDetallesComponent implements OnInit {

  pregunta: any={};
  rutaImagen:string='';
  loading:boolean;
       // this.pregunta=data;
    //let arr=['Java','Angular'];

  constructor(private _cs: ConfigService,private _activatedRouter:ActivatedRoute,private _ps:PreguntasService) { 

    this._activatedRouter.params.subscribe(params =>
      {
       // this.cargarSimulacro(params['id']);
       this.cargarPregunta(params['id_pregunta']);
       


      })


  }

  cargarPregunta(id)
  {
    this.loading=true;
    this._ps.getPregunta(id)
    .subscribe((res: any) => {
      this.loading=false;

      this.pregunta=res.datos[0];
      this.cargarTemas(res.datos);
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
