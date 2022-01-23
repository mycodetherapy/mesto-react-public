import React from "react";
import statusOk from "../images/action-ok.png";
import statusErr from "../images/action-err.png";

function PopupRegisterTooltip({isOpen, onClose, status}) {
    const className = isOpen && "popup_opened";
  return (
    <div className={`popup ${className}`}>
      <div className="popup__container" tabIndex="0">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        {status === "success" ? 
        <div> 
          <img className="popup__status-image" src={statusOk} alt="Действие-успешно"></img>
          <p className="popup__status-text">Вы успешно зарегистрировались!</p>
        </div>
        :
        <div> 
          <img className="popup__status-image" src={statusErr} alt="Действие-ошибка"></img>
          <p className="popup__status-text">Что-то пошло не так!<br />
          Попробуйте еще раз.</p>
        </div>
        }
      </div>
    </div>
  );
}

export default PopupRegisterTooltip;
