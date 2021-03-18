import './App.css';
import {Switch, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect} from 'react';
// Components


// Subpages
import Home from "./subpages/Home";
import Login from "./subpages/Login";
import Informations from "./subpages/Informations";
import MyAccount from "./subpages/MyAccount";
// Styles
import './styles/navbar.css';
import './styles/imageSlider.css';
import './styles/home.css';
import './styles/homeInfoPane.css';
import './styles/footer.css';
import './styles/credentialInput.css';
import './styles/login.css';
import './styles/homeTourPanel.css';
import './styles/homeQuickSearch.css';
import './styles/accountSwitch.css';
import './styles/userAccount.css';
import './styles/accountNavbar.css';
import './styles/guideAccount.css';


function App() {
    const isLogged = useSelector(state=>state.authReducer);
    console.log(isLogged);

    return (
        <div className="content">
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/informations">
                    <Informations />
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
                <Route path="/my-account">
                    <MyAccount />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
