import { FC, MouseEvent, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../../store/features/alertSlice";
import { toggleUserData } from "../../../store/features/userSlice";

import { useLoginMutation } from "../../../store/services/endpoints/userApi";

import { RootType } from "../../../store";

import { handleError } from "../../../errorTypeGuard";

import FormInput from "../../UI/form-input/FormInput";
import FormButton from "../../UI/form-button/FormButton";

import "./AuthForm.scss";
import { cardData } from "../../../testData";

import { IForms } from "../forms-wrapper/FormsWrapper";

const AuthForm: FC<IForms> = ({ slideMove, changeSlideMove }) => {
  const dispatch = useDispatch();

  const [triggerLogin, { isLoading, isError, error, data, isSuccess }] =
    useLoginMutation();

  const [directionName, setDiractionName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isOpenEye, setIsOpenEye] = useState<boolean>(false);
  const [pasType, setPasType] = useState<string>("password");

  const [alertEmail, setAlertEmail] = useState<boolean>(false);
  const [alertPassword, setAlertPassword] = useState<boolean>(false);

  const setAlertsInput = (alEmail: boolean, alPass: boolean): void => {
    setAlertEmail(alEmail);
    setAlertPassword(alPass);
  };

  const handleChangeEmail = (value: string): void => {
    setEmail(value);
  };

  const handleChangePassword = (value: string): void => {
    setPassword(value);
  };
  const handleEye = () => {
    if (!isOpenEye) {
      setPasType("text");
      return setIsOpenEye(true);
    }

    if (isOpenEye) {
      setPasType("password");
      return setIsOpenEye(false);
    }
  };

  const handleToBack = (): void => {
    changeSlideMove("description");
    setEmail("");
    setPassword("");
    setIsOpenEye(false);
    setPasType("password");

    return setAlertsInput(false, false);
  };

  const handleAuth = (): void => {
    if (!email.length || !password.length) {
      !email.length && setAlertEmail(true);
      !password.length && setAlertPassword(true);

      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Все поля нужно заполнить!",
        })
      );

      return;
    }

    !isLoading && triggerLogin({ email, password });
  };

  useEffect(() => {
    if (slideMove === "description") return setDiractionName("");

    if (slideMove === "authorization") return setDiractionName("left");
  }, [slideMove]);

  useEffect(() => {
    if (isError) {
      if (handleError(error)?.status === 401) {
        dispatch(
          toggleAlert({
            isAlert: true,
            alertText: "Неправильный логин или пароль!",
            isAuthAlert: false,
          })
        );

        setAlertsInput(true, true);
      }
    }

    console.log(error);

    if (isLoading) {
      localStorage.setItem("email", email);
      localStorage.setItem("cards", JSON.stringify(cardData));

      dispatch(
        toggleAlert({
          isAlert: true,
          alertText: "Вы авторизовались!",
          isAuthAlert: false,
        })
      );

      setEmail("");
      setPassword("");

      return setAlertsInput(false, false);
    }
  }, [isLoading, isError]);

  useEffect(() => {
    if (alertEmail || alertPassword) setAlertsInput(false, false);
  }, [email, password]);

  return (
    <div className={`auth-form-wrapper ${directionName}`}>
      <div className="auth-title">
        <h3>Авторизация</h3>
      </div>

      <form className="auth-form">
        <FormInput
          type="text"
          inputName="email"
          inputId="auth-email"
          inputValue={email}
          isAlert={alertEmail}
          inputText="Введите email"
          setInputValue={handleChangeEmail}
        />

        <FormInput
          type={pasType}
          inputName="password"
          inputId="auth-password"
          inputValue={password}
          inputText="Введите пароль"
          isOpenEye={isOpenEye}
          isPassword={true}
          isAlert={alertPassword}
          handleEye={handleEye}
          setInputValue={handleChangePassword}
        />

        <div className="buttons-wrapper">
          <FormButton
            isLoading={isLoading}
            buttonText="авторизоваться"
            functionButton={handleAuth}
          />
          <FormButton buttonText="отмена" functionButton={handleToBack} />
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
