<?php
require_once 'modelos/respuestas.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class 	RespuestasControlador{

    public static function get($peticion){

		if (count($peticion) ==1){
			return Respuestas::getRespuestas($peticion[0]);					

		}else
		{
			return Respuestas::eliminarRespuesta($peticion[1]);
		}
	
	}
	
	public static function post($peticion){
		// obtenemos el fichero que viene con la peticion POST
		$data = json_decode(file_get_contents('php://input'), true);
 
		if(!empty($peticion[0])){
			switch ($peticion[0]) {
				case 'registro':
					return Respuestas::insertarRespuesta($data);
					break;
				case 'editar':
					return Respuestas::actualizarRespuesta($datosArray);
					break;
				
				default:
					throw new ExceptionApi(PARAMETROS_INCORRECTOS, "parametros incorrectos");
			}
		}else{
			throw new ExceptionApi(PARAMETROS_INCORRECTOS, "parametros incorrectos");
		}
	}
    
}
?>