// Dependencies
import {Switch, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ProtectedRoute from "./components/ProtectedRoute";
import GuideOnlyRoute from "./components/GuideOnlyRoute";
import {useEffect} from "react";
import {API_PREFIX} from "./config";
import axios from "axios";
// Pages
import Home from "./pages/Home";
import Information from "./pages/Informations";
import Tours from "./pages/tours/Tours";
import TourDetails from "./pages/tours/TourDetails";
import Account from "./pages/Account";
import Login from './pages/Login';
import Register from "./pages/Register";

import Guide from "./pages/guide/Guide";
import User from "./pages/user/User";
import Messages from "./pages/messages/Messages";

// Styles
import './App.css';
import './styles/navbarComponent.css';
import './styles/homeWelcomeView.css';
import './styles/homeTourPanel.css';
import './styles/home.css';
import './styles/homeInfoPanel.css';
import './styles/footer.css';
import './styles/sideNavbar.css';
import './styles/guideProfile.css';
import './styles/socialLink.css';
import './styles/guideNewTour.css';
import './styles/guideOffers.css';
import './styles/informations.css';
import './styles/tours.css';
import './styles/login.css';
import './styles/register.css';
import './styles/newMessage.css';
import './styles/oldMessages.css';
import './styles/sentMessages.css';
import './styles/deletedMessages.css';
import './styles/toursTourPanel.css';
import './styles/tourDetails.css';
import './styles/tourPanelLabel.css';

import {logout} from "./redux/actions";


function App() {
    useEffect(() => {
        const url = API_PREFIX + "/token/check"
        const access_token = localStorage.getItem("access_token")
        const refresh_token = localStorage.getItem("refresh_token")
        console.log(access_token)
        const config = {
            headers: {Authorization: `Bearer ${access_token}`}
        }

        axios.post(url, {
            access_token: access_token,
            refresh_token: refresh_token
        }, config)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

    return (
    <Switch>
        <Route exact path="/">
            <Home />
        </Route>
        <Route path="/information">
            <Information />
        </Route>
        <Route exact path="/tours">
            <Tours />
        </Route>
        <Route exact path={"/tours/tour"}>
            <TourDetails />
        </Route>

        <ProtectedRoute exact path="/account" component={Account}/>

        <GuideOnlyRoute path="/account/guide" component={Guide}/>

        <ProtectedRoute path="/account/user" component={User} />

        <ProtectedRoute path="/account/messages" component={Messages}/>


        <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register/>
        </Route>
    </Switch>
  );
}

export default App;
