import React, {useState} from "react"
import {Container, Row, Col, Button, FormControl, FormLabel} from "react-bootstrap"

import image from "../../images/icons/personal-data.svg"

function PersonalData(){
    const [disabled, setDisabled] = useState(true)

    return(
        <div className={"personalData"}>
            <Container className={"d-flex flex-column justify-content-center align-items-center"}>
                <Row className={"d-flex flex-column justify-content-center mt-5"} style={{minHeight: "200px"}}>
                    <img src={image} alt={""}  width={150}/>
                    <Button variant={"secondary"} onClick={()=>{setDisabled(prev => !prev)}}> {disabled ? "Modyfikuj" : "Zakończ"} </Button>

                </Row>
                <Row className={"mt-5 d-flex flex-column col-xl-4"}>
                    <FormLabel> Imię </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                    />
                </Row>
                <Row className={"mt-2 d-flex flex-column col-xl-4"}>
                    <FormLabel> Nazwisko </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                    />
                </Row>
                <Row className={"mt-2 d-flex flex-column col-xl-4"}>
                    <FormLabel> Adres email </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                    />
                </Row>
                <Row className={"mt-2 d-flex flex-column col-xl-4"}>
                    <FormLabel> Numer telefonu </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                    />
                </Row>
                <Row className={"d-flex flex-column align-items-center justify-content-center col-xl-4"} style={{minHeight: "100px"}}>
                    {
                        disabled ? null :  <Button className={"w-100"} variant={"danger"}> Zapisz zmiany </Button>
                    }
                </Row>
            </Container>
        </div>
    )
}

export default PersonalData