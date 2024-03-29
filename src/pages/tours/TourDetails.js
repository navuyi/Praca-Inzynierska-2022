import React, {useEffect, useState} from "react"
import NavbarComponent from "../../components/ReusableComponents/NavbarComponent"
import Footer from "../../components/ReusableComponents/Footer"
import {Col, Button, Container, Row} from "react-bootstrap"
import TourPanelLabel from "../../components/Tours/TourPanelLabel"
import axios from "axios"
import img from "../../images/home/tour03.jpg"
import Separator from "../../components/ReusableComponents/Separator"
import PersonIcon from "@material-ui/icons/Person"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import DateRangeIcon from "@material-ui/icons/DateRange"
import GroupIcon from "@material-ui/icons/Group"
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {CircularProgress} from "@material-ui/core";
import TourPriceList from "../../components/Tours/TourPriceList"
import TourImportantInfo from "../../components/Tours/TourImportantInfo"
import {useHistory, useParams} from "react-router-dom";
import TourImagesGallery from "../../components/ReusableComponents/TourImagesGallery";
import {Button as MaterialButton} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import TourDetailsMessenger from "../../components/Tours/TourDetailsMessenger";
import {API_PREFIX} from "../../config";

function TourDetails() {
    const [msgVisible, setMsgVisible] = useState(false)
    const history = useHistory()
    const {tour_id} = useParams()

    const [tourData, setTourData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()

    }, [])

    function navigateToEnrollment() {
        setTimeout(() => {
            history.push(`/tours/tour/${tour_id}/enrollment`)
        }, 200)
    }

    function fetchData() {
        setLoading(true)
        const url = API_PREFIX + "/tour/tour"
        //const tour_id = queryParams["?id"]
        const params = {
            tour_id: tour_id
        }

        axios.get(url, {params})
            .then(res => {
                setTourData(res.data)
                setLoading(false)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
                setLoading(false)
            })
    }

    return (
        <div className={"tourDetails"}>
            <NavbarComponent/>
            {
                loading ? <CircularProgress size={150} color={"primary"}/> :

                    <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                        <Row style={{minHeight: "75vh"}}>
                            <Col lg={2} sm={12}
                                 className={"d-flex justify-content-center align-items-center"}>
                            </Col>
                            <Col lg={8} sm={12} style={{padding: "0"}}>
                                <Container
                                    className={"details-body d-flex flex-column align-items-center justify-content-center"}>
                                    <Row className={"col-xl-10 mt-5"}>
                                        <h1> {tourData.general_data.header} </h1>
                                    </Row>
                                    <Row className={"col-xl-10 mt-5 d-flex justify-content-center align-items-scenter"}>
                                        {
                                            tourData.general_data.is_active === true ?
                                                <MaterialButton variant={"outlined"} size={"large"} color={"primary"}
                                                                onClick={navigateToEnrollment}> Zapisz się już teraz
                                                    !</MaterialButton>
                                                : <Alert severity={"error"}> Oferta nie jest aktywna. Nie można jej
                                                    wykupić.</Alert>
                                        }
                                    </Row>
                                    <Row className={"d-flex justify-content-center"}>
                                        <img src={tourData.image_url} alt={""} className="details-main-img"/>
                                    </Row>
                                    <Row className={"col-xl-10 mt-5"}>
                                <span className="description">
                                    {tourData.general_data.description}
                                </span>
                                    </Row>
                                    <Separator/>
                                    <Row className={"w-100 d-flex flex-row justify-content-around"}>
                                        <Col xl={5}
                                             className={"info-panel d-flex flex-column justify-content-start align-items-center mb-5 mb-xl-0"}>
                                            <TourPanelLabel
                                                image={<AttachMoneyIcon fontSize={"medium"}/>}
                                                text="Cena"
                                                value={tourData.general_data.price}
                                            />
                                            <TourPanelLabel
                                                image={<DateRangeIcon fontSize={"medium"}/>}
                                                text="Data"
                                                value={`od ${tourData.general_data.start_date} do ${tourData.general_data.end_date}`}
                                            />
                                            <TourPanelLabel
                                                image={<GroupIcon fontSize={"medium"}/>}
                                                text="Zapisanych"
                                                value={`${tourData.tickets}/${tourData.general_data.person_limit}`}
                                            />
                                            <TourPanelLabel
                                                image={<AccessTimeIcon fontSize={"medium"}/>}
                                                text="Pozostało"
                                                value={`${tourData.general_data.days_left} dni ${tourData.general_data.time_left} godzin`}
                                            />
                                        </Col>
                                        <Col xl={5}
                                             className={"info-panel d-flex flex-column justify-content-start align-items-center"}>
                                            <TourPanelLabel
                                                image={<PersonIcon fontSize={"medium"}/>}
                                                text="Przewodnik"
                                                value={`${tourData.guide_data.f_name} ${tourData.guide_data.l_name}`}
                                            />
                                            <TourPanelLabel
                                                image={<EmailIcon fontSize={"medium"}/>}
                                                text="Email"
                                                value={tourData.guide_data.email}
                                            />
                                            <TourPanelLabel
                                                image={<PhoneIcon fontSize={"medium"}/>}
                                                text="Numer tel."
                                                value={tourData.guide_data.phone_number}
                                            />
                                            {
                                                localStorage.getItem("access_token") ?
                                                    <Button variant={"outline-light w-100 mt-4"} onClick={() => {
                                                        setMsgVisible(true)
                                                    }}> Masz pytanie? Napisz wiadomość. </Button> : null
                                            }

                                        </Col>
                                    </Row>
                                    {
                                        msgVisible ?
                                            <TourDetailsMessenger
                                                setMsgVisible={setMsgVisible}
                                                guide_id={tourData.guide_data.id}
                                                tour_id={tourData.general_data.id}
                                            /> : null
                                    }
                                    <Separator/>
                                    {
                                        tourData.tour_plan ?
                                            <React.Fragment>
                                                <Row className={"w-100 col-11"}>
                                                    <h2> Plan wycieczki </h2>
                                                </Row>
                                                <Row className={"w-100 col-10"}>
                                                    {
                                                        tourData.tour_plan.map((item, index) => {
                                                            return (
                                                                <div className={"tour-plan-point"} key={index}>
                                                                    {item.description}
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Row>
                                                <Separator/>
                                            </React.Fragment>
                                            : null
                                    }
                                    <Row className={"w-100 col-10 d-flex justify-content-around"}>
                                        {
                                            tourData.price_list ?
                                                <Col xl={6} className={"d-flex align-items-center flex-column"}>
                                                    <TourPriceList price_list={tourData.price_list}/> </Col> : null
                                        }
                                        {
                                            tourData.important_info ?
                                                <Col xl={6} className={"d-flex align-items-center flex-column"}>
                                                    <TourImportantInfo important_info={tourData.important_info}/>
                                                </Col> : null
                                        }
                                    </Row>
                                    {
                                        (tourData.important_info || tourData.price_list) ? <Separator/> : null
                                    }
                                    {
                                        tourData.image_gallery ?
                                            <Row
                                                className={"w-100 col-10 d-flex justify-content-center align-items-center"}
                                                style={{minHeight: "500px"}}>
                                                <TourImagesGallery urls={tourData.image_gallery}/>
                                            </Row>
                                            : null
                                    }
                                    {
                                        tourData.general_data.is_active ?
                                            <Row
                                                className={"w-100 col-10 d-flex flex-column align-items-center justify-content-center pb-5 "}>
                                                <h2 className={"ending-header"}> Wygląda ciekawie? </h2>
                                                <MaterialButton variant={"outlined"} size={"large"} color={"primary"}
                                                                onClick={navigateToEnrollment}
                                                                className={"w-100"}> Zapisz się
                                                    zanim braknie miejsc! </MaterialButton>
                                            </Row> : null}
                                </Container>
                            </Col>
                            <Col lg={2} sm={12}
                                 className={"d-flex justify-content-center align-items-center"}>
                            </Col>
                        </Row>
                    </Container>}
            <Footer/>
        </div>
    )
}

export default TourDetails;