import { FC } from "react";

import { toggleDeleteWind } from "../../store/features/alertSlice";
import { RootType } from "../../store";
import { useSelector, useDispatch } from "react-redux";
import { toggleWrapper } from "../../store/features/gWrapperslice";

import LeaveCross from "../../components/UI/leave-cross/LeaveCross";

import "./ConfigWindow.scss";

const ConfigWindow: FC = () => {
  const dispatch = useDispatch();

  const { isDeleteWind } = useSelector((state: RootType) => state.alertSlice);

  const handleLeave = (): void => {
    dispatch(toggleDeleteWind(false));
    dispatch(toggleWrapper(false));
  };

  const handleConfig = (): void => {
    handleLeave();
  };

  return (
    <div className={isDeleteWind ? "config-window visible" : "config-window"}>
      <LeaveCross handleLeave={handleLeave} />

      <div className="config-title">
        <p>Вы уверены, что хотите удалить?</p>
      </div>

      <div className="config-button-wrapper">
        <div className="config-button" onClick={handleConfig}>
          <p>подтвердить</p>
        </div>
      </div>
    </div>
  );
};

export default ConfigWindow;
