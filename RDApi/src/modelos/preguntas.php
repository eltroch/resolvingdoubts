<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';

class Preguntas {

	const TABLA = "preguntas";
    const ID = "id_pregunta";
    const TITULO= "titulo";
    const DESCRIPCION = "descripcion";
	const IMAGEN = "imagen";
	const FECHA = "fecha";
	const VIEWS = "views";
	const USUARIO = "usuario";
	const LIKE = "like";
	const DISLIKE = "dislike";
   
  
	
    public static function insertarPregunta($infoPregunta){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
		
			$query = "call spGuardarPregunta('".$infoPregunta["usuario"]."','".$infoPregunta["titulo"]."','".$infoPregunta["descripcion"]."','".$infoPregunta["imagen"]."');";
			
			$sentencia = $conexion->prepare($query);
		
		
            if($sentencia->execute()){
				http_response_code(200);

				return Preguntas::insertarTemas($infoPregunta["usuario"],$infoPregunta["temas"]);
			
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO ".$e);
		}
	}


	public static function insertarTemas($usuario,$temas){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			//$query = "INSERT INTO ".self::TABLA."( ".self::ID.", ".self::ID_RESPUESTA.",".self::DESCRIPCION.",".self::CORRECTA.") VALUES (?, ?, ?, ?);";
			for($i=0; $i<count($temas); $i++){
				$query = "call spGuardarTema('".$usuario."','".$temas[$i]."')";
				$sentencia = $conexion->prepare($query);
				
					if($sentencia->execute()){
						if(($i==count($temas)-1)){
						return 
							[
								"estado" => 200,
								"mensaje" => "Pregunta guardada correctamente"
							];
							}
						
					}else{
						throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
					}
				
			}
			
		
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
	}



	public static function postImagen(){
        if(isset($_FILES['imagenPropia'])){
    
            $imagen_tipo = $_FILES['imagenPropia']['type'];
            $imagen_nombre = $_FILES['imagenPropia']['name'];
            $directorio_final = "../assets/recursos/".$imagen_nombre; 
            
            if($imagen_tipo == "image/jpeg" || $imagen_tipo == "image/jpg" || $imagen_tipo == "image/png"){
            
                if(move_uploaded_file($_FILES['imagenPropia']['tmp_name'], $directorio_final)){
            
                    /*$data = array(
                        'status' => 'success',
                        'code' => 200,
                        'mensaje' => 'Imagen cargada satisfactoriamente.'
                    );
                    $format = (object) $data;
                    $json = json_encode($format); 
					echo $json; */
					
					return [
						"status" => "success",
						"code" => 200,
						"mensaje" => "Imagen cargada satisfactoriamente."
					];
            
                }else{
            
                    /*$data = array(
                        'status' => 'error',
                        'code' => 400,
                        'mensaje' => 'Error al mover imagen al servidor'
                    );
                    $format = (object) $data;
                    $json = json_encode($format); 
					echo $json; */
					
					return [
						"status" => "error",
						"code" => 400,
						"mensaje" => "Error al mover imagen al servidor"
					];
            
                }
            
            }else{
            
                /*$data = array(
                    'status' => 'error',
                    'code' => 500,
                    'mensaje' => 'Formato no soportado'
                );
                $format = (object) $data;
                $json = json_encode($format); 
				echo $json; */
				
				return [
					"status" => "error",
					"code" => 500,
					"mensaje" => "Formato no soportado"
				];
            
            }
            
            }else{
            
            /*$data = array(
                'status' => 'error',
                'code' => 400,
                'mensaje' => 'No se recibio ninguna imagen'
            );
            $format = (object) $data;
            $json = json_encode($format); 
			echo $json; */
			
			return [
				"status" => "error",
				"code" => 500,
				"mensaje" => "No se recibio ninguna imagen"
			];
            
            }  
    }

	
	public static function actualizarPregunta($infoPregunta){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::ID_TEMA." =?, ".self::DESCRIPCION." =?,".self::IMAGEN." =?  WHERE ".self::ID."=?;";
			
			$sentencia = $conexion->prepare($query);
					
            $sentencia->bindParam(1, $infoPregunta[self::ID_TEMA]);
            $sentencia->bindParam(2, $infoPregunta[self::DESCRIPCION]);
			$sentencia->bindParam(3,$infoPregunta[self::IMAGEN]);
			$sentencia->bindParam(4, $infoPregunta[self::ID]);
		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Pregunta editada satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO ".$e->getMessage());
		}
    }


	//MN
	public static function likePregunta($id){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "call spLikePregunta($id);";
			
			$sentencia = $conexion->prepare($query);

		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "like"
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO ".$e->getMessage());
		}
	}

	public static function viewPregunta($id){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "call spViewPregunta($id);";
			
			$sentencia = $conexion->prepare($query);

		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "view"
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO ".$e->getMessage());
		}
	}
	public static function dislikePregunta($id){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "call spDislikePregunta($id);";
			
			$sentencia = $conexion->prepare($query);

		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "dislike"
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO ".$e->getMessage());
		}
	}
	
	//////////////////////////////////////
    public static function getBusqueda($dato){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("call spBusqueda('%$dato%')");
			
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO".$e->getMessage());
		}
	}
		//////////////////////////////////////
		public static function getPreguntasPorMes(){
			try{
				$conexion = Conexion::getInstancia()->getConexion();
	
				$sentencia = $conexion->prepare("CALL spEstPreguntasMes();");
				
			
				if($sentencia->execute()){
					http_response_code(200);
					return
						[
							"estado" => ESTADO_EXITOSO,
							"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
						];
				}else{
					throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
				}
			}catch(PDOException $e){
				throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO".$e->getMessage());
			}
		}


    public static function getPreguntas(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT * FROM ".self::TABLA." NATURAL JOIN tema NATURAL JOIN area;");
			
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO".$e->getMessage());
		}
	}


	public static function getDestacadas(){
	   

		try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("call  spPreguntasDestacadas();");
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => 200,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDOs".$e->getMessage());
		}
	}
	public static function getMisPreguntas($usuario){
	  

		try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("call  spMisPreguntas('$usuario');");
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => 200,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDOs".$e->getMessage());
		}
	}
	public static function getPreguntasExamen($id_examen){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("call spPreguntasExamen($id_examen)");
			
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDO");
		}
	}
	public static function getPreguntasPorExamen($id_examen){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("call spMostrarPreguntas($id_examen)");
			
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDO");
		}
	}
	public static function getPreguntasAreaTema($datos){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("call spExtraerPreguntas('".$datos['area_select']."%','".$datos['tema_select']."%','%".$datos['data']."%')");
			
		
			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "error en la consulta");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDO". $e->getMessage());
		}
	}
	public static function buscarPorId($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "call spBuscarPregunta($id)";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "ERROR en la consulta");
			}
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "Error en conexion PDO");
		}
	}

	public static function buscarPorIdTema($dato){// BUSCA preguntas POR id_tema
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "call spBuscarPreguntas('".$dato."%')";
            $sentencia = $conexion->prepare($query);


			if($sentencia->execute()){
				http_response_code(200);
				return
					[
						"estado" => ESTADO_EXITOSO,
						"datos" => $sentencia->fetchAll(PDO::FETCH_ASSOC)
					];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "ERROR en la consulta");
			}
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO".$e->getmessage());
		}
	}
		
	public static function eliminarPregunta($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE ".self::ID." = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente la pregunta"
                    ];
			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "ERROR en la consulta");
			}
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO".$e->getMessage());
		}
	}
}
?>