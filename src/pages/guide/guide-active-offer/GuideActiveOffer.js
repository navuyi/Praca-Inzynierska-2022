import NavbarComponent from "../../../components/NavbarComponent";
import Footer from "../../../components/Footer";
import {Col, Container, Row, Button} from "react-bootstrap";
import SideNavbar from "../../../components/SideNavbar";
import SideNavbarLink from "../../../components/SideNavbarLink";
import {Route, Switch, useHistory} from "react-router-dom";
import GuideOnlyRoute from "../../../components/GuideOnlyRoute";
import GuideNewTour from "../guide-new-tour/GuideNewTour";
import GuideActiveOffers from "../GuideActiveOffers";
import GuideClosedOffers from "../GuideClosedOffers";
import GuideProfile from "../GuideProfile";

import GuideActiveOfferEnrollment from "./GuideActiveOfferEnrollment";
import GuideActiveOfferModification from "./GuideActiveOfferModification";
import GuideActiveOfferMessages from "./GuideActiveOfferMessages";

function GuideActiveOffer(props){
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
                                path="/account/guide/active-offer/enrollment"
                            />
                            <SideNavbarLink
                                name="Wiadomości"
                                path="/account/guide/active-offer/messages"
                            />
                            <SideNavbarLink
                                name="Modyfikacja oferty"
                                path="/account/guide/active-offer/modification"
                            />
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}} >
                        <Switch>
                            <GuideOnlyRoute path={"/account/guide/active-offer/messages"} component={GuideActiveOfferMessages} />
                            <GuideOnlyRoute path={"/account/guide/active-offer/enrollment"} component={GuideActiveOfferEnrollment} />
                            <GuideOnlyRoute path={"/account/guide/active-offer/modification"} component={GuideActiveOfferModification} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default GuideActiveOffer