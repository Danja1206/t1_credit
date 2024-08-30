import { FC, useState, useEffect } from "react";

import { useSelector } from "react-redux";
import { RootType } from "../../../store";

import "./FormsWrapper.scss";

import DescriptionForm from "../desription-form/DescriptionForm";
import AuthForm from "../auth-form/AuthForm";
import RegisterForm from "../register-form/RegisterForm";

export interface IForms {
  slideMove: string;
  changeSlideMove: (direction: string) => void;
}

const FormsWrapper: FC = () => {
  const { isAuth } = useSelector((state: RootType) => state.userSlice);

  const [slideMove, setSlideMove] = useState<string>("description");

  const [isClose, setIsClose] = useState<boolean>(false);

  const changeSlideMove = (direction: string): void => {
    setSlideMove(direction);
  };

  useEffect(() => {
    if (isAuth) return setIsClose(true);

    return setIsClose(false);
  }, [isAuth]);

  return (
    <div className={isClose ? "forms-wrapper close" : "forms-wrapper"}>
      <RegisterForm slideMove={slideMove} changeSlideMove={changeSlideMove} />
      <DescriptionForm
        slideMove={slideMove}
        changeSlideMove={changeSlideMove}
      />
      <AuthForm slideMove={slideMove} changeSlideMove={changeSlideMove} />
    </div>
  );
};

export default FormsWrapper;
