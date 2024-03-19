import React, { useEffect, useRef, useState } from "react";
import img from '../../../images/bullet-point.png'

const Tab1Content = () => {
    return (
        <>
            <div className='pt-5'></div>
            <div className='item-center'>
                <div className='width-80 color-blue'>
                    <span className='color-green font-size-little-increace '>¡Reglas del torneo!</span>
                    <ul>
                        <div className='d-flex mt-3 mb-3'>
                            <img src={img} alt='->' width={'15px'} height={'10px'} className=' mt-2 me-2' />
                            <li className='list-unstyled'>El usuario escogerá un equipo por cada partido en torneo.</li>
                        </div>

                        <div className='d-flex mb-3'>
                            <img src={img} alt='->' width={'15px'} height={'10px'} className=' mt-2 me-2' />
                            <li className='list-unstyled'>El usuario obtiene 1 punto por cada equipo ganador.</li>
                        </div>

                        <div className='d-flex mb-3'>
                            <img src={img} alt='->' width={'15px'} height={'10px'} className=' mt-2 me-2' />
                            <li className='list-unstyled'>El usuario obtiene 0 puntos por cada equipo perdedor.</li>
                        </div>

                        <div className='d-flex mb-3'>
                            <img src={img} alt='->' width={'15px'} height={'10px'} className=' mt-2 me-2' />
                            <li className='list-unstyled'>Si un juego se cancela o termina empate ese partido no se tomará en consideración para la puntuación (no se como seria mas fácil si dar 0 puntos para los juegos terminados empates o no considerar ese juego para la puntuación)</li>
                        </div>

                        <div className='d-flex mb-3'>
                            <img src={img} alt='->' width={'15px'} height={'10px'} className=' mt-2 me-2' />
                            <li className='list-unstyled'>El usuario con la mayor cantidad de puntos es el ganador.</li>
                        </div>

                        <div className='d-flex mb-3'>
                            <img src={img} alt='->' width={'15px'} height={'10px'} className=' mt-2 me-2' />
                            <li className='list-unstyled'>El último juego en calendario para cada torneo el usuario tendrá que predecir la puntuación total del juego esto será para decidir un empate en caso de que dos usuarios tengan la misma puntuación.</li>
                        </div>

                        <div className='d-flex mb-5'>
                            <img src={img} alt='->' width={'15px'} height={'10px'} className=' mt-2 me-2' />
                            <li className='list-unstyled'>En caso de haber un empate entre dos jugadores. La predicción mas cercana de la puntuación el ultimo juego decide quien llega primero entre los dos usuarios. Ejemplo último juego Miami 120 vs Lakers 101. Score total 221</li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Tab1Content;