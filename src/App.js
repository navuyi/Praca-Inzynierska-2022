// Dependencies
import {Switch, Route} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import ProtectedRoute from "./components/ProtectedRoute";
import GuideOnlyRoute from "./components/GuideOnlyRoute";
import {useEffect, useState} from "react";
import {set_as_guide} from "./redux/actions";
import {set_as_user} from "./redux/actions";
import {login} from "./redux/actions";
import {CircularProgress} from "@material-ui/core";

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
import GuideOfferDetails from "./pages/guide/GuideOfferDetails";

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
import './styles/guideNewTourSuccess.css'
import './styles/guideActiveOffers.css'


import GuideNewTourSuccess from "./pages/guide/GuideNewTourSuccess";


function App() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const access_token = localStorage.getItem("access_token")
        const is_guide = localStorage.getItem("is_guide")
        if(access_token){
            dispatch(login("LOGIN"))
            if(is_guide == 1){
                dispatch(set_as_guide("SET_AS_GUIDE"))
            }else if(is_guide==0){
                dispatch(set_as_user("SET_AS_USER"))
            }
        }
        setLoading(false)
    }, [])

    const style = {
        width: "5vw",
        height: "5vw",
        top: "45vh",
        left: "48vw",
        position:"absolute",
    }

    return (
    loading ? <CircularProgress style={style}/> :
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

        <GuideOnlyRoute path="/guide/offer/details/active" component={GuideOfferDetails}/>

        <ProtectedRoute path="/account/user" component={User} />

        <ProtectedRoute path="/account/messages" component={Messages}/>

        <Route exact path={"/new-tour-success"}>
            <GuideNewTourSuccess />
        </Route>

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
