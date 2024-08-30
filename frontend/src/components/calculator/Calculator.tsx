import {
  FC,
  MouseEvent,
  ChangeEvent,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../store/features/alertSlice";

import { RootType } from "../../store";
import { useSelector } from "react-redux";

import { useLazySaveQuery } from "../../store/services/endpoints/loanApi";

import RangeInput from "../UI/range-input/RangeInput";

import "./Calculator.scss";

export interface ICalculator {
  monthSum: string;
  setMonthSum: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  handleCalculate: (
    event: MouseEvent<HTMLDivElement>,
    sumValue: string,
    percent: string,
    term: string
  ) => void;
}

const Calculator: FC<ICalculator> = ({
  handleCalculate,
  isLoading,
  monthSum,
  setMonthSum,
}) => {
  const dispatch = useDispatch();

  const [
    triggerSave,
    { isError, isSuccess, data, isLoading: isSaving, error },
  ] = useLazySaveQuery();

  const { isAuth } = useSelector((state: RootType) => state.userSlice);

  const [sumValue, setSumValue] = useState<string>("100 000 ₽");
  const [term, setTerm] = useState<string>("6 месяцев");
  const [percent, setPercent] = useState<string>("13 %");

  const [alertButton, setAlertButton] = useState<boolean>(false);
  const [alertPercent, setAlertPercent] = useState<boolean>(false);

  const handleSaveButton = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();

    if (!isAuth) {
      !alertButton &&
        dispatch(
          toggleAlert({
            alertText: "Сначала необходимо зайти в личный кабинет!",
            isAlert: true,
            isAuthAlert: true,
          })
        );

      setAlertButton(true);
    }

    if (isAuth) {
      triggerSave();
    }
  };

  const handleBlur = () => {
    const _num = Number(percent.replace(" %", ""));

    _num < 1 && setPercent("1 %");

    _num > 25 && setPercent("25 %");
  };

  const skipProcent = (event: MouseEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const startPosition = input.selectionStart || 0;
    const needPosition = input.value.replace(" %", "").length;

    if (startPosition > needPosition)
      input.setSelectionRange(needPosition, needPosition);
  };

  const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement;
    const currentPercent = event.target.value.replace(" %", "");

    if (!/^[0-9]*$/.test(currentPercent)) {
      dispatch(
        toggleAlert({
          isAlert: true,
          isAuthAlert: false,
          alertText: "Вводите только числа!",
        })
      );

      return setAlertPercent(true);
    }

    setPercent(currentPercent + " %");

    setTimeout(
      () =>
        input.setSelectionRange(currentPercent.length, currentPercent.length),
      0
    );
  };

  useEffect(() => {
    if (alertButton) {
      setTimeout(() => {
        setAlertButton(false);
      }, 2000);
    }
  }, [alertButton]);

  useEffect(() => {
    setAlertPercent(false);
  }, [percent]);

  useEffect(() => {
    if (isError) console.log(error);

    if (isSaving) console.log(data);
  }, [isError, isSaving, data]);

  return (
    <div className="calculator-wrapper">
      <div className="params-input-wrapper">
        <div className="calculator-title">
          <h2>Рассчитать сумму</h2>
        </div>
        <form className="params-form">
          <div className="params">
            <RangeInput
              rangeText="Какую сумму желаете взять?"
              preId="sum"
              min="0"
              max="100"
              pointBegin="100 тыс ₽"
              pointMedium="20 млн ₽"
              pointEnd="40 млн ₽"
              isDate={false}
              externalValue={sumValue}
              setExternalValue={setSumValue}
            />

            <RangeInput
              rangeText="На какой срок желаете взять?"
              preId="term"
              min="0"
              max="100"
              pointBegin="6 месяцев"
              pointMedium="3 года 9 месяцев"
              pointEnd="7 лет"
              isDate={true}
              externalValue={term}
              setExternalValue={setTerm}
            />

            <div className="percent-wrapper">
              <label htmlFor="percent" className="percent-label">
                Выберите годовую ставку{" "}
              </label>
              <input
                name="percent"
                id="percent"
                className={alertPercent ? "percent alert" : "percent"}
                value={percent}
                onClick={skipProcent}
                onChange={changeInputHandler}
                onBlur={handleBlur}
              />
            </div>
          </div>

          <div className="calculator-buttons">
            <div
              className={
                alertButton ? "calculator-button alert" : "calculator-button"
              }
              onClick={handleSaveButton}
            >
              <p>сохранить</p>
            </div>

            <div
              className="calculator-button"
              onClick={(event) =>
                handleCalculate(event, sumValue, percent, term)
              }
            >
              {isLoading ? (
                <span className="spinner"></span>
              ) : (
                <p>рассчитать</p>
              )}
            </div>
          </div>
        </form>
      </div>
      <div className="params-output-wrapper">
        <div className="result-sum-wrapper">
          <div className="result-title">
            <h3>Ежемесячный платеж составляет</h3>
          </div>
          <div className="result-sum">
            {isLoading ? (
              <span className="spinner-sum"></span>
            ) : (
              <h4>{monthSum}</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
