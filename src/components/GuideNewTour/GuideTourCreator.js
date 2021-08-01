import React from "react"
import {Container, Col, Row, Button} from 'react-bootstrap'


const GuideTourCreator = (props) => {
    return(
        <div className={"guideTourCreator"}>
            <Container style={{backgroundColor: "white", height: "100%"}}>
                <Row>
                    <h1> Kreator wycieczki </h1>
                </Row>
            </Container>
        </div>
    )
}

export default GuideTourCreator