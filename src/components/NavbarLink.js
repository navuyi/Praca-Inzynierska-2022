import {Link} from "react-router-dom";

function NavbarLink(props){

    return(
        <Link to={props.path} className="navbarLink">
            <img src={props.icon}/>
            <p>{props.name}</p>
        </Link>
    )
}

export default NavbarLink;