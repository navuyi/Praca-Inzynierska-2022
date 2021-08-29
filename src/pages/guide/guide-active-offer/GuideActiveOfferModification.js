import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button, FormControl, FormLabel} from "react-bootstrap"

import icon from "../../../images/icons/modify.svg"
import OfferDetails from "../../../components/OfferModification/OfferDetails";
import OfferTourPlan from "../../../components/OfferModification/OfferTourPlan";
import {API_PREFIX} from "../../../config";
import {useParams} from "react-router-dom";
import axios from "axios";
import Separator from "../../../components/ReusableComponents/Separator";
import OfferElectives from "../../../components/OfferModification/OfferElectives";
import OfferPriceList from "../../../components/OfferModification/OfferPriceList";


function GuideActiveOfferModification(props) {
    const [disabled, setDisabled] = useState(false)
    const {tourID} = useParams()

    const [generalData, setGeneralData] = useState({})
    const [electives, setElectives] = useState({})
    const [imageGallery, setImageGallery] = useState([])
    const [tourPlan, setTourPlan] = useState([])
    const [priceList, setPriceList] = useState([])
    const [importantInfo, setImportantInfo] = useState([])
    const [tourPlaces, setTourPlaces] = useState([])

    // Fetch data on component render
    useEffect(() => {
        fetchData()
    }, [])



    function fetchData(){
        const url = API_PREFIX+"/tour/tour"
        const config = {
            params: {
                tour_id: tourID
            }
        }
        axios.get(url, config).then(res => {
            // Handle date format <-- Formating from dd.mm.yyyy to yyyy-mm-dd is needed
            const[day1, month1, year1] = res.data.general_data.start_date.split(".")
            res.data.general_data.start_date = year1+"-"+month1+"-"+day1
            const[day2, month2, year2] = res.data.general_data.end_date.split(".")
            res.data.general_data.start_date = year2+"-"+month2+"-"+day2

            const enrollment_date = new Date(res.data.general_data.enrollment_deadline)
            res.data.general_data.enrollment_date = enrollment_date.toLocaleDateString()
            res.data.general_data.enrollment_time = enrollment_date.toLocaleTimeString()
            const[day3, month3, year3] = res.data.general_data.enrollment_date.split(".")
            res.data.general_data.enrollment_date = year3+"-"+month3+"-"+day3

            setGeneralData(res.data.general_data)
            setElectives(res.data.electives)
            setTourPlaces(res.data.tour_places)
            setTourPlan(res.data.tour_plan)
            if(res.data.electives.image_gallery === true){
                setImageGallery(res.data.image_gallery)
            }
            if(res.data.electives.important_info === true){
                setImportantInfo(res.data.important_info)
            }
            if(res.data.electives.price_list === true){
                setPriceList(res.data.price_list)
            }
            console.log(res.data)
        }).catch(err => {

        })
    }

    return (
        <div className={"guideActiveOfferModification"}>
            <Container className={"d-flex flex-column align-items-center"}>
                <Row className={"mt-5 d-flex flex-column justify-content-center align-items-center"}>
                    <img src={icon} alt={""} width={175}/>
                </Row>
                <Row className={"mt-5 d-flex flex-column justify-content-center align-items-center"}>
                    <h1 style={{}}> Modyfikacja oferty </h1>
                </Row>
                <OfferDetails
                    disabled={disabled}
                    general_data={generalData}
                    tourPlaces={tourPlaces}
                    setTourPlaces={setTourPlaces}
                />
                <Separator />
                <OfferTourPlan
                    disabled={disabled}
                    tourPlan={tourPlan}
                    setTourPlan={setTourPlan}
                />
                <Separator />
                <OfferElectives
                    disabled={disabled}
                    electives={electives}
                    setElectives={setElectives}
                />
                <Separator />
                {
                    !electives.price_list ? null :
                    <OfferPriceList
                        disabled={disabled}
                        priceList={priceList}
                        setPriceList={setPriceList}
                        visible={electives.price_list ? electives.price_list : false}
                    />
                }
                <Row className={"mb-5"}></Row>
            </Container>
        </div>
    )
}

export default GuideActiveOfferModification