import NavbarComponent from "../../../components/ReusableComponents/NavbarComponent";
import Footer from "../../../components/ReusableComponents/Footer";
import {Button, Col, Container, Row} from "react-bootstrap";
import SideNavbar from "../../../components/ReusableComponents/SideNavbar";
import SideNavbarLink from "../../../components/ReusableComponents/SideNavbarLink";
import {Switch, useHistory, useParams} from "react-router-dom";
import GuideOnlyRoute from "../../../components/UtilityComponents/GuideOnlyRoute";

import axios from "axios";

import GuideActiveOfferEnrollment from "./GuideActiveOfferEnrollment";
import GuideActiveOfferModification from "./GuideActiveOfferModification";
import GuideActiveOfferMessages from "./GuideActiveOfferMessages";

import {useEffect, useState} from "react";
import {API_PREFIX} from "../../../config";

function GuideActiveOffer(props) {
    const [tourData, setTourData] = useState({})
    const history = useHistory()
    const {tourID} = useParams()

    useEffect(() => {
        const url = API_PREFIX + "/tour/tour"
        const config = {
            params: {
                tour_id: tourID
            }
        }
        axios.get(url, config)
            .then(res => {
                console.log(res.data)
                setTourData(res.data)
            })
            .then(err => {
                console.log(err)
            })
    }, [])


    return (
        <div className={"guideOfferDetails"}>
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}
                         className={"d-flex justify-content-start align-items-center flex-column"}>
                        <SideNavbar title="Zarządzanie ofertą">
                            <Button onClick={() => history.push("/account/guide/active-offers")}
                                    className={"mb-3 w-100 p-3"} variant={"dark"}> Powrót do listy </Button>
                            <SideNavbarLink
                                name="Zapisy"
                                path={`/account/guide/active-offer/${tourID}/enrollment`}
                            />
                            <SideNavbarLink
                                name="Wiadomości"
                                path={`/account/guide/active-offer/${tourID}/messages`}
                            />
                            <SideNavbarLink
                                name="Podgląd i modyfikacja"
                                path={`/account/guide/active-offer/${tourID}/modification`}
                            />
                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}}>
                        <Switch>
                            <GuideOnlyRoute
                                path={"/account/guide/active-offer/:tourID/messages"}
                                component={GuideActiveOfferMessages}
                                general_data={tourData.general_data}
                                image_url={tourData.image_url}
                                image_url={tourData.image_url}
                                tickets={tourData.tickets}
                            />

                            <GuideOnlyRoute
                                path={"/account/guide/active-offer/:tourID/enrollment"}
                                component={GuideActiveOfferEnrollment}
                                general_data={tourData.general_data}
                                image_url={tourData.image_url}
                                tickets={tourData.tickets}
                            />

                            <GuideOnlyRoute
                                path={"/account/guide/active-offer/:tourID/modification"}
                                component={GuideActiveOfferModification}
                            />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default GuideActiveOffer