

function CredentialInput(props){
    return(
        <div className="credentialInput">
            <img src={props.icon} alt=""/>
            <input
                type={props.type}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default CredentialInput;