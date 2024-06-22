import { NavLink, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlass,
  faUser,
  faHeart,
  faBars,
  faXmark,
  faRightToBracket,
  faImagePortrait,
  faHandFist,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "./CartContext";
import logo1 from "/img/logo1.png";

function NavBar({isAdmin, setIsAdmin, authControl, setAuthControl}) {
  const [isClicked, setIsClicked] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(null);
  const location = useLocation();
  const { cart } = useCart();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isClicked && !event.target.closest(".my-navbar")) {
        setIsClicked(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isClicked]);

  useEffect(() => {
    const handleDropdownClickOutside = (event) => {
      if (
        dropdownMenu &&
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".my-icon")
      ) {
        setDropdownMenu(null);
      }
    };

    document.addEventListener("click", handleDropdownClickOutside);

    return () => {
      document.removeEventListener("click", handleDropdownClickOutside);
    };
  }, [dropdownMenu]);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const onMouseEnter = (category) => {
    if (window.innerWidth < 769) {
      setDropdownMenu(null);
    } else {
      setDropdownMenu(category);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 769) {
      setDropdownMenu(null);
    } else {
      setDropdownMenu(null);
    }
  };

  const totalQuantity = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  return (
    <>
      <div className="my-navbar">
        <div className="my-logo-and-bar">
          <NavLink to="/" onClick={handleClick}>
            <div className="my-logo">
              <img src={logo1} alt="" />
            </div>
          </NavLink>
          <div className="my-mobile" onClick={() => {handleClick(); setDropdownMenu(null);}}>
            {isClicked ? (
              <span className="my-icon">
                <FontAwesomeIcon icon={faXmark} />
              </span>
            ) : (
              <span className="my-icon">
                <FontAwesomeIcon icon={faBars} />
              </span>
            )}
          </div>
        </div>
        <div className={isClicked ? "my-links active" : "my-links"}>
          <ul className="my-links-ul">
            <li>
              <NavLink to="/" onClick={handleClick}>
                <span
                  className={
                    location.pathname === "/"
                      ? "links-hover active"
                      : "links-hover"
                  }
                >
                  Anasayfa
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/indirim" onClick={handleClick}>
                <span
                  className={
                    location.pathname === "/indirim"
                      ? "links-hover active"
                      : "links-hover"
                  }
                >
                  İndirim
                </span>
              </NavLink>
            </li>
            <li
              onMouseEnter={() => onMouseEnter("woman")}
              onMouseLeave={onMouseLeave}
              className="my-padding"
            >
              <NavLink to="/kadin" onClick={handleClick}>
                <span
                  className={
                    location.pathname === "/kadin" || dropdownMenu === "woman"
                      ? "links-hover active"
                      : "links-hover"
                  }
                >
                  Kadın{" "}<i className={`fa-solid fa-caret-down ${dropdownMenu === "woman" ? "links-hover active" : ""} mobile-hide-icon`}></i>
                </span>
              </NavLink>
            </li>
            <li
              onMouseEnter={() => onMouseEnter("man")}
              onMouseLeave={onMouseLeave}
              className="my-padding"
            >
              <NavLink to="/erkek" onClick={handleClick}>
                <span
                  className={
                    location.pathname === "/erkek" || dropdownMenu === "man"
                      ? "links-hover active"
                      : "links-hover"
                  }
                >
                  Erkek{" "}<i className={`fa-solid fa-caret-down ${dropdownMenu === "man" ? "links-hover active" : ""} mobile-hide-icon`}></i>
                </span>
              </NavLink>
            </li>
            <li
              onMouseEnter={() => onMouseEnter("child")}
              onMouseLeave={onMouseLeave}
              className="my-padding"
            >
              <NavLink to="/cocuk" onClick={handleClick}>
                <span
                  className={
                    location.pathname === "/cocuk" || dropdownMenu === "child"
                      ? "links-hover active"
                      : "links-hover"
                  }
                >
                  Çocuk{" "}<i className={`fa-solid fa-caret-down ${dropdownMenu === "child" ? "links-hover active" : ""} mobile-hide-icon`}></i>
                </span>
              </NavLink>
            </li>
            <li
              onMouseEnter={() => onMouseEnter("accessory")}
              onMouseLeave={onMouseLeave}
              className="my-padding"
            >
              <NavLink to="/aksesuar" onClick={handleClick}>
                <span
                  className={
                    location.pathname === "/aksesuar" ||
                    dropdownMenu === "accessory"
                      ? "links-hover active"
                      : "links-hover"
                  }
                >
                  Aksesuar{" "}<i className={`fa-solid fa-caret-down ${dropdownMenu === "accessory" ? "links-hover active" : ""} mobile-hide-icon`}></i>
                </span>
              </NavLink>
            </li>
          </ul>
          <ul className="my-icons-ul">
            <li>
              <NavLink to="/search" onClick={() => {handleClick(); setDropdownMenu(null);}}>
                <span className="my-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={() => {handleClick(); setDropdownMenu(null);}}>
                <span className="my-icon">
                  <FontAwesomeIcon icon={faCartShopping} />
                  {totalQuantity > 0 && (
                    <span className="cart-quantity">{totalQuantity}</span>
                  )}
                </span>
              </NavLink>
            </li>
            <li>
              <span
                onClick={() =>
                  dropdownMenu === "profile"
                    ? setDropdownMenu(null)
                    : setDropdownMenu("profile")
                }
                className="my-icon"
              >
                {" "}
                <FontAwesomeIcon icon={faUser} />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div
        onMouseEnter={() => onMouseEnter("woman")}
        onMouseLeave={onMouseLeave}
        className={
          dropdownMenu === "woman"
            ? "woman-dropdown-menu active"
            : "woman-dropdown-menu"
        }
      >
        <ul>
          <li>
            <NavLink to="/kadin/ic-giyim">İç Giyim</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/elbise">Elbise</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/tisort">Tişört</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/gomlek">Gömlek</NavLink>
          </li>
        </ul>
      </div>

      <div
        onMouseEnter={() => onMouseEnter("man")}
        onMouseLeave={onMouseLeave}
        className={
          dropdownMenu === "man"
            ? "man-dropdown-menu active"
            : "man-dropdown-menu"
        }
      >
        <ul>
          <li>
            <NavLink to="/erkek/ic-giyim">İç Giyim</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/tisort">Tişört</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/gomlek">Gömlek</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/pantolon">Pantolon</NavLink>
          </li>
        </ul>
      </div>

      <div
        onMouseEnter={() => onMouseEnter("child")}
        onMouseLeave={onMouseLeave}
        className={
          dropdownMenu === "child"
            ? "child-dropdown-menu active"
            : "child-dropdown-menu"
        }
      >
        <ul>
          <li>
            <NavLink to="/cocuk/ic-giyim">İç Giyim</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/tisort">Tişört</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/gomlek">Gömlek</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/pantolon">Pantolon</NavLink>
          </li>
        </ul>
      </div>

      <div
        onMouseEnter={() => onMouseEnter("accessory")}
        onMouseLeave={onMouseLeave}
        className={
          dropdownMenu === "accessory"
            ? "accessory-dropdown-menu active"
            : "accessory-dropdown-menu"
        }
      >
        <ul>
          <li>
            <NavLink to="/aksesuar/cuzdan">Cüzdan</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/canta">Çanta</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/ayakkabi">Ayakkabı</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/sapka">Şapka</NavLink>
          </li>
        </ul>
      </div>

      <div
        onMouseEnter={() => onMouseEnter("profile")}
        onMouseLeave={onMouseLeave}
        className={
          dropdownMenu === "profile"
            ? "profile-dropdown-menu active"
            : "profile-dropdown-menu"
        }
      >
        <ul>
          {!authControl ? (
            <>
              <li>
                <NavLink to="/login">
                  Giriş Yap <FontAwesomeIcon icon={faRightToBracket} />
                </NavLink>
              </li>
              <li>
                <NavLink to="/signup">
                  Kayıt Ol <FontAwesomeIcon icon={faImagePortrait} />
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/account">
                  Hesabım <FontAwesomeIcon icon={faUser} />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  onClick={() => {
                    setAuthControl(false);
                    setIsAdmin(false);
                  }}
                >
                  Çıkış Yap <FontAwesomeIcon icon={faHandFist} />
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}

export default NavBar;
