import './App.css';
import {Switch, Route} from 'react-router-dom';
import {useSelector} from "react-redux";
import {useEffect} from 'react';
// Components
import Navbar from "./components/Navbar";

// Subpages
import Home from "./subpages/Home";
import Informations from "./subpages/Informations";


function App() {
    const isLogged = useSelector(state=>state.authReducer);
    console.log(isLogged);


    return (
        <div>
            <Navbar />
            <div className="content">
                <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/informations">
                    <Informations />
                </Route>
                </Switch>
            </div>
        </div>
    );
}

export default App;
