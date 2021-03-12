import styles from "../styles/navbar.module.css";

import NavbarLink from "./NavbarLink";
import NavbarList from "./NavbarList";

import homeIcon from '../images/home.png';
import loginIcon from '../images/enter.png';
import registerIcon from '../images/register.png';
import infoIcon from '../images/information.png';
import guidesIcon from '../images/guides.png';
import offersIcon from '../images/offers.png';

// Redux section
import {useDispatch} from "react-redux";
import {login, logout} from "../actions";


function Navbar(){
    const dispatch = useDispatch();

    return(
        <div className={styles.navbar}>
            <div className={`${styles.col} ${styles.col_1}`}>

            </div>
            <div className={`${styles.col} ${styles.col_2}`}>
                <NavbarList>
                    <NavbarLink name={"Główna"} link="/" icon={homeIcon}/>
                    <NavbarLink name={"Informacje"} link="/informations" icon={infoIcon}/>
                    <NavbarLink name={"Oferty"} icon={offersIcon}/>
                    <NavbarLink name={"Przewodnicy"} icon={guidesIcon}/>
                </NavbarList>
            </div>
            <div className={`${styles.col} ${styles.col_3}`}>
                <NavbarList>
                    <NavbarLink name={"Zaloguj"} icon={loginIcon} link="/login"/>
                    <NavbarLink name={"Rejestracja"}  icon={registerIcon}/>
                </NavbarList>
            </div>
        </div>
    );
}

export default Navbar;

