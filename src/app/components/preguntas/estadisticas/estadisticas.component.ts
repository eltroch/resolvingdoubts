import { ViewChild, ElementRef, OnInit, Component, Input, AfterViewInit, OnDestroy  } from '@angular/core';
import * as CanvasJS from '../../../../assets/js/canvas/canvasjs.min';
import { PreguntasService } from '../../../services/preguntas.service';
  
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})

export class EstadisticasComponent implements OnInit {
  
 


  constructor(private _preguntasS:PreguntasService) { }

    procesar( meses)
  {
    
    for(let mes of meses){
      mes.y=+mes.y;
    }

    return meses;
  }
  cargarPreguntasMeS()

  {
    this._preguntasS.getPreguntasPorMes()
    .subscribe((res: any) => {
       
      let meses=this.procesar(res.datos)
      

	let chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		exportEnabled: true,
		title: {
			text: "Preguntas por mes"
		},
		data: [{
			type: "column",
			dataPoints: meses
		}]
	});
		
	chart.render();
 
 
 
    },
    (err) => {

      alert("No se han podido cargar las preguntas");
      console.log(err);
 

    }
  );
  }

  ngOnInit() {
    this.cargarPreguntasMeS();

    }
 
}
