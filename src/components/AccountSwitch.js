import NavbarLink from "./NavbarLink";
import {useLocation} from 'react-router-dom';

import {useState} from 'react';

function AccountSwitch(){

    const {pathname} = useLocation();
    const highlightUser = pathname.includes("/my-account/user/");
    const highlightGuide = pathname.includes("/my-account/guide");
    const highlightMessages = pathname.includes("/my-account/messages");

    console.log(highlightGuide);
    return(
      <div className="accountSwitch">
          <NavbarLink
              name="Użytkownik"
              path="/my-account/user/user-data"
              highlight={highlightUser}
          />
          <NavbarLink
              name="Przewodnik"
              path="/my-account/guide/guide-profile"
              highlight={highlightGuide}
          />
          <NavbarLink
              name="Wiadomości"
              path="/my-account/messages"
              highlight={highlightMessages}
          />
      </div>
    );
}

export default AccountSwitch;