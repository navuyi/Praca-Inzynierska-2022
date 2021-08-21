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
                        <NavDropdown id="collasible-nav-dropdown" title="Moje konto">
                            {isGuide ? <NavDropdown.Item as={Link} to="/account/guide/new-tour"><span
                                className="black">Przewodnik</span></NavDropdown.Item> : null}
                            <NavDropdown.Item as={Link} to="/account/user/enrollments"><span
                                className="black">Użytkownik</span></NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/account/messages"><span className="black">Wiadomości</span></NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/account/messages"><span className="black">Ustawienia</span></NavDropdown.Item>
                        </NavDropdown>
                        : null
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