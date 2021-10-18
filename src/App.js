// Dependencies
import {Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import ProtectedRoute from "./components/UtilityComponents/ProtectedRoute";
import GuideOnlyRoute from "./components/UtilityComponents/GuideOnlyRoute";
import {useEffect, useState} from "react";
import {login, set_as_guide, set_as_user} from "./redux/actions";
import {CircularProgress} from "@material-ui/core";

// Pages
import Home from "./pages/Home";
import Information from "./pages/Informations";
import Tours from "./pages/tours/Tours";
import TourDetails from "./pages/tours/TourDetails";
import TourDetailsRemade from "./pages/tours/TourDetailsRemade";
import Account from "./pages/Account";
import Login from './pages/Login';
import Register from "./pages/Register";
import RegisterConfirm from "./pages/RegisterConfirm";
import GuideNewTourSuccess from "./pages/guide/guide-new-tour/GuideNewTourSuccess";
import Guide from "./pages/guide/Guide";
import User from "./pages/user/User";
import Messages from "./pages/messages/Messages";
import GuideActiveOffer from "./pages/guide/guide-active-offer/GuideActiveOffer";
import Enrollment from "./pages/Enrollment";
import Settings from "./pages/settings/Settings"
import PaymentRevoked from "./pages/PaymentRevoked";
import PaymentSuccess from "./pages/PaymentSuccess";

// Styles
import './App.css'
import './styles/components-styling/navbarComponent.css'
import './styles/components-styling/homeWelcomeView.css'
import './styles/components-styling/homeTourPanel.css'
import './styles/pages-styling/home.css'
import './styles/components-styling/homeInfoPanel.css'
import './styles/components-styling/footer.css'
import './styles/components-styling/sideNavbar.css'
import './styles/pages-styling/guideProfile.css'
import './styles/components-styling/socialLink.css'
import './styles/pages-styling/guideNewTour.css'
import './styles/pages-styling/guideOffers.css'
import './styles/pages-styling/informations.css'
import './styles/pages-styling/tours.css'
import './styles/pages-styling/login.css'
import './styles/pages-styling/register.css'
import './styles/pages-styling/messages.css'
import './styles/pages-styling/guideActiveOfferModification.css'


import './styles/components-styling/toursTourPanel.css'
import './styles/pages-styling/tourDetails.css'
import './styles/components-styling/tourPanelLabel.css'
import './styles/pages-styling/guideNewTourSuccess.css'
import './styles/pages-styling/guideActiveOffers.css'
import "./styles/pages-styling/guideActiveOfferEnrollment.css"
import "./styles/components-styling/guideActiveOfferHeader.css"
import "./styles/pages-styling/guideActiveOfferMessages.css"
import "./styles/components-styling/messageBox.css"
import "./styles/components-styling/messenger.css"
import "./styles/components-styling/tourDetailsMessenger.css"
import "./styles/components-styling/notFoundIndicator.css"
import "./styles/pages-styling/enrollment.css"
import './styles/pages-styling/registerConfirm.css'
import "./styles/pages-styling/paymentRevoked.css"
import "./styles/pages-styling/paymentSuccess.css"
import "./styles/pages-styling/userEnrollments.css"
import "./styles/pages-styling/userEnrollmentHistory.css"
import "./styles/pages-styling/userPaymentHistory.css"
import "./styles/pages-styling/guideClosedOffers.css"
import "./styles/pages-styling/tourDetailsRemade.css"


function App() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const access_token = localStorage.getItem("access_token")
        const is_guide = localStorage.getItem("is_guide")
        if (access_token) {
            dispatch(login("LOGIN"))
            if (parseInt(is_guide) === 1) {
                dispatch(set_as_guide("SET_AS_GUIDE"))
            } else if (parseInt(is_guide) === 0) {
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
        position: "absolute",
    }

    return (
        loading ? <CircularProgress style={style}/> :
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="/information">
                    <Information/>
                </Route>
                <Route exact path="/tours">
                    <Tours/>
                </Route>
                <Route exact path={"/tours/tour/:tour_id"}>
                    <TourDetails/>
                </Route>
                <Route exact path={"/tours/tour/:tour_id/enrollment"}>
                    <Enrollment/>
                </Route>

                <GuideOnlyRoute path="/account/guide/active-offer/:tourID" component={GuideActiveOffer}/>
                <GuideOnlyRoute path="/account/guide" component={Guide}/>


                <ProtectedRoute exact path="/account" component={Account}/>
                <ProtectedRoute path="/account/user" component={User}/>
                <ProtectedRoute path="/account/messages" component={Messages}/>
                <ProtectedRoute path="/account/settings" component={Settings} />

                <Route exact path={"/new-tour-success"}>
                    <GuideNewTourSuccess/>
                </Route>

                <Route path="/login">
                    <Login/>
                </Route>
                <Route exact path="/register">
                    <Register/>
                </Route>
                <Route exact path={"/register/confirm/:token"}>
                    <RegisterConfirm />
                </Route>
                <Route exact path={"/payment/success"}>
                    <PaymentSuccess />
                </Route>
                <Route exact path={"/payment/revoked"}>
                    <PaymentRevoked />
                </Route>
            </Switch>
    );
}

export default App;
