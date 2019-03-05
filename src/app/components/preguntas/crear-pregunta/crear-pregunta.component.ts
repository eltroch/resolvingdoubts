import { Component, OnInit } from '@angular/core';
import { Preguntas } from '../../../modelos/preguntas';
import { ConfigService } from '../../../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PreguntasService } from '../../../services/preguntas.service';
import { StorageService } from '../../../services/storage.service';
import { ignoreElements } from 'rxjs/operators';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css']
})
export class CrearPreguntaComponent implements OnInit {

  public respuestaImagenEnviada:any;
  public resultadoCarga = 0;
  public nombreImagen:string = "No hay imagen selecionada";
  public rutaImagen:string = "../../../assets/images/sin_imagen.jpg";
  fileToUpload: File = null;
  //temas: string= new Array();
  tema:string="";

  pregunta: Preguntas;

  
  //stemas.push('Angular');

  constructor(private cs: ConfigService,private _preguntaService: PreguntasService,private _sts: StorageService) { 
    this.pregunta= new Preguntas(0,'','','','','',0,0,0,0,new Array());
 
  }
  public cargandoImagen(files: FileList){
 
    this.fileToUpload = files.item(0);
    this.nombreImagen = this.fileToUpload.name;
    //this._examenServie.postFileImagen(files[0]).subscribe(
    this.rutaImagen = "../../assets/recursos/"+this.nombreImagen;
  }


 
  guardarImagen(){
    this._preguntaService.postFileImagen(this.fileToUpload).subscribe(
    
			response => {

        this.respuestaImagenEnviada = response; 
        if(response['code'] == 200 && response['status'] == "success"){
          //this.rutaImagen = "../../assets/recursos/"+this.nombreImagen;
          this.resultadoCarga = 1;
          this.cs.openSnackBar("Se ha publicado tu pregunta");
          this.limpiar();

          
        }else{
          this.resultadoCarga = 2;
        }
		
			},
			error => {
        alert("No se ha podido subir la imagen");
        console.log(error);
			}

		);//FIN DE METODO SUBSCRIBE
  }


  limpiar()
  {
    this.pregunta= new Preguntas(0,'','','','','',0,0,0,0,new Array());
     this.nombreImagen = "No hay imagen selecionada";
   this.rutaImagen = "../../../assets/images/sin_imagen.jpg";
  this.fileToUpload = null;
  }


  guardarPregunta()
  {

    let subirImg=false;

    if(this.tema!="")
    {
      this.tema= this.titleCaseWord(this.tema);
      this.pregunta.temas.push(this.tema);
      this.tema="";
    }
    
    if(this.pregunta.titulo!="")
    {
      if(this.pregunta.descripcion)
      {
        if(this.pregunta.temas.length>0)
        {
          let usuario=this._sts.getUser();
           
          let imagen='';
          if(this.nombreImagen!="No hay imagen selecionada")
          {
             imagen=usuario.email+'-'+this.pregunta.imagen;
             subirImg=true;
          }

          let pregunta: any=
          {
            "usuario": usuario.email,
            "titulo": this.pregunta.titulo,
            "descripcion": this.pregunta.descripcion,
            "temas":this.pregunta.temas,
            "imagen": imagen

          }
          

          this._preguntaService.Registrar(pregunta).subscribe(datos => {
            if (datos['estado'] == 200) {


              if(subirImg){
                              this.guardarImagen();

              }
              else{
                this.cs.openSnackBar("Se ha publicado tu pregunta");

              }

              
      
              
            } else {
              alert(datos['mensaje']);
      
            }
      
          });

        }
        else{
          this.cs.openSnackBar("Debe ingresar por lo menos un tema");

        }


      }
      else{
        this.cs.openSnackBar("Debe ingresar la descripción de la pregunta");

      }



    }
    else{
      this.cs.openSnackBar("Debe ingresar el titulo de la pregunta");

    }


  }


  temasADD(value:any) {

  //  if(value.key=='Enter')
 

    if(value.key==' ')
    {
      if(this.pregunta.temas.length<8){
  this.tema= this.titleCaseWord(this.tema);
    this.pregunta.temas.push(this.tema);
    this.tema="";}

    }

   
    
    if(value.key=='Backspace')
    {
     if(this.tema=="")
     {

        this.pregunta.temas.splice(this.pregunta.temas.length-1,1);
     }
    }
   
  
  }
   titleCaseWord(word: string) {
    if (!word) return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  ngOnInit() {
  }
  


  onSelectFile(event, files: FileList) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.rutaImagen = reader.result.toString();
        this.nombreImagen = files.item(0).name;
        this.fileToUpload = files.item(0);
        this.pregunta.imagen=this.nombreImagen;
      }
    }
  }

}
