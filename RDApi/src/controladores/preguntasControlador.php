<?php
require_once 'modelos/preguntas.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';

class PreguntasControlador{

    public static function get($peticion){
		if(count($peticion) == 0){
			return Preguntas::getPreguntas();

		}else if (count($peticion) ==1){

			if($peticion[0]=='destacadas')
			{
				return Preguntas::getDestacadas($peticion[0]);

			}
			else if($peticion[0]=='estadisticas-mes')
			{
				return Preguntas::getPreguntasPorMes($peticion[0]);

			}
		
		
			else{
			return Preguntas::buscarPorId($peticion[0]);	
			}				

		}else
		{
		 if($peticion[0]=='like'){
				return Preguntas::likePregunta($peticion[1]);
			}
			else if($peticion[0]=='dislike'){
				return Preguntas::dislikePregunta($peticion[1]);
			}
			else if($peticion[0]=='view'){
				return Preguntas::viewPregunta($peticion[1]);
			}
			else if ($peticion[0]=='mias'){
				return Preguntas::getMisPreguntas($peticion[1]);			

			}
			else if ($peticion[0]=='busqueda'){
				return Preguntas::getBusqueda($peticion[1]);			

			}
			
			
			
			else{
				return Preguntas::eliminarPregunta($peticion[1]);
			}
		}

		
	
	}
	
	public static function post($peticion){
	
		
		$data = json_decode(file_get_contents('php://input'), true);

		if(!empty($peticion[0])){
			switch ($peticion[0]) {
				case 'registro':
					return Preguntas::insertarPregunta($data);
					break;
				case 'editar':
					return Preguntas::actualizarPregunta($datosArray);
					break;
					case 'cargarImagen':
					return Preguntas::postImagen($data);

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