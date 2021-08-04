import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import {Col, Container, Row, Button} from "react-bootstrap";
import SideNavbar from "../../components/SideNavbar";
import SideNavbarLink from "../../components/SideNavbarLink";
import {Route, Switch, useHistory} from "react-router-dom";
import GuideOnlyRoute from "../../components/GuideOnlyRoute";
import GuideNewTour from "./GuideNewTour";
import GuideActiveOffers from "./GuideActiveOffers";
import GuideClosedOffers from "./GuideClosedOffers";
import GuideProfile from "./GuideProfile";

import GuideOfferDetailsEnrollment from "./GuideOfferDetailsEnrollment";
import GuideOfferDetailsModification from "./GuideOfferDetailsModification";
import GuideOfferDetailsMessages from "./GuideOfferDetailsMessages";

function GuideOfferDetails(props){
    const history = useHistory()

    return(
        <div className={"guideOfferDetails"}>
            <NavbarComponent />
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}} className={"d-flex justify-content-start align-items-center flex-column"}>
                        <SideNavbar title="Zarządzanie ofertą">
                            <Button onClick={()=>history.push("/account/guide/active-offers")} className={"mb-3 w-100 p-3"} variant={"dark"}> Powrót do listy </Button>
                            <SideNavbarLink
                                name="Zapisy"
                                path="/guide/offer/details/active/enrollment"
                            />
                            <SideNavbarLink
                                name="Wątki wiadomości"
                                path="/guide/offer/details/active/messages"
                            />
                            <SideNavbarLink
                                name="Modyfikacja oferty"
                                path="/guide/offer/details/active/modification"
                            />
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}} >
                        <Switch>
                            <GuideOnlyRoute path={"/guide/offer/details/active/messages"} component={GuideOfferDetailsMessages} />
                            <GuideOnlyRoute path={"/guide/offer/details/active/enrollment"} component={GuideOfferDetailsEnrollment} />
                            <GuideOnlyRoute path={"/guide/offer/details/active/modification"} component={GuideOfferDetailsModification} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default GuideOfferDetails