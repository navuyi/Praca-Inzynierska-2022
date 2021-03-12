import {Link} from 'react-router-dom';
import styles from '../styles/navbarLink.module.css';
import React from 'react';

function NavbarLink(props){
    return(
        <Link to={props.link} className={styles.navbarLink}>
            <img src={props.icon} className={styles.navbarIcon}/>
            <p> {props.name} </p>
        </Link>
    )
}

export default NavbarLink;