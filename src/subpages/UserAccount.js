import AccountNavbar from "../components/AccountNavbar";
import NavbarLink from "../components/NavbarLink";
import Footer from "../components/Footer";

import {Switch, Route, useLocation} from 'react-router-dom';
import UserData from "./userSubpages/UserData";

import UserTourHistory from "./userSubpages/UserTourHistory";
import UserPaymentHistory from "./userSubpages/UserPaymentHistory";

function UserAccount(){

    return(
        <div className="userAccount">
            <div className="col col-1">
                <AccountNavbar title="Menu">
                    <NavbarLink
                        name="Historia wycieczek"
                        path="/my-account/user/user-tour-history"
                    />
                    <NavbarLink
                        name="Historia wpłat"
                        path="/my-account/user/user-payment-history"
                    />
                    <NavbarLink
                        name="Moja dane"
                        path="/my-account/user/user-data"
                    />
                </AccountNavbar>
            </div>
            <div className="col col-2">
                <Switch>
                    <Route path="/my-account/user/user-tour-history">
                        <UserTourHistory />
                    </Route>
                    <Route path="/my-account/user/user-payment-history">
                        <UserPaymentHistory />
                    </Route>
                    <Route path="/my-account/user/user-data">
                        <UserData />
                    </Route>
                </Switch>
            </div>
            <div className="col col-1">
                Zapasowa kolumna - możliwe ze na jakieś aktualności itp, powiadomienia o wiadomościach
            </div>
        </div>
    )
}

export default UserAccount;