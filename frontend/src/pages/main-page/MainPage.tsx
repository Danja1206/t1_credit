import { FC, MouseEvent, useEffect, useState, useRef, memo } from "react";

import { useLocation } from "react-router-dom";
import { useCalculateMutation } from "../../store/services/endpoints/loanApi";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../store/features/alertSlice";
import { setHightBorderSum } from "../../store/features/paymentSlice";
import { useSelector } from "react-redux";

import { handleError } from "../../errorTypeGuard";

import Calculator from "../../components/calculator/Calculator";
import { ILoan, IPayment } from "../../store/services/types";

import "./MainPage.scss";

import PaymentChart from "../../chart/PaymentChart";
import PaymentSchedule from "../../components/payment-schedule/PaymentSchedule";
import { RootType } from "../../store";

const MainPage: FC = () => {
  const dispatch = useDispatch();

  const { hightBorderSum } = useSelector(
    (state: RootType) => state.paymentSlice
  );

  const location = useLocation();

  const [triggerCalculate, { isError, isLoading, isSuccess, data, error }] =
    useCalculateMutation();

  const [tableData, setTableData] = useState<IPayment[]>([]);

  const [monthSum, setMonthSum] = useState<string>("16 220.95 ₽");

  const transformRate = (rate: string): number =>
    rate.split(" ").reduce<number>((acc, char, index, arr) => {
      if (char === "год" || char === "года" || char === "лет")
        return (acc += +arr[index - 1] * 12);

      if (char === "месяцев" || char === "мес.")
        return (acc += +arr[index - 1]);

      return acc;
    }, 0);

  const getHightSumBorder = (payments: IPayment[]): number =>
    Math.floor(
      payments.reduce<number>((acc, prev) => (acc += prev.interest), 0) +
        payments[0].paymentAmount
    );

  const handleCalculate = (
    event: MouseEvent<HTMLDivElement>,
    sumValue: string,
    percent: string,
    term: string
  ): void => {
    event.preventDefault();

    !isLoading &&
      triggerCalculate({
        amount: +sumValue.replace(" ₽", "").split(" ").join(""),
        interestRate: +percent.replace(" %", ""),
        termInMonth: +transformRate(term),
      });
  };

  useEffect(() => {
    if (!isSuccess && isError) {
      handleError(error)?.status === 400 &&
        dispatch(
          toggleAlert({
            isAlert: true,
            isAuthAlert: false,
            alertText: "Некорректные данные!",
          })
        );
    }

    if (isSuccess && !isError) {
      const responseData = data as ILoan;

      setTableData(responseData.payment.paymentDetails);
      setMonthSum(
        `${responseData.payment.paymentDetails[0].principal}`
          .split(".")
          .map((elem, key) =>
            key === 0
              ? elem
                  .split("")
                  .reverse()
                  .map((char, index) => {
                    return (index + 1) % 3 === 0 ? ` ${char}` : char;
                  })
                  .reverse()
              : `.${elem}`
          )
          .flat(1)
          .join("") + " ₽"
      );

      dispatch(
        setHightBorderSum(
          getHightSumBorder(responseData.payment.paymentDetails)
        )
      );
    }
  }, [isSuccess, isError, error, data]);

  useEffect(() => {
    !hightBorderSum &&
      triggerCalculate({ amount: 100000, interestRate: 13, termInMonth: 6 });
  }, []);

  useEffect(() => {
    if (location.pathname === "/")
      triggerCalculate({ amount: 100000, interestRate: 13, termInMonth: 6 });
  }, [location]);

  return (
    <main className="main-page">
      <header className="main-header">
        <div className="main-title">
          <h1>Кредитный калькулятор Т1</h1>
        </div>
        <div className="main-description">
          <p>
            Наш продукт - это кредитный трекер открытых позиций и калькулятор,
            для физических лиц. Приложение рассчитывает графики платежей по
            кредиту, и сохраняет их для авторизованных пользователей. Данные
            можно посмотреть в личном кабинете приложения, или получить в виде
            JSON, отправив запрос с другого сервиса. Мы имеем частично открытое
            api, предоставляющее возможность любому желающему интегрировать наш
            сервис в свое приложение.
          </p>
        </div>
      </header>
      <Calculator
        handleCalculate={handleCalculate}
        isLoading={isLoading}
        monthSum={monthSum}
        setMonthSum={setMonthSum}
      />
      <PaymentChart chartData={data?.payment?.paymentDetails as IPayment[]} />

      <div>
        <PaymentSchedule tableData={tableData} />
      </div>
    </main>
  );
};

export default MainPage;
