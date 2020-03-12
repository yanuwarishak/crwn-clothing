import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selecCurrentUser } from "../../redux/user/user.selector";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import {
  HeaderDiv,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from "./header.styles";

const Header = ({ currentUser, hidden }) => (
  <HeaderDiv>
    <LogoContainer to="/">
      <Logo className="logo" />
    </LogoContainer>
    <OptionsContainer>
      <OptionLink to="/">HOME</OptionLink>
      <OptionLink to="/shop">SHOP</OptionLink>
      <OptionLink to="/shop">CONTACT</OptionLink>

      {//Membuat pilihan Sign in dan Sign Out di header
      //Apakah currentUser sebuah objek? kalau iya = true, kalau tidak = false
      currentUser ? (
        <OptionLink as="div" onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
      ) : (
        <OptionLink to="/signin">
          SIGN IN
        </OptionLink>
      )}
      <CartIcon />

      {hidden ? null : <CartDropdown />}
    </OptionsContainer>
  </HeaderDiv>
);

const mapStateToProps = createStructuredSelector({
  currentUser: selecCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
