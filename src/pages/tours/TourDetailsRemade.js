import React, {useEffect, useState} from "react"
import {Container, Row, Col} from "react-bootstrap"
import {useParams} from "react-router-dom";
import {API_PREFIX} from "../../config";
import axios from "axios";
import NavbarComponent from "../../components/ReusableComponents/NavbarComponent";
import Footer from "../../components/ReusableComponents/Footer";
import PersonIcon from "@material-ui/icons/Person"
import AttachMoneyIcon from "@material-ui/icons/AttachMoney"
import DateRangeIcon from "@material-ui/icons/DateRange"
import GroupIcon from "@material-ui/icons/Group"
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import AccessTimeIcon from "@material-ui/icons/AccessTime";


function TourDetailsRemade() {
    const [msgVisible, setMsgVisible] = useState(false)
    const {tour_id} = useParams()
    const [tourData, setTourData] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        setLoading(true)
        const url = API_PREFIX+"/tour/tour"
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
        <div className={"tourDetailsRemade"}>
            <NavbarComponent />
            {
                tourData ?
            <Container className={"mt-5 d-flex flex-column align-items-center justify-content-center h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row className={"col-xl-12"}>
                    <h1 className={"header"}>{tourData.general_data.header}</h1>
                </Row>
                <Row className={"mt-5 col-xl-10"}>
                    <p className={"description"}>{tourData.general_data.description}</p>
                </Row>
                <Row className={"mt-5 col-xl-10 mb-5"}>
                    <img src={tourData.image_url} alt={""} className={"main-image"}/>
                </Row>
                <Row className={"mt-5 d-flex flex-column align-items-center info-details w-100 col-xl-8"} >
                    <h2> Informacje szczegółowe </h2>
                    <Col >
                        <Row className={"d-flex align-items-center  mt-5"}>
                           <Col className={"d-flex justify-content-start align-items-center"}>
                               <AttachMoneyIcon  fontSize={"large"}/>
                               <p>{`Cena: `}<span>{`${tourData.general_data.price}`}</span></p>
                           </Col>
                            <Col className={"d-flex justify-content-start align-items-center"}>
                                <DateRangeIcon  fontSize={"large"}/>
                                <p>{`Data: `}<span>{`${tourData.general_data.start_date}-${tourData.general_data.end_date}`}</span></p>
                            </Col>
                        </Row>
                        <Row className={"d-flex align-items-center  mt-5"}>
                            <Col className={"d-flex justify-content-start align-items-center"}>
                                <PersonIcon  fontSize={"large"}/>
                                <p>{`Zapisanych: `}<span>{`${tourData.general_data.price}`}</span></p>
                            </Col>
                            <Col className={"d-flex justify-content-start align-items-center"}>
                                <AccessTimeIcon  fontSize={"large"}/>
                                <p>{`Pozostało: `}<span>{`${tourData.general_data.start_date}-${tourData.general_data.end_date}`}</span></p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container> : null}
            <Footer />
        </div>
    )
}



export default TourDetailsRemade