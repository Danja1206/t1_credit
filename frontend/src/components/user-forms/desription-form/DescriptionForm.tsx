import { FC, useState, useEffect } from "react";

import "./DescriptionForm.scss";

import { IForms } from "../forms-wrapper/FormsWrapper";

const DescriptionForm: FC<IForms> = ({ slideMove, changeSlideMove }) => {
  const [directionName, setDiractionName] = useState<string>("");

  useEffect(() => {
    if (slideMove === "description") return setDiractionName("");

    if (slideMove === "registration") return setDiractionName("left");

    if (slideMove === "authorization") return setDiractionName("right");
  }, [slideMove]);

  return (
    <div className={`description-form ${directionName}`}>
      <div className="description-title">
        <h3>Описание</h3>
      </div>

      <div className="description">
        <p>
          Привет! В данном разделе ты найдешь информацию по своим кредитам, а
          также возможность их удаления и редактирования.
        </p>
      </div>
      <div className="cont-description">
        <p>
          Прежде чем продолжить,{" "}
          <span
            className="to-auth"
            onClick={() => changeSlideMove("authorization")}
          >
            войди в аккаунт
          </span>{" "}
          или{" "}
          <span
            className="to-register"
            onClick={() => changeSlideMove("registration")}
          >
            зарегистрируйся
          </span>
        </p>
      </div>
    </div>
  );
};

export default DescriptionForm;
