
import {useHistory} from 'react-router-dom';

import CredentialInput from "../components/CredentialInput";

import person from '../images/person.png';
import padlock from '../images/padlock.png';
import close from '../images/close.png';

function Login(){
    const history = useHistory();
    return(
        <div className="login">
            <div className="loginPane">
                <h1> Logowanie </h1>
                <img src={close} alt="" className="exit" onClick={()=>history.goBack()}/>
                <div className="inputWrapper">
                    <CredentialInput
                        type="text"
                        icon={person}
                        placeholder="Adres email"
                    />
                    <CredentialInput
                        type="password"
                        icon={padlock}
                        placeholder="Hasło"
                    />
                </div>
                <button> Zaloguj </button>
            </div>
        </div>
    )
};

export default Login;