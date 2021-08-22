import React, {useEffect, useState} from "react"
import {Row, Col, Container, Form, FormControl, FormLabel, Nav} from "react-bootstrap"
import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";


import img from "../images/home/tour03.jpg"
import GuideActiveOfferHeader from "../components/GuideOffers/GuideActiveOfferHeader";
import {Label} from "@material-ui/icons";

function Enrollment(){
    const [tickets, setTickets] = useState(1)
    const [guestForms, setGuestForms] = useState([])

    useEffect(() => {
        const tmp = []
        for(let i=0; i<tickets; i++){
            tmp.push(
               <Row className={"w-50 mt-2"}>
                   <Col xl={2} className={"d-flex align-items-center justify-content-center"}>
                       <h2>{i+1}</h2>
                   </Col>
                   <Col xl={5}>
                       <FormLabel>Imię</FormLabel>
                       <FormControl />
                   </Col>
                   <Col xl={5}>
                       <FormLabel>Nazwisko</FormLabel>
                       <FormControl />
                   </Col>
               </Row>
            )
        }
        setGuestForms(tmp)
    }, [tickets])

    return(
        <div className={"enrollment"}>
            <NavbarComponent />
            <Container >
                <GuideActiveOfferHeader
                    header={"Lorem ipsum "}
                    person_limit={15}
                    price={205}
                    start_date={"22.08.2021"}
                    end_date={"24.08.2021"}
                    image_url={img}
                />
                <Form className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                    <Row className={"section-header mt-5 w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Formularz zapisu na wycieczkę</h1>
                    </Row>
                    <Row className={"section col-11"}>
                        <Col className={"d-flex flex-column justify-content-center align-items-center"}>
                            <Row className={"w-50 mb-5"}>
                                <FormLabel> Liczba biletów </FormLabel>
                                <FormControl
                                    as={"input"}
                                    type={"number"}
                                    value={tickets}
                                    min={1}
                                    onChange={(e)=>{setTickets(e.target.value)}}
                                />
                            </Row>
                            {
                                guestForms
                            }
                            <Row className={"mt-5 w-75"}>
                                <FormLabel> Opcjonalny komentarz</FormLabel>
                                <FormControl
                                    as={"textarea"}
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Row className={"section-header mt-5 w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Dane osobowe</h1>
                    </Row>
                    <Row className={"section col-11 d-flex flex-column align-items-center justify-content-center"}>
                        <Col xl={10}>
                            <Row>
                                <Col xl={6}>
                                    <FormLabel>Imię</FormLabel>
                                    <FormControl />
                                </Col>
                                <Col xl={6}>
                                    <FormLabel>Nazwisko</FormLabel>
                                    <FormControl />
                                </Col>
                            </Row>
                            <Row className={"mt-2"}>
                                <Col>
                                    <FormLabel>Adres email</FormLabel>
                                    <FormControl />
                                </Col>
                            </Row>
                            <Row className={"mt-2"}>
                                <Col>
                                    <FormLabel>Numer telefonu</FormLabel>
                                    <FormControl />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={"section-header mt-5 w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Adres zamieszkania</h1>
                    </Row>
                    <Row className={"section col-11 d-flex flex-column align-items-center justify-content-center"}>
                        <Col xl={10}>
                            <Row className={"mt-4"}>
                                <Col xl={6}>
                                    <FormLabel>Miejscowość</FormLabel>
                                    <FormControl />
                                </Col>
                                <Col xl={6}>
                                    <FormLabel>Kod pocztowy</FormLabel>
                                    <FormControl/>
                                </Col>
                            </Row>
                            <Row className={"mt-4"}>
                                <Col xl={6}>
                                    <FormLabel>Ulica</FormLabel>
                                    <FormControl />
                                </Col>
                                <Col xl={6}>
                                    <Row>
                                        <Col>
                                            <FormLabel>Numer domu</FormLabel>
                                            <FormControl />
                                        </Col>
                                        <Col>
                                            <FormLabel>Numer mieszkania</FormLabel>
                                            <FormControl />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={"section-header section-header-summary mt-5 w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Podsumowanie</h1>
                    </Row>
                </Form>
            </Container>
            <Footer />
        </div>
    )
}

export default Enrollment