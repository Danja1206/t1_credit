import { FC } from "react";

import CardWrapper from "../../components/card-wrapper/CardWrapper";
import FormsWrapper from "../../components/user-forms/forms-wrapper/FormsWrapper";

import { useSelector } from "react-redux";
import { RootType } from "../../store";

import "./PersonalAccount.scss";

const PersonalAccount: FC = () => {
  const { isAuth } = useSelector((state: RootType) => state.userSlice);

  return (
    <section className="personal-account">
      {isAuth ? (
        <div className="my-credits">
          <div className="my-credits-header">
            <div>
              <h3>Личный кабинет</h3>
            </div>

            <p className="user-name">{localStorage.getItem("email") || ""}</p>
          </div>

          <div className="my-credits-body">
            <p>
              В данном разделе будут отображаться ваши кредиты. При
              необходимости вы можете их удалить либо отредактировать.
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
      {isAuth ? <CardWrapper /> : <FormsWrapper />}
    </section>
  );
};

export default PersonalAccount;
