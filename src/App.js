// Dependencies
import {Switch, Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
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



function App() {

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
        <Route exact path="/account">
            <Account />
        </Route>
        <Route  path="/account/guide">
            <Guide />
        </Route>
        <Route  path="/account/user">
            <User />
        </Route>
        <Route  path="/account/messages">
            <Messages />
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
