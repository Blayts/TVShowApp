import React from 'react';


interface HeaderProps {
  fixed: boolean
};

const Header: React.FC<HeaderProps> = ({ fixed }) => {
  let nameClass = 'header';

  if(fixed) {
    nameClass += ' header-fixed';
  }

  return (
    <div className={ nameClass }>
      <div className="header-node">Обложка</div>
      <div className="header-node">Название</div>
      <div className="header-node">Жанр</div>
      <div className="header-node adv">Страна</div>
      <div className="header-node adv">Длительность(мин)</div>
      <div className="header-node adv">Рейтинг</div>
    </div>
  )
};

export default Header;
