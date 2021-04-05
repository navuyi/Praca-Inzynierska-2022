
// Dependencies
import {Container, Row, Col, ListGroup} from "react-bootstrap";
import {Link, Route, Switch} from 'react-router-dom';
import GuideNewTour from "../pages/guide/GuideNewTour";
import GuideOffers from "../pages/guide/GuideOffers";

function SideNavbar(props){
    return(
        <Container className="sideNavbar" >
            <Row style={{margin: "0 0"}}>
                <h1> {props.title} </h1>
            </Row>
            <Row style={{margin: "0 0"}}>
                <ListGroup defaultActiveKey="#link1" style={{width: "100%"}}>
                    {props.children}
                </ListGroup>
            </Row>
        </Container>

    )
}

export default SideNavbar;