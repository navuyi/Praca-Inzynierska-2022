
// Components
import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import SideNavbar from "../../components/SideNavbar";
import SideNavbarLink from "../../components/SideNavbarLink";
import GuideOnlyRoute from "../../components/GuideOnlyRoute";

// Subpages
import GuideNewTour from "./GuideNewTour";
import GuideActiveOffers from "./GuideActiveOffers";
import GuideProfile from "./GuideProfile";
import GuideClosedOffers from "./GuideClosedOffers";

// Dependencies
import {Container, Row, Col} from "react-bootstrap";
import {Switch, Route} from 'react-router-dom';


function Guide(){

    const style={
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "stretch",

    }

    return(
        <div className="guide" style={style}>
            <NavbarComponent />
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}>
                        <SideNavbar title="Panel przewodnika">
                            <SideNavbarLink
                                name="Nowa wycieczka"
                                path="/account/guide/new-tour"
                            />
                            <SideNavbarLink
                                name="Aktywne oferty"
                                path="/account/guide/active-offers"
                            />
                            <SideNavbarLink
                                name="Zakończone oferty"
                                path="/account/guide/closed-offers"
                            />
                            <SideNavbarLink
                                name="Mój profil"
                                path="/account/guide/profile"
                            />
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}} >
                        <Switch>
                            <GuideOnlyRoute exact path="/account/guide/new-tour" component={GuideNewTour} />

                            <Route exact path="/account/guide/active-offers">
                                <GuideActiveOffers />
                            </Route>
                            <Route exact path="/account/guide/closed-offers">
                                <GuideClosedOffers />
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