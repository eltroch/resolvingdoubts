
export class Preguntas {
  
    public id_pregunta:number;
    public usuario: string;
    public titulo:string;    
    public descripcion:string;
    public fecha:string;
    public imagen:string;
    public views:number;
    public like:number;
    public dislike:number;
    public respuestas:number;
    public temas: String[];


    constructor(id_pregunta:number,usuario:string, titulo:string, descripcion:string,fecha:string,imagen:string,views:number,like:number,dislike:number,respuestas:number,temas:String[]){
  
        this.id_pregunta=id_pregunta;
        this.usuario=usuario;
        this.titulo=titulo;
        this.descripcion=descripcion;
        this.fecha=fecha;
        this.views=views;
        this.imagen=imagen;
        this.like=like;
        this.dislike=dislike;
        this.respuestas=respuestas;
        this.temas=temas;
 
    }

}

