import {
  FC,
  MouseEvent,
  ChangeEvent,
  useRef,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from "react";

import { useDispatch } from "react-redux";
import { toggleAlert } from "../../../store/features/alertSlice";

import "./RangeInput.scss";

export interface IRangeInput {
  rangeText: string;
  preId: string;
  min: string;
  max: string;
  defaultValue?: string;
  pointBegin: string;
  pointMedium: string;
  pointEnd: string;
  isDate: boolean;
  externalValue: string;
  setExternalValue: Dispatch<SetStateAction<string>>;
}

const RangeInput: FC<IRangeInput> = ({
  rangeText,
  preId,
  min,
  max,
  defaultValue,
  pointBegin,
  pointMedium,
  pointEnd,
  isDate,
  externalValue,
  setExternalValue,
}) => {
  const dispatch = useDispatch();

  const rangeRef = useRef<HTMLInputElement>(null);

  const [rangeValue, setRangeValue] = useState<number>(0);
  const [isAlert, setIsAlert] = useState<boolean>(false);

  const handleBlur = (isSum: boolean) => {
    if (!isSum) {
      let _current: number;

      if (externalValue.match(/[годлт]/gi)) {
        let res = 0;
        let chars = externalValue.split(" ");

        for (let i = 0; i < chars.length; i++) {
          if (chars[i] === "год" || chars[i] === "года" || chars[i] === "лет") {
            res += +chars[i - 1] * 12;
          }

          if (chars[i] === "месяцев") res += +chars[i - 1];
        }

        _current = res;
      } else {
        _current = Number(
          externalValue.replace(" мес.", "").split(" ").join("")
        );
      }

      _current! < 6
        ? setExternalValue("6 месяцев")
        : setExternalValue(`${_current!} месяцев`);
    }

    if (isSum) {
      let _current = Number(
        externalValue.replace(" ₽", "").split(" ").join("")
      );

      _current < 100000 && setExternalValue("100 000 ₽");
    }
  };

  const setCoordX = (coordX: number) => {
    if (rangeRef.current) {
      rangeRef.current.style.background = `linear-gradient(90deg, #00aae6 ${coordX}%, #fff ${coordX}%)`;

      return setRangeValue(coordX);
    }
  };

  const skipRuble = (event: MouseEvent<HTMLInputElement>): void => {
    const input = event.target as HTMLInputElement;
    const startPosition = input.selectionStart || 0;

    if (isDate) {
      if (/^\d+\s*мес\./.test(input.value))
        return input.setSelectionRange(
          input.value.length - 5,
          input.value.length - 5
        );

      let months = input.value
        .split(" ")
        .reduce<number>((acc, char, index, arr) => {
          if (char === "месяцев") return (acc += Number(arr[index - 1]));

          if (char === "год" || char === "года" || char === "лет")
            acc += Number(arr[index - 1]) * 12;

          return acc;
        }, 0);

      setExternalValue(`${months} мес.`);

      if (externalValue) {
        setTimeout(
          () =>
            input.setSelectionRange(
              `${months} мес.`.length - 5,
              `${months} мес.`.length - 5
            ),
          0
        );

        return;
      }
    }

    if (!isDate) {
      const needPosition = input.value.replace("₽", "");

      if (startPosition && startPosition > needPosition.length)
        input.setSelectionRange(
          needPosition.length - 1,
          needPosition.length - 1
        );
    }
  };

  const handleValueInput = (
    event: ChangeEvent<HTMLInputElement>,
    isRange: boolean
  ) => {
    if (!isRange) {
      const input = event.target as HTMLInputElement;
      const currentPosition = input.selectionStart || 0;

      if (!isDate) {
        let needPosition = event.target.value.replace(/₽/gi, "");

        let currentValue: number;

        let inputValue: string = needPosition
          .split(" ")
          .map((char) => char.trim())
          .join("");

        if (!/^[0-9]*$/.test(inputValue)) {
          dispatch(
            toggleAlert({
              isAlert: true,
              isAuthAlert: false,
              alertText: "Вводите только числа!",
            })
          );

          return setIsAlert(true);
        }

        currentValue = Number(inputValue);

        let coordX =
          currentValue <= 100000
            ? 0
            : currentValue > 40000000
            ? 40000000
            : Math.ceil(currentValue / 400000);

        setCoordX(coordX);

        const result = `${currentValue > 40000000 ? 40000000 : currentValue}`
          .split("")
          .reverse()
          .map((char, id) => (id % 3 === 0 ? `${char} ` : char))
          .reverse()
          .join("");

        setExternalValue(result + "₽");

        if (currentPosition > needPosition.length)
          return setTimeout(
            () =>
              input.setSelectionRange(
                needPosition.length - 1,
                needPosition.length - 1
              ),
            0
          );

        if (currentPosition < needPosition.length)
          return setTimeout(
            () => input.setSelectionRange(currentPosition, currentPosition),
            0
          );
      }

      if (isDate) {
        if (
          currentPosition === input.value.length ||
          currentPosition === input.value.length - 4
        )
          return;

        let inputValue: string = input.value.replace("мес.", "").trim();

        inputValue = inputValue ? inputValue : "0";

        if (!/^[0-9]*$/.test(inputValue)) {
          dispatch(
            toggleAlert({
              isAlert: true,
              isAuthAlert: false,
              alertText: "Вводите только числа!",
            })
          );

          return setIsAlert(true);
        }

        let currentValue: number = Number(inputValue);

        let coordX =
          Math.ceil(currentValue / 0.78) - 6 >= 100
            ? 100
            : Math.ceil(currentValue / 0.78) - 6;

        setCoordX(coordX);

        setExternalValue(`${currentValue > 84 ? 84 : currentValue} мес.`);

        setTimeout(
          () =>
            input.setSelectionRange(
              `${currentValue} мес.`.length - 5,
              `${currentValue} мес.`.length - 5
            ),
          0
        );
      }
    }

    if (isRange) {
      let coordX: number = Number(event.target.value);

      setCoordX(coordX);

      if (!isDate) {
        const result: string = `${coordX === 0 ? 100000 : coordX * 400000}`
          .split("")
          .reverse()
          .map((char, id) => (id % 3 === 0 ? `${char} ` : char))
          .reverse()
          .join("");

        return setExternalValue(result + "₽");
      }

      if (isDate) {
        if (coordX === 0) return setExternalValue("6 месяцев");

        let months: number | string = Math.ceil(coordX * 0.78) + 6;
        let years: number | string = Math.floor(months / 12);

        if (years === 0) {
          years = "";
          months = months + " месяцев";
        } else {
          months = months - years * 12;

          months = months === 0 ? "" : `${months} месяцев`;

          if (years === 1) years = `${years} год`;

          if (+years < 5 && +years > 1) years = `${years} года`;

          if (+years > 4 && +years <= 7) years = `${years} лет`;
        }

        return setExternalValue(`${years} ${months}`);
      }
    }
  };

  useEffect(() => {
    if (rangeValue && isAlert) return setIsAlert(false);
  }, [rangeValue]);

  return (
    <div className="range-input-wrapper">
      <input
        type="range"
        name="range-input"
        id={`range-input-${preId}`}
        className="range-input"
        min={min}
        max={max}
        value={rangeValue}
        onChange={(event) => handleValueInput(event, true)}
        ref={rangeRef}
      />
      <label htmlFor={`range-input-${preId}`}>{rangeText}</label>
      <div className="value-wrapper">
        <input
          type="text"
          className={isAlert ? "range-value alert" : "range-value"}
          value={externalValue}
          onClick={skipRuble}
          onChange={(event) => handleValueInput(event, false)}
          onBlur={() => handleBlur(isDate ? false : true)}
        />
      </div>
      <div className="input-points">
        <ul>
          <li className="point">{pointBegin}</li>
          <li className="point">{pointMedium}</li>
          <li className="point">{pointEnd}</li>
        </ul>
      </div>
    </div>
  );
};

export default RangeInput;
