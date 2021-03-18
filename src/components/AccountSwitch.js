import NavbarLink from "./NavbarLink";
import informations from "../images/information.png";

import {useState} from 'react';

function AccountSwitch(){
    return(
      <div className="accountSwitch">
          <NavbarLink
              name="Użytkownik"
              path="/my-account/user"
          />
          <NavbarLink
              name="Przewodnik"
              path="/my-account/guide"
          />
      </div>
    );
}

export default AccountSwitch;