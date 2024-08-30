import { FC, MouseEvent } from "react";

import "./FormButton.scss";

export interface IFormButton {
  buttonText: string;
  isLoading?: boolean;
  functionButton?: () => void;
}

const FormButton: FC<IFormButton> = ({
  buttonText,
  isLoading,
  functionButton,
}) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    functionButton && functionButton();
  };

  return (
    <div className="form-button" onClick={handleClick}>
      <p className="form-button-text">
        {isLoading ? <span className="spinner"></span> : buttonText}
      </p>
    </div>
  );
};

export default FormButton;
