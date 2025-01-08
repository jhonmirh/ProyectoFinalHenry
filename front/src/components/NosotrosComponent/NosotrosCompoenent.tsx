import Style from './nosotros.module.css';
import Card from './Card';
import { teamData } from './teamData';


export const NosotrosComponent = () => {

    return (
        <section className={Style.container}>
        <h1 className={Style.sectionTitle}>Detrás de cada línea de código está nuestro increíble equipo de desarrollo</h1>
        <article className={Style.subContainer}>
            <div className={Style.cardContainer}>
             {teamData.map((member) => (
                 <Card
                   key={member.name}
                   name={member.name}
                   role={member.role}
                   imageUrl={member.imageUrl}
                 />
             ))}
             </div>

             <div className={Style.additionalContent}>
                <h2>Nuestra misión</h2>
                <p className={Style.additionalText}>
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Commodi reprehenderit facere animi,
                  voluptatem neque temporibus, eaque architecto, eos alias ducimus obcaecati
                   omnis tenetur sit quas maxime illo recusandae tempore accusamus!
                   Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti, ut tenetur hic n
                   ulla nostrum provident! Nesciunt ut minus odit iste ea! Nam nulla obcaecati architecto iste non iure ipsum minus?
                </p>
             </div>
      </article>
    </section>
    )
}

export default NosotrosComponent;