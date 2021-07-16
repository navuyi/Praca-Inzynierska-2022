import React from 'react'
import {Container, Row, Col, Button, Card, Nav} from 'react-bootstrap'
import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router-dom";

function GuideNewTourSuccess(){
    const history = useHistory()
    const style = {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    return(
        <div className={"guideNewTourSuccess"} style={style}>
            <Card bg={"success"} text={"light"}>
                <Card.Header style={{fontSize: "1.5rem"}}>
                  Oferta wycieczki została założona pomyślnie
                </Card.Header>
                <Card.Body>
                    <Card.Title>Co chciałbyś zrobić teraz?</Card.Title>
                    <Card.Text>
                        <Button variant="outline-dark" className={"w-75"} onClick={()=>{history.push("/account/guide/new-tour")}}>Stwórz kolejną</Button>
                    </Card.Text>
                    <Card.Text>
                        <Button variant="outline-dark" className={"w-75"} onClick={()=>{history.push("/account/guide/offers")}}>Zobacz utworzone oferty</Button>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default GuideNewTourSuccess;