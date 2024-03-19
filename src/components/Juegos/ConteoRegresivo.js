import React, { useState, useEffect } from 'react';
import styles from "./ConteoRegresivo.module.css"

const ConteoRegresivo = ({ anio, mes, dia, hora, minuto, status }) => {
  const [tiempoRestante, setTiempoRestante] = useState('Calculando...');
  const [estado, setEstado] = useState('Tiempo');

  useEffect(() => {
    const fechaObjetivo = new Date(anio, mes - 1, dia, hora, minuto, 0, 0).getTime();

    const calcularTiempoRestante = () => {
      const ahora = new Date().getTime();
      const tiempoRestante = fechaObjetivo - ahora;

      if (tiempoRestante <= 0) {
        clearInterval(intervalo);
        
        if(status == null || status === "Final"){
            setTiempoRestante('¡Juego terminado!');
        }else{
            setTiempoRestante('¡Juego Iniciado!');
        }
        
      } else {
        const dias = Math.floor(tiempoRestante / (1000 * 60 * 60 * 24));
        const horas = Math.floor((tiempoRestante % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000);

        if(dias <= 0 && horas <= 0 && minutos <= 59){
            setEstado("Finalizando")
            setTiempoRestante(`${dias} días - , ${horas}HH :${minutos}min : ${segundos} seg`);
        }else{
            setTiempoRestante(`${dias} días - , ${horas}HH :${minutos}min : ${segundos} seg`);
        }

        
      }
    };

    const intervalo = setInterval(calcularTiempoRestante, 1000);

    // Limpieza del intervalo cuando el componente se desmonta
    return () => clearInterval(intervalo);
  }, [tiempoRestante]);

  return (
    
    <div>
        <span className={estado === "Finalizando" ? styles.text_min2 : styles.text_min}>
        {tiempoRestante}
        </span>
    </div>
    
  );
};

// Uso del componente


export default ConteoRegresivo;