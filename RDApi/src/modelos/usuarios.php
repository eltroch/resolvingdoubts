<?php
require_once 'datos/conexionBD.php';
require_once 'utils/constantes.php';
require_once 'utils/ExceptionApi.php';
require_once 'vistas/vistaJSON.php';
use ReallySimpleJWT\Token;

header('Content-type: application/json');
        header("Access-Control-Allow-Origin: *");
        ob_end_flush();

class Usuarios {

	const TABLA = "usuarios";
    const NOMBRES = "nombres";
    const EMAIL = "email";
    const IMAGEN = "imagen";
    const PASS = "pass";
  
	
    public static function insertarUsuario($infoUsuario){

        try{
            $conexion = Conexion::getInstancia()->getConexion();
			$query = "INSERT INTO ".self::TABLA."( ".self::NOMBRES.",".self::EMAIL.",".self::IMAGEN.",".self::PASS.") VALUES (?, ?, ?, ?);";
        
            $sentencia = $conexion->prepare($query);
			
			$pass = $infoUsuario["pass"];
            $passHash = password_hash($pass, PASSWORD_BCRYPT);

            $sentencia->bindParam(1, $infoUsuario["nombres"]);
            $sentencia->bindParam(2, $infoUsuario["email"]);
            $sentencia->bindParam(3, $infoUsuario["imagen"]);
            $sentencia->bindParam(4,$passHash );
		
            if($sentencia->execute()){
			// Create token header as a JSON string
	$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

	unset($infoUsuario['pass']);
	// Create token payload as a JSON string
	$payload = json_encode($infoUsuario);

	// Encode Header to Base64Url String
	$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

	// Encode Payload to Base64Url String
	$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

	// Create Signature Hash
	$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'juan2504', true);

	// Encode Signature to Base64Url String
	$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

	// Create JWT
	$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;


				
				return
					[
						"estado" => 200,
						"token" => $jwt
					];

				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi($e->getCode(), "ERROR en conexion PDO ");
		}
	}
	public static function actualizarUsuario($infoUsuario){
        try{
            $conexion = Conexion::getInstancia()->getConexion();
			
			$query = "UPDATE ".self::TABLA." SET  ".self::NOMBRES." =?, ".self::ROL." =?,".self::USER." =?,".self::PASS." =?  WHERE ".self::ID."=?;";
			
            $sentencia = $conexion->prepare($query);
            
			$sentencia->bindParam(1, $infoUsuario["nombres"]);
            $sentencia->bindParam(2, $infoUsuario["rol"]);            
            $sentencia->bindParam(3, $infoUsuario["user"]);
            $sentencia->bindParam(4, $infoUsuario["password"]);
            $sentencia->bindParam(5, $infoUsuario["id_usuario"]);

		
            if($sentencia->execute()){
				return 
					[
						"estado" => CREACION_EXITOSA,
						"mensaje" => "Usuario editado satisfactoriamente."
					];
				
			}else{
				throw new ExceptionApi(CREACION_FALLIDA, "error en la sentencia");
			}
        }catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO ".$e->getMessage());
		}
    }

    public static function getUsuarios(){
        try{
            $conexion = Conexion::getInstancia()->getConexion();

			$sentencia = $conexion->prepare("SELECT * FROM ".self::TABLA.";");
			
		
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
			throw new ExceptionApi(PDO_ERROR, "error en conexion PDO");
		}
	}
	
	public static function buscarPorId($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "SELECT * FROM ".self::TABLA." WHERE ".self::ID." = ?;";

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
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO");
		}
	}

	public static function login($infoUsuario){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "select * from usuarios where email=?";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $infoUsuario["email"]);


			

			if($sentencia->execute()){
				http_response_code(200);

				$data=$sentencia->fetchAll(PDO::FETCH_ASSOC);

				if($data != NULL){

				$passHash=$data[0]["pass"];
				if(password_verify($infoUsuario["pass"], $passHash))
			{
			
	// Create token header as a JSON string
	$header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);

	// Create token payload as a JSON string
	$payload = json_encode($data[0]);

	// Encode Header to Base64Url String
	$base64UrlHeader = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));

	// Encode Payload to Base64Url String
	$base64UrlPayload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

	// Create Signature Hash
	$signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, 'juan2504', true);

	// Encode Signature to Base64Url String
	$base64UrlSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

	// Create JWT
	$jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;


				
				return
					[
						"estado" => 200,
						"token" => $jwt
					];


			}
			else{

				return
					[
						"estado" => 404,
						"mensaje" => "Correo o contraseña incorrectos"
					];


			}
		}
			else{

				return
					[
						"estado" => 404,
						"mensaje" => "Correo o contraseña incorrectos"
					];


			}
		

			}else{
				throw new ExceptionApi(ESTADO_FALLIDO, "ERROR en la consulta");
			}
		}catch(PDOException $e){
			throw new ExceptionApi(PDO_ERROR, "ERROR en conexion PDO".$e->getMessage());
		}
	}
		
	public static function eliminarUsuario($id){
		try{
			$conexion = Conexion::getInstancia()->getConexion();

			$query = "DELETE FROM ".self::TABLA." WHERE ".self::ID." = ?;";

			$sentencia = $conexion->prepare($query);

			$sentencia->bindParam(1, $id);

			if($sentencia->execute()){
				return
					[
						"estado" => ESTADO_EXITOSO,
						"mensaje" => "Se elimino correctamente el usuario"
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