import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import {useLocation} from 'react-router-dom';

function SideNavbarLink(props){
    const {pathname} = useLocation();
    const isActive = pathname.includes(props.path) ? true : false;


    return(
        <ListGroup.Item action as={Link} to={props.path} active={isActive} className={"side-navbar-button"}>
            {props.name}
        </ListGroup.Item>
    )
}

export default SideNavbarLink;