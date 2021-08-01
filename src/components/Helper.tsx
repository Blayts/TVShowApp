import React, { useState } from 'react';
import wheel from '../icons/wheel.svg';


interface HelperProps {
  limit: number,
  fixed: boolean,
  onChangeLimit(limit: string): void,
  onChangeFixed(fixed: boolean): void
};

const Helper: React.FC<HelperProps> = (props) => {
  const { limit, fixed, onChangeLimit, onChangeFixed } = props;
  const [isHelper, setHelper] = useState<boolean>(false);
  let classDiv = 'helper';

  function openHelper(): void {
    setHelper(true);
  }

  function closeHelper(): void {
    setHelper(false);
  }

  if(!isHelper) {
    return (
      <div className={ classDiv }>
        <img src={ wheel } onClick={ openHelper }></img>
      </div>
    )
  }
  else {
    classDiv += ' helper-active';
    return (
      <div className={ classDiv }>
        <button onClick={ closeHelper }>&times;</button>
        <ul>
          <li>
            <span>Зафиксировать заголовок:</span>
            <input
              type="checkbox"
              checked={ fixed }
              onChange={ event => onChangeFixed(event.target.checked) }
            />
          </li>
          <li>
            <span>Количество элементов:</span>
            <select onChange={ event => onChangeLimit(event.target.value) } value={ limit }>
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
          </li>
        </ul>
      </div>
    )
  }
}

export default Helper;
