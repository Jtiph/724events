import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  /* stock et initialise à 0 */
  const { data } = useData();
  const [index, setIndex] = useState(false);
  /* trie les events par ordre décroissante */
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1 // inversement du 1 et -1 pour mettre de la plus ancienne à la récente
  );

 /* gère le délai des changements des slides */
  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  }; // suppression des 5000 et changement en prevIndex pour éviter les erreurs d'incrémentations

  /* effet pour l'auto défilement */
  useEffect(() => {
    const interval = setInterval(nextCard, 5000); // effet sur next card, déplacement des secondes ici
    return () => clearInterval(interval);
  }, [byDateDesc]); // clear à chaque fois que by date change 

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // changement du fragment <> en div pour wrap le tout avec la key qui était dans la div du dessous
        <div key={event.title}> 
          <div     
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                // eslint-disable-next-line react/no-array-index-key
                  key={radioIdx}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx} // changement de idx en index 
                  readOnly
                />
              ))}
            </div>
          </div>
          </div>
      ))}
    </div>
  );
};

export default Slider;
