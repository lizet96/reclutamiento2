import { FunctionComponent } from 'react';
import styles from '../vistas/estilos/Frame.module.css';
import People from '../assets/people.png'
import Camara from '../assets/camara.png'
import Folder from '../assets/folder.png'


const Perfil = () => {

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Obtiene el primer archivo seleccionado
    if (file) {
      console.log(file.name); // Muestra el nombre del archivo en la consola o realiza alguna acción
    }
  };
  	return (
    		<div className={styles.frameParent}>
      			<div className={styles.frameGroup}>
        				<div className={styles.groupParent}>
          					<img className={styles.groupIcon} alt="" src={People} />
                    <button className={styles.vectorParent} onClick={() => document.getElementById('fileInput').click()}>
                      <img className={styles.vectorIcon} alt="" src={Folder} />
                      <span className={styles.elegirArchivo}>Elegir Archivo</span>
                    </button>
                    <input
                      type="file"
                      id="fileInput"
                      className={styles.hiddenInput}
                      onChange={handleFileChange}
                      style={{ display: 'none' }} // Asegura que el input esté oculto
                    />

          					<div className={styles.vectorGroup}>
            						<img className={styles.vectorIcon1} alt="" src={Camara}  />
            						<div className={styles.elegirArchivo}>Guardar foto</div>
          					</div>
          					<div className={styles.lizetJazminOlveraGonzlezParent}>
            						<div className={styles.lizetJazminOlvera}>Lizet Jazmin Olvera González</div>
            						<div className={styles.postulante}>Postulante</div>
          					</div>
        				</div>
        				<div className={styles.frameContainer}>
          					<div className={styles.frameDiv}>
            						<div className={styles.datosPersonalesWrapper}>
              							<b className={styles.elegirArchivo}>Datos personales</b>
            						</div>
                        <div className={styles.instanceParent}>
                      <div className={styles.nombreParent}>
                        <div className={styles.lizetJazminOlvera}>Nombre</div>
                        <div className={styles.lizetJazminWrapper}>
                          <input
                            type="text"
                            className={styles.elegirArchivo}
                            defaultValue="Lizet Jazmin"
                          />
                        </div>
                      </div>
                      
                      <div className={styles.nombreParent}>
                        <div className={styles.lizetJazminOlvera}>Apellido</div>
                        <div className={styles.lizetJazminWrapper}>
                          <input
                            type="text"
                            className={styles.elegirArchivo}
                            defaultValue="Olvera"
                          />
                        </div>
                      </div>
                      
                      <div className={styles.nombreParent}>
                        <div className={styles.lizetJazminOlvera}>Correo</div>
                        <div className={styles.lizetJazminWrapper}>
                          <input
                            type="email"
                            className={styles.elegirArchivo}
                            defaultValue="liz@gmail.com"
                          />
                        </div>
                      </div>
                      
                      <div className={styles.nombreParent}>
                        <div className={styles.lizetJazminOlvera}>Teléfono</div>
                        <div className={styles.lizetJazminWrapper}>
                          <input
                            type="tel"
                            className={styles.elegirArchivo}
                            defaultValue="4425851526"
                          />
                        </div>
                      </div>
                    </div>

          					</div>
          					<div className={styles.editarPerfilWrapper}>
            						<b className={styles.editarPerfil}>Editar  perfil</b>
          					</div>
        				</div>
      			</div>
      			<div className={styles.editarContraseaParent}>
        				<b className={styles.editarContrasea}>Editar contraseña</b>
        				<div className={styles.frameParent1}>
          					<div className={styles.instanceGroup}>
                    <div className={styles.nombreParent}>
                        <div className={styles.lizetJazminOlvera}>Contraseña actual</div>
                        <div className={styles.lizetJazminWrapper}>
                          <input
                            type="tel"
                            className={styles.elegirArchivo}
                            defaultValue="contraseña"
                          />
                        </div>
                      </div>
                      <div className={styles.nombreParent}>
                        <div className={styles.lizetJazminOlvera}>Nueva contraseña</div>
                        <div className={styles.lizetJazminWrapper}>
                          <input
                            type="tel"
                            className={styles.elegirArchivo}
                            defaultValue="ingrese contraseña"
                          />
                        </div>
                      </div>
          					</div>
          				  <div className={styles.nombreParent}>
                        <div className={styles.lizetJazminOlvera}>Confirme contraseña</div>
                        <div className={styles.lizetJazminWrapper}>
                          <input
                            type="tel"
                            className={styles.elegirArchivo}
                            defaultValue="Confirme contraseña"
                          />
                        </div>
                      </div>
        				</div>
        				<div className={styles.editarContraseaWrapper}>
          					<b className={styles.editar}>Editar contraseña</b>
        				</div>
      			</div>
    		</div>);
};

export default Perfil;
