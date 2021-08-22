import React, {useEffect, useState} from "react"
import {Row, Col, Container, Form, FormControl, FormLabel, Button} from "react-bootstrap"
import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";


import img from "../images/home/tour03.jpg"
import GuideActiveOfferHeader from "../components/GuideOffers/GuideActiveOfferHeader";
import {useParams} from "react-router-dom";
import axios from "axios";

function Enrollment(){
    const [tickets, setTickets] = useState(1)
    const [guestForms, setGuestForms] = useState([])
    const [generalData, setGeneralData] = useState({})
    const [imageUrl, setImageUrl] = useState("")
    const {tour_id} = useParams()

    const [personalData, setPersonalData] = useState({
        f_name: "",
        l_name: "",
        email: "",
        phone_number: ""
    })
    const [address, setAddress] = useState({
        postcode: "",
        city: "",
        street: "",
        house_number: "",
        apartment_number: ""
    })

    // Render proper amount of inputs for enrollment participants
    useEffect(() => {
        const tmp = []
        for(let i=0; i<tickets; i++){
            tmp.push(
               <FormControl
                   className={"w-75 mt-2"}
                   placeholder="Imię i nazwisko uczestnika wycieczki"
                   required
               />
            )
        }
        setGuestForms(tmp)
    }, [tickets])
    // Insert dash for proper postcode format
    useEffect(() => {
        if(address.postcode.length === 2){
            const tmp = {...address}
            tmp.postcode = tmp.postcode + "-"
            setAddress(tmp)
        }
    }, [address])
    // Fetch tour data on every component render
    useEffect(() => {
        fetchData()
    }, [])

    function handlePersonalData(e){
        const tmp = {...personalData, [e.target.id]: e.target.value}
        setPersonalData(tmp)
    }
    function handleAddressChange(e){
        const tmp = {...address, [e.target.id]: e.target.value}
        setAddress(tmp)
    }

    function fetchData() {
        const url = "http://167.99.143.194/api/tour/tour"
        const params = {
            tour_id: tour_id
        }
        axios.get(url, {params})
            .then(res => {
                console.log(res.data)
                setGeneralData(res.data.general_data)
                setImageUrl(res.data.image_url)
            })
            .catch(err => {
                console.log(err.response.data)
            })
    }

    return(
        <div className={"enrollment"}>
            <NavbarComponent />
            <Container >
                <GuideActiveOfferHeader
                    header={generalData.header ? generalData.header : ""}
                    person_limit={generalData.person_limit}
                    price={generalData.price}
                    start_date={generalData.start_date}
                    end_date={generalData.end_date}
                    image_url={imageUrl}
                    days_left={generalData.days_left}
                    time_left={generalData.time_left}
                />
                <Form className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                    <Row className={"section-header mt-5 w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Formularz zapisu na wycieczkę</h1>
                    </Row>
                    <Row className={"section col-11 pb-5"}>
                        <Col  className={"d-flex flex-column justify-content-start align-items-center"}>
                            <FormLabel> Liczba biletów </FormLabel>
                            <FormControl
                                as={"input"}
                                type={"number"}
                                value={tickets}
                                min={1}
                                onChange={(e)=>{setTickets(e.target.value)}}
                                className={"w-25"}
                            />
                            {
                                guestForms
                            }
                        </Col>
                        <Col className={"d-flex flex-column justify-content-start align-items-center "}>
                            <FormLabel> Opcjonalny komentarz</FormLabel>
                            <FormControl
                                as={"textarea"}
                                rows={3}
                            />
                        </Col>
                    </Row>
                    <Row className={"section-header  w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Dane osobowe</h1>
                    </Row>
                    <Row className={"section col-11 pb-5 d-flex flex-column align-items-center justify-content-center "}>
                        <Col xl={10}>
                            <Row>
                                <Col xl={6}>
                                    <FormLabel>Imię</FormLabel>
                                    <FormControl
                                        value={personalData.f_name}
                                        id={"f_name"}
                                        onChange={handlePersonalData}
                                        required
                                    />
                                </Col>
                                <Col xl={6}>
                                    <FormLabel>Nazwisko</FormLabel>
                                    <FormControl
                                        value={personalData.l_name}
                                        id={"l_name"}
                                        onChange={handlePersonalData}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className={"mt-2"}>
                                <Col>
                                    <FormLabel>Adres email</FormLabel>
                                    <FormControl
                                        type={"email"}
                                        value={personalData.email}
                                        id={"email"}
                                        onChange={handlePersonalData}
                                        required
                                    />
                                </Col>
                            </Row>
                            <Row className={"mt-2"}>
                                <Col>
                                    <FormLabel>Numer telefonu</FormLabel>
                                    <FormControl
                                        type={"number"}
                                        value={personalData.phone_number}
                                        id={"phone_number"}
                                        onChange={handlePersonalData}
                                        max={999999999}
                                        required
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={"section-header w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Adres zamieszkania</h1>
                    </Row>
                    <Row className={"section col-11 pb-5 d-flex flex-column align-items-center justify-content-center"}>
                        <Col xl={10}>
                            <Row className={"mt-4"}>
                                <Col xl={6}>
                                    <FormLabel>Miejscowość</FormLabel>
                                    <FormControl
                                        value={address.city}
                                        id={"city"}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </Col>
                                <Col xl={6}>
                                    <FormLabel>Kod pocztowy</FormLabel>
                                    <FormControl
                                        value={address.postcode}
                                        id={"postcode"}
                                        onChange={handleAddressChange}
                                        required
                                        maxlength={6}
                                    />
                                </Col>
                            </Row>
                            <Row className={"mt-4"}>
                                <Col xl={6}>
                                    <FormLabel>Ulica</FormLabel>
                                    <FormControl
                                        value={address.street}
                                        id={"street"}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </Col>
                                <Col xl={6}>
                                    <Row>
                                        <Col>
                                            <FormLabel>Numer domu</FormLabel>
                                            <FormControl
                                                value={address.house_number}
                                                id={"house_number"}
                                                required
                                                onChange={handleAddressChange}
                                            />
                                        </Col>
                                        <Col>
                                            <FormLabel>Numer mieszkania</FormLabel>
                                            <FormControl
                                                value={address.apartment_number}
                                                id={"apartment_number"}
                                                onChange={handleAddressChange}
                                                required
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className={"section-header section-header-summary w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Podsumowanie</h1>
                    </Row>
                    <Row className={"section section-summary col-11 d-flex flex-column align-items-center justify-content-center"}>
                        <p> Zakup biletów dla: <span>{tickets} </span> osób</p>
                        <p> Do zapłaty: <span>{tickets*205} </span></p>
                        <Button type={"submit"} className={"w-100 mt-3"} variant={"danger"}> Potwierdź i przejdź do płatności </Button>
                    </Row>
                </Form>
            </Container>
            <Footer />
        </div>
    )
}

export default Enrollment