import Style from './style.module.css';
import { useState } from 'react';
import { cenas } from './data';


export const CenaMenu = () => {
    const [cena, setCena] = useState<"internacional" | "romantica" | "mexicana" | "gourmet">("internacional");

    return (
        <article className={Style.container}>
            <h2>CENAS</h2>
            <div className={Style.buttonConainer}>
                <button onClick={() => setCena("internacional")} className={cena === "internacional" ? Style.select : ""}>Internacional</button>
                <button onClick={() => setCena("romantica")} className={cena === "romantica" ? Style.select : ""}>Romántica en la Playa</button>
                <button onClick={() => setCena("mexicana")} className={cena === "mexicana" ? Style.select : ""}>Temática Mexicana</button>
                <button onClick={() => setCena("gourmet")}className={cena === "gourmet" ? Style.select : ""}>Gourmet</button>
            </div>
            <div className={Style.detalles}>
                {cenas[cena].map((categoria) => (
                    <div key={categoria.nombre}>
                        <p className={Style.txt}>{categoria.nombre}: <span>${categoria.precio}</span> </p>
                    </div>
                ))}
            </div>
        </article>
    )
}

export default CenaMenu;