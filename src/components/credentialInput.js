import styles from '../styles/credentialInput.module.css';

function CredentialInput(props){
    return(
        <div className={styles.loginDataInput}>
            <img src={props.icon} />
            <input
                type={props.type}
                placeholder={props.placeholder}
            />
        </div>
    );
}

export default CredentialInput;