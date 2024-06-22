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
function NavBar({isAdmin,setIsAdmin,authControl,setAuthControl}) {
  const [isClicked, setIsClicked] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(null);
  const location = useLocation();
  const { cart } = useCart();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownMenu &&
        !event.target.closest(".dropdown-menu") &&
        !event.target.closest(".my-icon")
      ) {
        setDropdownMenu(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
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
          <div className="my-mobile" onClick={()=> {handleClick(); setDropdownMenu(null);}}>
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
                  Kadın{" "}<i className={dropdownMenu === "woman"?"fa-solid fa-caret-down links-hover active":"fa-solid fa-caret-down"}></i>
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
                  Erkek{" "}<i className={dropdownMenu === "man"?"fa-solid fa-caret-down links-hover active":"fa-solid fa-caret-down"}></i>
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
                  Çocuk{" "}<i className={dropdownMenu === "child"?"fa-solid fa-caret-down links-hover active":"fa-solid fa-caret-down"}></i>
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
                  Aksesuar{" "}<i className={dropdownMenu === "accessory"?"fa-solid fa-caret-down links-hover active":"fa-solid fa-caret-down"}></i>
                </span>
              </NavLink>
              
            </li>
          </ul>
          <ul className="my-icons-ul">
            <li>
              <NavLink to="/search" onClick={()=> {handleClick(); setDropdownMenu(null);}}>
                <span className="my-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={()=> {handleClick(); setDropdownMenu(null);}}>
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
          <li>
            <NavLink to="/kadin/pantolon">Pantolon</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/mont">Mont</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/bluz">Bluz</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/ceket">Ceket</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/etek">Etek</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/kazak">Kazak</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/tesettur">Tesettür</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/buyuk-beden">Büyük Beden</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/sweatshirt">Sweatshirt</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/kaban">Kaban</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/hirka">Hırka</NavLink>
          </li>
          <li>
            <NavLink to="/kadin/ayakkabi">Ayakkabı</NavLink>
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
            <NavLink to="/erkek/sort">Şort</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/gomlek">Gömlek</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/esofman">Eşofman</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/pantolon">Pantolon</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/ceket">Ceket</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/yelek">Yelek</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/kazak">Kazak</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/mont">Mont</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/takim-elbise">Takım Elbise</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/sweatshirt">Sweatshirt</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/kaban">Kaban</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/hirka">Hırka</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/blazer">Blazer</NavLink>
          </li>
          <li>
            <NavLink to="/erkek/ayakkabı">Ayakkabı</NavLink>
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
            <NavLink to="/cocuk/bebek">Bebek</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/ic-giyim">İç Giyim</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/tisort">Tişört</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/sort">Şort</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/sweatshirt">Sweatshirt</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/elbise">Elbise</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/gömlek">Gömlek</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/pantolon">Pantolon</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/esofman">Eşofman</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/mont">Mont</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/ceket">Ceket</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/hirka">Hırka</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/takim-elbise">Takım Elbise</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/kazak">Kazak</NavLink>
          </li>
          <li>
            <NavLink to="/cocuk/ayakkabi">Ayakkabı</NavLink>
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
            <NavLink to="/aksesuar/canta">Çanta</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/parfum">Parfüm</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/taki">Takı</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/basortusu">Başörtüsü</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/gunes-gozlugu">Güneş Gözlüğü</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/saat">Saat</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/cuzdan">Cüzdan</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/valiz">Valiz</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/kemer">Kemer</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/kravat">Kıravat</NavLink>
          </li>
          <li>
            <NavLink to="/aksesuar/sapka">Şapka</NavLink>
          </li>
        </ul>
      </div>

      <div
        className={
          dropdownMenu === "profile"
            ? "profile-dropdown-menu active"
            : "profile-dropdown-menu"
        }
      >
        <ul>
    {authControl ? "" : (<li>
      <NavLink to="/register" onClick={handleClick}>
        <FontAwesomeIcon icon={faImagePortrait} /> Kayıt Ol
      </NavLink>
    </li>)}
    {authControl ? (
      <li onClick={() =>{
       setAuthControl(false)
       setIsAdmin(false) }}>
        <NavLink to="/login" onClick={handleClick}>

        <FontAwesomeIcon icon={faRightToBracket} /> Çıkış Yap
        </NavLink>
      </li>
    ) : (
      <li>
        <NavLink to="/login" onClick={handleClick}>
          <FontAwesomeIcon icon={faRightToBracket} /> Giriş Yap
        </NavLink>
      </li>
    )}
    {authControl ? isAdmin ? (<li>
      <NavLink to="/admin" onClick={handleClick}>
      <FontAwesomeIcon icon={faUser} /> Admin
      </NavLink>
    </li>) :(<li>
      <NavLink to="/account" onClick={handleClick}>
      <FontAwesomeIcon icon={faUser} /> Hesabım
      </NavLink>
    </li>): null}
  </ul>
      </div>
    </>
  );
}
export default NavBar;
