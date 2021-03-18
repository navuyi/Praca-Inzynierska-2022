import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import UserAccount from "./UserAccount";
import GuideAccount from "./GuideAccount";
import {Route} from 'react-router-dom';
import AccountSwitch from "../components/AccountSwitch";

function MyAccount(){
    return(
        <div className="myAccount">
            <Navbar />
            <AccountSwitch />
            <div className="my-account-content">
                <Route path="/my-account/user">
                    <UserAccount />
                </Route>
                <Route path="/my-account/guide">
                    <GuideAccount />
                </Route>
            </div>
            <Footer />
        </div>
    )
}

export default MyAccount;