import {NavLink} from "react-router-dom";

function NavbarLink(props){

    return(
        <NavLink to={props.path} className="navbarLink" activeClassName="selected">
            {props.icon ? <img src={props.icon} alt=""/> : null}
            <p>{props.name}</p>
        </NavLink>
    )
}

export default NavbarLink;