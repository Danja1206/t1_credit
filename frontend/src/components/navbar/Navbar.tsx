import { FC, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "../../store";
import {
  toggleWrapper,
  toggleOpenMenu,
} from "../../store/features/gWrapperslice";

import {
  toggleDeleteWind,
  togglePayment,
} from "../../store/features/alertSlice";

import { logout } from "../../store/features/userSlice";
import { toggleAlert } from "../../store/features/alertSlice";

import "./Navbar.scss";

import logo from "../../assets/logo.webp";

const Navbar: FC = () => {
  const dispatch = useDispatch();

  const { isDeleteWind, isPayment } = useSelector(
    (state: RootType) => state.alertSlice
  );
  const { isAuthAlert } = useSelector((state: RootType) => state.alertSlice);
  const { isGlobal, isOpenMenu } = useSelector(
    (state: RootType) => state.gWrapperSlice
  );
  const { isAuth } = useSelector((state: RootType) => state.userSlice);

  const [isBorderNav, setIsBorderNav] = useState<boolean>(false);

  const handleScroll = () => {
    if (document.documentElement.scrollTop !== 0) return setIsBorderNav(true);

    return setIsBorderNav(false);
  };

  const handleBurger = (): void => {
    if (!isOpenMenu) {
      dispatch(toggleWrapper(true));
      dispatch(toggleOpenMenu(true));
      isDeleteWind && dispatch(toggleDeleteWind(false));
      isPayment && dispatch(togglePayment(false));
    }

    if (isOpenMenu) {
      dispatch(toggleWrapper(false));
      dispatch(toggleOpenMenu(false));
      isDeleteWind && dispatch(toggleDeleteWind(false));
      isPayment && dispatch(togglePayment(false));
    }
  };

  const handleItem = () => {
    isGlobal && dispatch(toggleWrapper(false));
    isOpenMenu && dispatch(toggleOpenMenu(false));
    isDeleteWind && dispatch(toggleDeleteWind(false));
    isPayment && dispatch(togglePayment(false));
  };

  const handleLogOut = (): void => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("cards");

    dispatch(logout());
    dispatch(
      toggleAlert({ isAlert: true, alertText: "Вы вышли!", isAuthAlert: false })
    );

    handleItem();
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={isBorderNav || isGlobal ? "navbar border" : "navbar"}>
      <div className="navbar-content-wrapper">
        <div className="logo-title" onClick={() => window.location.reload()}>
          <div className="logo-wrapper">
            <img src={logo} alt="#" />
          </div>
          <p>Кредитный калькулятор</p>
        </div>

        <div className={isOpenMenu ? "items-wrapper active" : "items-wrapper"}>
          <ul>
            <li className="nav-item" onClick={handleItem}>
              <Link to="/">главная</Link>
            </li>
            <li
              className={isAuthAlert ? "nav-item alert" : "nav-item"}
              onClick={handleItem}
            >
              <Link to="/account">личный кабинет</Link>
            </li>
            <li className="nav-item" onClick={handleItem}>
              <a
                href="https://shanty.gitbook.io/credit-tracker"
                target="_blanck"
              >
                для разработчиков
              </a>
            </li>
            {isAuth ? (
              <li className="nav-item-logout" onClick={handleLogOut}>
                выйти
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>

        <div
          className={
            isOpenMenu
              ? "burger active"
              : isAuthAlert
              ? "burger alert"
              : "burger"
          }
          onClick={handleBurger}
        >
          <span className="center-line"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
