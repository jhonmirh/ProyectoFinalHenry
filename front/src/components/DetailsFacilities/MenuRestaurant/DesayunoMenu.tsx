import Style from './style.module.css';
import { useState } from 'react';
import { desayunos } from './data';


export const DesayunoMenu = () => {
    const [desayuno, setDesayuno] = useState<"continental" | "americano" | "saludable" | "internacional">("continental");

    return (
        <article className={Style.container}>
            <h2>DESAYUNOS</h2>
            <div className={Style.buttonConainer}>
                <button onClick={() => setDesayuno("continental")} className={desayuno === "continental" ? Style.select : ""}>Continental</button>
                <button onClick={() => setDesayuno("americano")} className={desayuno === "americano" ? Style.select : ""}>Americano</button>
                <button onClick={() => setDesayuno("saludable")} className={desayuno === "saludable" ? Style.select : ""}>Saludable</button>
                <button onClick={() => setDesayuno("internacional")}className={desayuno === "internacional" ? Style.select : ""}>Internacional</button>
            </div>
            <div className={Style.detalles}>
                {desayunos[desayuno].map((categoria) => (
                    <div key={categoria.nombre}>
                        <p className={Style.txt}>{categoria.nombre}: <span>${categoria.precio}</span> </p>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default DesayunoMenu;