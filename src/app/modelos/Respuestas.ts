export class Respuestas {
  
    public id_respuesta:number;
    public id_pregunta:number;
    public usuario: string;
    public nombres:string;    
    public descripcion:string;
    public fecha_respuesta:string;
    public like:number;
    public dislike:number;



    constructor(id_respuesta:number,id_pregunta:number,usuario:string, nombres:string, descripcion:string,fecha_r:string, like:number,dislike:number){
  
        this.id_respuesta=id_respuesta;
        this.id_pregunta=id_pregunta;
        this.usuario=usuario;
        this.nombres=nombres;
        this.descripcion=descripcion;
        this.fecha_respuesta=fecha_r; 
        this.like=like;
        this.dislike=dislike;

 
    }

}