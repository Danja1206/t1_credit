import { FC } from "react";

import "./LeaveCross.scss";

export interface ILeaveCross {
  handleLeave: () => void;
}

const LeaveCross: FC<ILeaveCross> = ({ handleLeave }) => {
  return (
    <div className="leave-config" onClick={handleLeave}>
      <span className="line-vertical"></span>
      <span className="line-horizontal"></span>
    </div>
  );
};

export default LeaveCross;
