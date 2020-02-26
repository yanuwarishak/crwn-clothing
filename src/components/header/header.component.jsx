import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selecCurrentUser } from "../../redux/user/user.selector"

import { ReactComponent as Logo } from "../../assets/crown.svg";
import "./header.styles.scss";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/">
        HOME
      </Link>
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>

      {//Membuat pilihan Sign in dan Sign Out di header
      //Apakah currentUser sebuah objek? kalau iya = true, kalau tidak = false
      currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />

      {hidden ? null : <CartDropdown />}
    </div>
  </div>
);

const mapStateToProps = createStructuredSelector ({
  currentUser: selecCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
