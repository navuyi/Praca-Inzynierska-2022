


function AccountNavbar(props){

    return(
        <div className="accountNavbar">
            <h1> {props.title} </h1>
            {/* Return all links passed to this component */}
            {props.children}
        </div>
    );
}

export default AccountNavbar;