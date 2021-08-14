// Dependencies
import {Container, ListGroup, Row} from "react-bootstrap";

function SideNavbar(props) {
    return (
        <Container fluid className="sideNavbar">
            <Row style={{margin: "0 0"}} className="sideNavbar-col">
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