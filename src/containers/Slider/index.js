import { useEffect, useState, React } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    if (byDateDesc && byDateDesc.length > 0) {
      setTimeout(
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
  };

  // ajout dans les dépendances de index + byDateDesc (pour eviter l'erreur de la byDateDesc.lenght introuvable et )
  useEffect(() => {
    nextCard();
  }, [index, byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // ajout du fragment et des correctifs des keys
        <div key={`fragment-${event.id}`}>
          <div
            key={`evenement-${event.id}`}
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
              {byDateDesc.map((event2, radioIdx) => (
                <input
                  key={`${event.id}-${event2.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
                // ajout de readOnly
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default Slider;
