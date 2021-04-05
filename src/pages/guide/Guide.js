
// Components
import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import SideNavbar from "../../components/SideNavbar";
import SideNavbarLink from "../../components/SideNavbarLink";

// Subpages
import GuideNewTour from "./GuideNewTour";
import GuideOffers from "./GuideOffers";
import GuideProfile from "./GuideProfile";

// Dependencies
import {Container, Row, Col} from "react-bootstrap";
import {Switch, Route} from 'react-router-dom';

function Guide(){


    return(
        <div className="guide">
            <NavbarComponent />
            <Container fluid style={{marginTop: "0em"}}>
                <Row>
                    <Col lg={2} sm={12} style={{padding: "0"}}>
                        <SideNavbar title="Panel użytkownika">
                            <SideNavbarLink
                                name="Nowa wycieczka"
                                path="/account/guide/new-tour"
                            />
                            <SideNavbarLink
                                name="Moje oferty"
                                path="/account/guide/offers"
                            />
                            <SideNavbarLink
                                name="Mój profil"
                                path="/account/guide/profile"
                            />
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}} >
                        <Switch>
                            <Route exact path="/account/guide/new-tour">
                                <GuideNewTour />
                            </Route>
                            <Route exact path="/account/guide/offers">
                                <GuideOffers />
                            </Route>
                            <Route exact path="/account/guide/profile">
                                <GuideProfile />
                            </Route>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default Guide;