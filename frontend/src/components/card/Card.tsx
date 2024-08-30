import { FC, useState, useEffect } from "react";

import {
  toggleDeleteWind,
  togglePayment,
} from "../../store/features/alertSlice";
import { useDispatch } from "react-redux";
import { toggleWrapper } from "../../store/features/gWrapperslice";

import edit from "../../assets/ui/edit.webp";
import drop from "../../assets/ui/drop.webp";

import "./Card.scss";

export interface ICard {
  count: number;
  amount: number;
  termInMonth: number;
  monthlyPayment: number;
  delay: number;
  isLeft: boolean;
}

const Card: FC<ICard> = ({
  count,
  amount,
  termInMonth,
  monthlyPayment,
  delay,
  isLeft,
}) => {
  const dispatch = useDispatch();

  const [isMove, setIsMove] = useState<boolean>(false);

  useEffect(() => {
    if (!delay) return setIsMove(true);

    if (delay)
      setTimeout(() => {
        setIsMove(true);
      }, delay);
  }, [delay]);

  return (
    <div
      className={
        isLeft
          ? isMove
            ? "card-left move"
            : "card-left"
          : isMove
          ? "card-right move"
          : "card-right"
      }
    >
      <div className="card-head">
        <div className="card-head-text">
          <div className="card-count">
            <p>{count}.</p>
          </div>

          <div className="card-mounthly">
            <p>Под {monthlyPayment} %.</p>
          </div>
          <div className="card-term">
            <p>На {termInMonth} месяца.</p>
          </div>
        </div>
      </div>

      <div className="card-body">
        <div className="card-amount">
          <p>Кредит на сумму {amount / 1000} тыс. ₽</p>
        </div>
      </div>

      <div className="card-item-wrapper">
        <div className="card-edit">
          <img
            src={edit}
            alt="#"
            onClick={() => {
              dispatch(toggleWrapper(true));
              dispatch(togglePayment(true));
            }}
          />
        </div>
        <div
          className="card-drop"
          onClick={() => {
            dispatch(toggleWrapper(true));
            dispatch(toggleDeleteWind(true));
          }}
        >
          <img src={drop} alt="#" />
        </div>
      </div>
    </div>
  );
};

export default Card;
