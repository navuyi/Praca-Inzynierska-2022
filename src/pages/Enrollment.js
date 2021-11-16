import React, {useEffect, useState} from "react"
import {Row, Col, Container, Form, FormControl, FormLabel, Button} from "react-bootstrap"
import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import Footer from "../components/ReusableComponents/Footer";

import {create_enrollment} from "../API_CALLS/api_enrollments_enrollment";
import GuideActiveOfferHeader from "../components/GuideOffers/GuideActiveOfferHeader";
import {useHistory, useParams} from "react-router-dom";
import axios from "axios";

import EnrollmentConfiguration from "../components/Enrollment/EnrollmentConfiguration";
import {API_PREFIX} from "../config";
import {CircularProgress} from "@material-ui/core";
import {refesh_token} from "../API_CALLS/api_authentication_token_refresh";

function Enrollment(){
    const [generalData, setGeneralData] = useState({})
    const [imageUrl, setImageUrl] = useState("")
    const {tour_id} = useParams()
    const [participants, setParticipants] = useState([])
    const [comment, setComment] = useState("")
    const [sending, setSending] = useState(false)

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

    // Fetch personal data if is logged in
    useEffect(() => {
      fetchPersonalData()
    }, [])

    function fetchPersonalData(){
        const access_token = localStorage.getItem("access_token")
        if(access_token){
            const url = API_PREFIX + "/settings/personal_data"
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            axios.get(url, config).then(res => {
                const data = {
                    f_name: res.data.f_name,
                    l_name: res.data.l_name,
                    email: res.data.email,
                    phone_number: res.data.phone_number
                }
                setPersonalData(data)
            }).catch(err => {
                if(err.response.status === 401){
                    // Try refreshing the token
                    if(access_token){
                        refesh_token().then(res => {
                            localStorage.setItem("access_token", res.data.access_token)
                            fetchPersonalData()
                        }).catch(err => {
                            console.log(err)
                        })
                    }
                }
            })
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        if(participants.length===0){
            window.scrollTo({top: 0, behavior: "smooth"})
            return
        }
        const data = {
            participants: participants,
            comment: comment,
            tour_id: tour_id,
            ...personalData,
            ...address,
            amount_payable: participants.length*generalData.price
        }
        setSending(true)
        create_enrollment(data)
            .then(res => {
                setSending(false)
                window.location.href = res.data.payload.url
            })
            .catch(err => {
                console.log(err)
                if(err.response){
                    setSending(false)
                    console.log(err.response)
                    window.alert(err.response.data.message)
                }
            })
    }


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
        const url = API_PREFIX+"/tour/tour"
        const params = {
            tour_id: tour_id
        }
        axios.get(url, {params})
            .then(res => {
                console.log(res.data)
                res.data.general_data.tickets=res.data.tickets
                setGeneralData(res.data.general_data)
                setImageUrl(res.data.image_url)
            })
            .catch(err => {
                if(err.response){
                    console.log(err.response.data)
                }
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
                    tickets={generalData.tickets}
                />
                <Form onSubmit={handleSubmit} className={"w-100 d-flex flex-column justify-content-center align-items-center"}>
                    <Row className={"section-header mt-5 w-100 d-flex justify-content-center align-items-center"}>
                        <h1>Formularz zapisu na wycieczkę</h1>
                    </Row>
                    <EnrollmentConfiguration
                        participants={participants}
                        setParticipants={setParticipants}
                        setComment={setComment}
                        comment={comment}
                    />

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
                                        maxLength={6}
                                        pattern="[0-9][0-9]-[0-9][0-9][0-9]"
                                        title="xx-yyy"
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
                                                required={false}
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
                        <p> Zakup biletów dla: <span>{participants.length} </span> osób</p>
                        <p> Do zapłaty: <span>{participants.length*generalData.price} </span> PLN </p>
                    </Row>
                    <Row className={"section section-summary col-11 d-flex flex-column align-items-center justify-content-center"} style={{minHeight: "100px"}}>
                        {
                            sending ? <CircularProgress size={60} color={"secondary"} />
                                :
                            <Button type={"submit"} className={"w-100 "} variant={"danger"}> Potwierdź i przejdź do płatności </Button>
                        }
                    </Row>
                    
                </Form>
            </Container>
            <Footer />
        </div>
    )
}

export default Enrollment