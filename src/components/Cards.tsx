import React from 'react';
import CSS from 'csstype';

interface CardProps {
  data: {[key: string]: any},
  onOpen(id: string): void
};

interface CardsProps {
  data: {[key: string]: any}[],
  onOpen(id: string): void
};

const Genres: React.FC<{genres: Array<string>}> = ({ genres }) => {
  if(!genres.length) {
    return <span>None</span>
  }
  return (
    <ul>
      { genres.map((c: string) => <li>{ c }</li>) }
    </ul>
  )
}

const Card: React.FC<CardProps> = ({ data, onOpen }) => {
  const { averageRuntime, genres, name, image, network, rating } = data;

  return (
    <div>
      <div className="body-node">
        <img src={ image. medium } onClick={ () => onOpen(data.id) }></img>
      </div>
      <div className="body-node">
        <span className="body-node-name" onClick={ () => onOpen(data.id) }>{ name }</span>
      </div>
      <div className="body-node"><Genres genres={ genres } /></div>
      <div className="body-node adv">{ network?.country?.name ?? 'None' }</div>
      <div className="body-node adv">{ averageRuntime }</div>
      <div className="body-node adv">{ rating.average ?? 'None'}</div>
    </div>
  )
}

const Cards: React.FC<CardsProps> = ({ data, onOpen }) => {
  return (
    <>
      { data.map((c: any, i: number) => <Card data={ c } onOpen={ onOpen }/>) }
    </>
  )
}

export default Cards;
