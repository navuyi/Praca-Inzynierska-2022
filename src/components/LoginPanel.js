import CredentialInput from "./credentialInput";
import styles from '../styles/loginPanel.module.css';

import passwordIcon from '../images/padlock.png';
import loginIcon from '../images/person.png';
import closeIcon from '../images/close.png';

import {Link} from 'react-router-dom';

function LoginPanel(props){
    return(
      <div className={styles.loginPanel}>
          <div className={styles.closeIcon} onClick={()=>props.exit()}></div>
          <h1> Logowanie </h1>
          <div className={styles.inputContainer}>
              <CredentialInput
                  type="text"
                  placeholder="Adres email"
                  icon={loginIcon}
              />
              <CredentialInput
                  type="password"
                  placeholder="Hasło"
                  icon={passwordIcon}
              />
          </div>
          <button> Zaloguj </button>
          <p> Nie masz konta? Załóż je <span>tutaj</span></p>
      </div>
    );
}

export default LoginPanel;