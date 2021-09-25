import React from "react"
import {Nav, Navbar, NavDropdown} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {_logout} from "../../utils/_logout";

function NavbarComponent() {
    const isLogged = useSelector(state => state.isAuthenticated);
    const isGuide = useSelector(state => state.isGuide);
    const dispatch = useDispatch()

    function handleLogout() {
        _logout(dispatch)
    }

    return (
        <Navbar collapseOnSelect expand="md" variant="dark" className="navbarComponent sticky-top">
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="responsive-navbar-nav" className={"justify-content-center"}>
                <Nav.Link as={Link} to="/"><span className="white">Główna</span></Nav.Link>
                <Nav.Link as={Link} to="/information"><span className="white">Informacje</span></Nav.Link>
                <Nav.Link as={Link} to="/tours"><span className="white">Wycieczki</span></Nav.Link>
                {
                    isLogged ?
                    <React.Fragment>
                        <Nav.Link as={Link} to="/account/user/enrollments"><span className="white">Panel użytkownika</span></Nav.Link>
                        {
                            isGuide ?
                            <React.Fragment>
                                <Nav.Link as={Link} to="/account/guide/new-tour"><span className="white">Panel przewodnika</span></Nav.Link>
                            </React.Fragment> : null
                        }
                        <Nav.Link as={Link} to="/account/messages"><span className="white">Wiadomości</span></Nav.Link>
                        <Nav.Link as={Link} to="/account/settings/password-change"><span className="white">Ustawienia</span></Nav.Link>
                    </React.Fragment> : null
                }
            </Navbar.Collapse>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                {
                    isLogged ? <div onClick={handleLogout}><Nav.Link as={Link} to="/"><span
                            className="white">Wyloguj</span></Nav.Link></div> :
                        <React.Fragment>
                            <Nav.Link as={Link} to="/login"><span className="white">Logowanie</span></Nav.Link>
                            <Nav.Link as={Link} to="/register"><span className="white">Rejestracja</span></Nav.Link>
                        </React.Fragment>
                }

            </Navbar.Collapse>

        </Navbar>


    )
}

export default NavbarComponent