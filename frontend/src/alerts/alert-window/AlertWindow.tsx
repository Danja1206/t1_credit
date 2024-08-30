import { FC, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../store";
import { toggleAlert } from "../../store/features/alertSlice";

import "./AlertWindow.scss";

const AlertWindow: FC = () => {
  const dispatch = useDispatch();

  const { alertText, isAlert } = useSelector(
    (state: RootType) => state.alertSlice
  );

  useEffect(() => {
    if (isAlert) {
      setTimeout(() => {
        dispatch(toggleAlert({ isAlert: false, isAuthAlert: false }));
      }, 2000);
    }
  }, [isAlert]);

  return (
    <div className={isAlert ? "alert-window alert" : "alert-window"}>
      <p>{alertText}</p>
    </div>
  );
};

export default AlertWindow;
