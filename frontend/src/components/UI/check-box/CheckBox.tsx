import { FC, Dispatch, SetStateAction } from "react";

import "./CheckBox.scss";

export interface ICheckBox {
  isCheck: boolean;
  isAlert: boolean;
  setIsCheck: Dispatch<SetStateAction<boolean>>;
}

const CheckBox: FC<ICheckBox> = ({ isAlert, isCheck, setIsCheck }) => {
  return (
    <div
      className={isAlert ? "check-box alert" : "check-box"}
      onClick={() => setIsCheck((state) => !state)}
    >
      <div className={isCheck ? "mark-wrapper check" : "mark-wrapper"}>
        <span className="left-line"></span>
        <span className="right-line"></span>
      </div>
    </div>
  );
};

export default CheckBox;
