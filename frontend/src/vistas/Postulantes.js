import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TablaCandidatos from "../componentes/TablaCandidatos";
import styles from "./estilos/Postulantes.module.css";
import Header from "../componentes/Header";
import NavigationBar from "../componentes/NavigationBar";
import ApiUrl from "../config/ApiUrl";


const Postulantes = ({ user }) => {
  const navigate = useNavigate(); // Use useNavigate for navigation
  const location = useLocation(); // Get current location

 

  return (
    <div >
      <Header/>
      <NavigationBar user={user} />
      <h1 className="section-title">Postulantes</h1>
      <TablaCandidatos />

     
    </div>
  );
};

export default Postulantes;
