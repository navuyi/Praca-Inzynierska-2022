import React, {useEffect, useState} from "react"
import NavbarComponent from "../../components/NavbarComponent"
import Footer from "../../components/Footer"

import {Container, Row, Col, Button, FormControl, DropdownButton, Dropdown} from "react-bootstrap"
import TourPanelLabel from "../../components/Tours/TourPanelLabel"

import axios from "axios"

import img from "../../images/home/tour03.jpg"
import Separator from "../../components/Separator"
import PersonIcon from "@material-ui/icons/Person"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import DateRangeIcon from "@material-ui/icons/DateRange"
import GroupIcon from "@material-ui/icons/Group"
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'

import TourPriceList from "../../components/Tours/TourPriceList"
import TourImportantInfo from "../../components/Tours/TourImportantInfo"
import {useLocation} from "react-router-dom"
import {parse} from "querystring";


function TourDetails(){

    const queryString = window.location.search
    const queryParams = parse(queryString)

    const [tourData, setTourData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        fetchData()

    }, [])



    function fetchData(){
        setLoading(true)
        const url = "http://167.99.143.194:5000/tour/tour"
        const tour_id = queryParams["?id"]
        const params = {
            tour_id: tour_id
        }

        axios.get(url, {params})
            .then(res=>{
                console.log(res)
                setTourData(res.data)
                setLoading(false)
            })
            .catch(err=>{
                console.log(err.response.data)
                setLoading(false)
            })
    }

    return(
        <div className={"tourDetails"}>
            <NavbarComponent/>
            {
                loading ? <div> nic </div> :

            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{backgroundColor: "orange", padding: "0"}} className={"d-flex justify-content-center align-items-center"}>

                    </Col>
                    <Col lg={8} sm={12} style={{padding: "0"}} >
                        <Container className={"details-body d-flex flex-column align-items-center justify-content-center"}>
                            <Row className={"d-flex justify-content-center"}>
                                <img src={img} alt={""} className="details-main-img"/>
                            </Row>
                            <Row className={"col-xl-10 mt-5"}>
                                <h1> {tourData.general_data.header} </h1>
                            </Row>
                            <Row className={"col-xl-10 mt-5"}>
                                <span className="description">
                                    {tourData.general_data.description}
                                </span>
                            </Row>
                            <Separator />
                            <Row className={"w-100 d-flex flex-row justify-content-around"}>
                                <Col xl={5} className={"info-panel d-flex flex-column justify-content-start align-items-center mb-5 mb-xl-0"}>
                                    <TourPanelLabel
                                        image={<AttachMoneyIcon fontSize={"medium"} />}
                                        text="Cena"
                                        value={tourData.general_data.price}
                                    />
                                    <TourPanelLabel
                                        image={<DateRangeIcon fontSize={"medium"} />}
                                        text="Data"
                                        value={`od ${tourData.general_data.start_date} do ${tourData.general_data.end_date}`}
                                    />
                                    <TourPanelLabel
                                        image={<GroupIcon fontSize={"medium"} />}
                                        text="Miejsca"
                                        value={`xx / ${tourData.general_data.person_limit}`}
                                    />
                                </Col>
                                <Col xl={5} className={"info-panel d-flex flex-column justify-content-start align-items-center"}>
                                    <TourPanelLabel
                                        image={<PersonIcon fontSize={"medium"} />}
                                        text="Przewodnik"
                                        value={`${tourData.guide_data.f_name} ${tourData.guide_data.l_name}`}
                                    />
                                    <TourPanelLabel
                                        image={<EmailIcon fontSize={"medium"} />}
                                        text="Email"
                                        value={tourData.guide_data.email}
                                    />
                                    <TourPanelLabel
                                        image={<PhoneIcon fontSize={"medium"} />}
                                        text="Numer tel."
                                        value={tourData.guide_data.phone_number}
                                    />
                                    <Button variant={"outline-light w-100 mt-4"}> Masz pytanie? Napisz wiadomość. </Button>
                                </Col>
                            </Row>
                            <Separator />
                            {
                                tourData.tour_plan ?
                                <React.Fragment>
                                    <Row className={"w-100 col-11"}>
                                        <h2> Plan wycieczki </h2>
                                    </Row>
                                    <Row className={"w-100 col-10"}>
                                        {
                                             tourData.tour_plan.map((item, index)=>{
                                                return(
                                                    <div className={"tour-plan-point"} key={index}>
                                                        {item.description}
                                                    </div>
                                                )
                                            })
                                        }
                                    </Row>
                                    <Separator />
                                </React.Fragment>
                                : null
                            }
                            <Row className={"w-100 col-10 d-flex justify-content-between"} >
                                <Col xl={6} className={"d-flex align-items-center flex-column"}>
                                    {
                                        tourData.price_list ? <TourPriceList price_list={tourData.price_list}/> : null
                                    }
                                </Col>
                                <Col xl={6} className={"d-flex align-items-center flex-column"}>
                                    {
                                        tourData.important_info ? <TourImportantInfo important_info={tourData.important_info} /> : null
                                    }
                                </Col>
                            </Row>
                            {
                                (tourData.important_info && tourData.price_list) ? <Separator /> : null
                            }
                        </Container>
                    </Col>
                    <Col lg={2} sm={12} style={{backgroundColor: "orange", padding: "0"}} className={"d-flex justify-content-center align-items-center"}>

                    </Col>
                </Row>
            </Container>}
            <Footer />
        </div>
    )
}

export default TourDetails;