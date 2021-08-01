import React, { Fragment } from 'react';


interface ModalProps {
  data: {[key: string]: any} | undefined,
  onClose(): void
};

const Modal: React.FC<ModalProps> = ({ data, onClose }) => {
  return (
    <Fragment>
      { data !== undefined &&
        <div className="modal">
          <div className="modal-body">
            <div>
              <img src={ data.image.medium }></img>
              <div dangerouslySetInnerHTML={{__html: data.summary}}></div>
            </div>
            <div>
              <span>Премьера: { data.premiered }</span>
              <span>Статус: { data.status }</span>
              <span>Язык: { data.language }</span>
            </div>
            <div>
              <a href={ data.officialSite }>Официальный сайт { !data.officialSite && 'отсутствует'}</a>
              <a href={ data.url }>Оригинальная ссылка</a>
            </div>
            <button onClick={ onClose }>Вернуться</button>
          </div>
        </div>
      }
    </Fragment>
  )
};

export default Modal;
