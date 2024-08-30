import { FC, useState, useEffect } from "react";

import Card from "../card/Card";

import "./CardWrapper.scss";

const cardData = [
  {
    count: 1,
    amount: 4000000,
    termInMonth: 5,
    monthlyPayment: 12,
  },

  { count: 2, amount: 10000, termInMonth: 73, monthlyPayment: 18 },

  { count: 3, amount: 50000, termInMonth: 23, monthlyPayment: 10 },

  { count: 4, amount: 850000, termInMonth: 7, monthlyPayment: 5 },

  { count: 5, amount: 40000, termInMonth: 5, monthlyPayment: 8 },

  { count: 6, amount: 320000, termInMonth: 12, monthlyPayment: 5 },

  // { count: 7, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },

  // { count: 8, amount: 4000000, termInMonth: 2, monthlyPayment: 12 },
];

const CardWrapper: FC = () => {
  const [smallSize, setSmallSize] = useState<boolean>(false);

  const [cards, setCards] = useState<any[]>([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 660) setSmallSize(true);

      if (window.innerWidth > 660 && smallSize) setSmallSize(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect(() => {
  //   setCards(JSON.parse(localStorage.getItem("cards") || "") ?? []);
  // }, []);

  return (
    <div className={cards.length > 6 ? "card-wrapper long" : "card-wrapper"}>
      <div className="card-wrapper-left">
        {cardData.map((card, index) => {
          if (index % 2 === 0) {
            return (
              <Card
                key={index + 1}
                count={card.count}
                amount={card.amount}
                termInMonth={card.termInMonth}
                monthlyPayment={card.monthlyPayment}
                delay={index < 6 ? (index === 0 ? 100 : (index / 2) * 150) : 0}
                isLeft={true}
              />
            );
          }

          if (index % 2 !== 0 && smallSize) {
            return (
              <Card
                key={index + 1}
                count={card.count}
                amount={card.amount}
                termInMonth={card.termInMonth}
                monthlyPayment={card.monthlyPayment}
                delay={
                  index < 6
                    ? index === 1
                      ? 100
                      : Math.ceil(index / 2) * 150
                    : 0
                }
                isLeft={false}
              />
            );
          }
        })}
      </div>
      <div className="card-wrapper-right">
        {!smallSize &&
          cardData.map((card, index) => {
            if (index % 2 !== 0) {
              return (
                <Card
                  key={index + 1}
                  count={card.count}
                  amount={card.amount}
                  termInMonth={card.termInMonth}
                  monthlyPayment={card.monthlyPayment}
                  delay={
                    index < 6
                      ? index === 1
                        ? 100
                        : Math.ceil(index / 2) * 150
                      : 0
                  }
                  isLeft={false}
                />
              );
            }
          })}
      </div>
    </div>
  );
};

export default CardWrapper;
