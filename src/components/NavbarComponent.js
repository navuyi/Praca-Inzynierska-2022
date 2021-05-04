
import {Navbar, Nav, NavDropdown, Container, Col, Row, Collapse, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';

function NavbarComponent(){
    return(
        <Navbar collapseOnSelect expand="md" variant="dark"  className="navbarComponent sticky-top">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav" className={"justify-content-center"}>
                <Nav.Link as={Link} to="/"><span className="white">Główna</span></Nav.Link>
                <Nav.Link as={Link} to="/informations"><span className="white">Informacje</span></Nav.Link>
                <Nav.Link as={Link} to="/tours"><span className="white">Wycieczki</span></Nav.Link>
                <NavDropdown id="collasible-nav-dropdown" title="Moje konto">
                    <NavDropdown.Item as={Link} to="/account/guide/new-tour"><span className="black">Przewodnik</span></NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/account/user"><span className="black">Użytkownik</span></NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/account/messages"><span className="black">Wiadomości</span></NavDropdown.Item>
                </NavDropdown>
            </Navbar.Collapse>
            <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                <Nav.Link as={Link} to="/login"><span className="white">Logowanie</span></Nav.Link>
                <Nav.Link as={Link} to="/register"><span className="white">Rejestracja</span></Nav.Link>
            </Navbar.Collapse>

        </Navbar>




    )
}

export default NavbarComponent