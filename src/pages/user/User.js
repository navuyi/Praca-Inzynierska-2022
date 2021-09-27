// Components
import NavbarComponent from "../../components/ReusableComponents/NavbarComponent";
import Footer from "../../components/ReusableComponents/Footer";
import {Col, Container, Row} from "react-bootstrap";
import SideNavbar from "../../components/ReusableComponents/SideNavbar";
import SideNavbarLink from "../../components/ReusableComponents/SideNavbarLink";
import {Switch} from "react-router-dom";

import UserEnrollments from "./UserEnrollments";
import UserEnrollmentsHistory from "./UserEnrollmentsHistory";
import ProtectedRoute from "../../components/UtilityComponents/ProtectedRoute";
import UserPaymentHistory from "./UserPaymentHistory";
// Dependencies


function User() {
    return (
        <div className="user">
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{padding: "0", backgroundColor: "orange"}}>
                        <SideNavbar title="Panel użytkownika">
                            <SideNavbarLink
                                name="Zapisy na wycieczki"
                                path="/account/user/enrollments"
                            />
                             <SideNavbarLink
                                name="Historia wycieczek"
                                path="/account/user/history"
                             />
                            <SideNavbarLink
                                name="Historia płatności"
                                path="/account/user/payment/history"
                            />

                        </SideNavbar>
                    </Col>
                    <Col lg={10} sm={12} style={{padding: "0"}}>
                        <Switch>
                            <ProtectedRoute exact path={"/account/user/enrollments"} component={UserEnrollments} />
                            <ProtectedRoute exact  path={"/account/user/history"} component={UserEnrollmentsHistory} />
                            <ProtectedRoute exact path={"/account/user/payment/history"} component={UserPaymentHistory} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    )
}

export default User;