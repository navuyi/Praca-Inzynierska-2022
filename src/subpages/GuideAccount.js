import AccountNavbar from "../components/AccountNavbar";
import NavbarLink from "../components/NavbarLink";
import Footer from "../components/Footer";

import GuideNewTour from "./guideSubpages/GuideNewTour";
import GuideOffers from "./guideSubpages/GuideOffers";
import GuideProfile from "./guideSubpages/GuideProfile";

import {Switch, Route} from "react-router-dom";

function GuideAccount(){
    return(
        <div className="guideAccount">
            <div className="col col-1">
                <AccountNavbar title="Menu przewodnika">
                    <NavbarLink
                        name="Nowa wycieczka"
                        path="/my-account/guide/guide-new-tour"
                    />
                    <NavbarLink
                        name="Moje oferty"
                        path="/my-account/guide/guide-offers"
                    />
                    <NavbarLink
                        name="Profil"
                        path="/my-account/guide/guide-profile"
                    />
                </AccountNavbar>
            </div>
            <div className="col col-2">
                <Switch>
                    <Route path={"/my-account/guide/guide-new-tour"} >
                        <GuideNewTour />
                    </Route>
                    <Route path={"/my-account/guide/guide-offers"} >
                        <GuideOffers />
                    </Route>
                    <Route path={"/my-account/guide/guide-profile"} >
                        <GuideProfile />
                    </Route>
                </Switch>
            </div>
            <div className="col col-1">
                zapasowa kolumna - mozliwe ze panel na odbieranie wiadomosci
            </div>
        </div>
    )
}

export default GuideAccount;