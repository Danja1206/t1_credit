import { FC, useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../../store/features/alertSlice";
import { useRegisterMutation } from "../../../store/services/endpoints/userApi";

import { handleError } from "../../../errorTypeGuard";

import FormInput from "../../UI/form-input/FormInput";
import FormButton from "../../UI/form-button/FormButton";

import agreementPdf from "../../../assets/agreement/agreement.pdf";

import CheckBox from "../../UI/check-box/CheckBox";

import "./RegisterForm.scss";

import { IForms } from "../forms-wrapper/FormsWrapper";

import { cardData } from "../../../testData";

const RegisterForm: FC<IForms> = ({ slideMove, changeSlideMove }) => {
  const dispatch = useDispatch();

  const [triggerRegister, { isError, isLoading, isSuccess, error }] =
    useRegisterMutation();

  const [directionName, setDiractionName] = useState<string>("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isOpenEye, setIsOpenEye] = useState<boolean>(false);
  const [pasType, setPasType] = useState<string>("password");
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const [alertEmail, setAlertEmail] = useState<boolean>(false);
  const [alertPassword, setAlertPassword] = useState<boolean>(false);
  const [alertCheck, setAlertCheck] = useState<boolean>(false);

  const setAlertsInput = (
    alEmail: boolean,
    alPass: boolean,
    alCheck: boolean
  ): void => {
    setAlertEmail(alEmail);
    setAlertPassword(alPass);
    setAlertCheck(alCheck);
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

    return setAlertsInput(false, false, false);
  };

  const handleRegister = () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!email.length || !password.length || !isCheck) {
      !email.length && setAlertEmail(true);
      !password.length && setAlertPassword(true);
      !isCheck && setAlertCheck(true);

      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Все поля надо заполнить",
        })
      );

      return;
    }

    if (!emailRegex.test(email)) {
      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Некорректый формат email!",
        })
      );

      return setAlertsInput(true, false, false);
    }

    if (password.length < 6) {
      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Пароль короче 6 символов!",
        })
      );

      return setAlertsInput(false, true, false);
    }

    // !isLoading && triggerRegister({ email, password });
    triggerRegister({ email, password });
  };

  useEffect(() => {
    if (slideMove === "description") return setDiractionName("");

    if (slideMove === "registration") setDiractionName("right");
  }, [slideMove]);

  useEffect(() => {
    if (isError && error) {
      if (handleError(error)?.status === 409) {
        dispatch(
          toggleAlert({
            isAlert: true,
            alertText: "Пользователь уже существует!",
            isAuthAlert: false,
          })
        );

        return setAlertsInput(true, true, false);
      }

      if (handleError(error)?.status === 400) {
        dispatch(
          toggleAlert({
            isAlert: true,
            alertText: "Что-то пошло не так!",
            isAuthAlert: false,
          })
        );
      }

      return;
    }

    if (isLoading && !error) {
      localStorage.setItem("email", email);
      localStorage.setItem("cards", JSON.stringify(cardData));

      dispatch(
        toggleAlert({
          isAlert: true,
          alertText: "Вы зарегистрировались!",
          isAuthAlert: false,
        })
      );

      setEmail("");
      setPassword("");
      setIsCheck(false);

      return setAlertsInput(false, false, false);
    }
  }, [isLoading, isError, error]);

  useEffect(() => {
    if (alertEmail || alertPassword || alertCheck) {
      setAlertEmail(false);
      setAlertPassword(false);
      setAlertCheck(false);
    }
  }, [email, password, isCheck]);

  return (
    <div className={`register-form-wrapper ${directionName}`}>
      <div className="register-title">
        <h3>Регистрация</h3>
      </div>

      <form className="register-form">
        <FormInput
          type="text"
          inputName="email"
          inputId="register-email"
          inputValue={email}
          inputText="Введите email"
          isAlert={alertEmail}
          setInputValue={handleChangeEmail}
        />

        <FormInput
          type={pasType}
          inputName="password"
          inputId="register-password"
          inputValue={password}
          inputText="Введите пароль"
          isOpenEye={isOpenEye}
          isPassword={true}
          isAlert={alertPassword}
          handleEye={handleEye}
          setInputValue={handleChangePassword}
        />

        <div className="police-wrapper">
          <div className="police-title">
            <p>
              Подтверждаю{" "}
              <a
                href={agreementPdf}
                download="document.pdf"
                className="download-pdf"
              >
                пользовательские соглашения
              </a>
              и даю согласие на обработку персональных данных
            </p>
          </div>
          <CheckBox
            isAlert={alertCheck}
            isCheck={isCheck}
            setIsCheck={setIsCheck}
          />
        </div>

        <div className="buttons-wrapper">
          <FormButton
            isLoading={false}
            buttonText="зарегистрироваться"
            functionButton={handleRegister}
          />
          <FormButton buttonText="отмена" functionButton={handleToBack} />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
