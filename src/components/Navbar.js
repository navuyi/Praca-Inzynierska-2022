import NavbarLink from "./NavbarLink";

// Icons
import home from '../images/home.png';
import informations from '../images/information.png';

import login from '../images/enter.png';
import register from '../images/register.png';

function Navbar(){
    return(
        <div className="navbar">
            <div className="col col-1">

            </div>
            <div className="col col-2">
                <NavbarLink
                    icon={home}
                    name="Głowna"
                    path="/"
                />
                <NavbarLink
                    icon={informations}
                    name="Informacje"
                    path="/informations"
                />
            </div>
            <div className="col col-1">
                <NavbarLink
                    icon={login}
                    name="Logowanie"
                    path="/login"
                />
                <NavbarLink
                    icon={register}
                    name="Rejestracja"
                    path="/login"
                />
            </div>
        </div>
    )
}


export default Navbar;