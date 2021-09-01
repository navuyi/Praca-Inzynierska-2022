import React, {useEffect, useState} from "react";
import {Container, Row, Col, Button, FormControl, FormLabel} from "react-bootstrap"

import icon from "../../../images/icons/modify.svg"
import OfferDetails from "../../../components/OfferModification/OfferDetails";
import OfferTourPlan from "../../../components/OfferModification/OfferTourPlan";
import {API_PREFIX} from "../../../config";
import {CircularProgress} from "@material-ui/core";
import {useParams} from "react-router-dom";
import axios from "axios";
import Separator from "../../../components/ReusableComponents/Separator";
import OfferElectives from "../../../components/OfferModification/OfferElectives";
import OfferPriceList from "../../../components/OfferModification/OfferPriceList";
import OfferImportantInfo from "../../../components/OfferModification/OfferImportantInfo";
import OfferImageGallery from "../../../components/OfferModification/OfferImageGallery";
import {refesh_token} from "../../../API_CALLS/api_authentication_token_refresh";
import {Alert} from "@material-ui/lab";
import FormData from "form-data";

const formData = new FormData();

function GuideActiveOfferModification(props) {
    const [disabled, setDisabled] = useState(true)
    const {tourID} = useParams()
    const [sending, setSending] = useState(false)
    const [modified, setModified] = useState({
        done: false,
        success: false
    })
    const [responseMsg, setResponseMsg] = useState("")

    const [generalData, setGeneralData] = useState({})
    const [electives, setElectives] = useState({})
    const [imageGallery, setImageGallery] = useState([])
    const [tourPlan, setTourPlan] = useState([])
    const [priceList, setPriceList] = useState([])
    const [importantInfo, setImportantInfo] = useState([])
    const [tourPlaces, setTourPlaces] = useState([])

    const [imagesToDelete, setImagesToDelete] = useState([])


    // Fetch data on component render
    useEffect(() => {
        fetchData()
    }, [])

    function restoreDefault(){
        setTimeout(() => {
            setModified({
                done: false,
                success: false
            })
            setSending(false)
            setDisabled(true)
        }, 3000)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(disabled === true){
            setDisabled(prevState => !prevState)
        }
        else if(disabled === false){
            const data = {
                tour_id: tourID,
                general_data: {...generalData},
                electives: {...electives},
                images_to_delete: [...imagesToDelete],
                tour_plan: [...tourPlan],
                price_list: [...priceList],
                important_info: [...importantInfo],
                tour_places: [...tourPlaces]
            }

            // Using formData instead of regular JSON to upload files as well
            formData.set("tour_id", JSON.stringify(tourID))
            formData.set("general_data", JSON.stringify({...generalData}))
            formData.set("electives", JSON.stringify({...electives}))
            formData.set("images_to_delete", JSON.stringify([...imagesToDelete]))
            formData.set("tour_plan", JSON.stringify([...tourPlan]))
            formData.set("price_list", JSON.stringify([...priceList]))
            formData.set("important_info", JSON.stringify([...importantInfo]))
            formData.set("tour_places", JSON.stringify([...tourPlaces]))

            const url = API_PREFIX+"/guide/offer"
            const access_token = localStorage.getItem("access_token")
            const config = {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            }
            console.log(data)
            setDisabled(true)
            setSending(true)
            axios.put(url, formData, config).then(res => {
                console.log(res)
                setResponseMsg(res.data.message)
                setSending(false)
                setModified({
                    done: true,
                    success: true
                })
                restoreDefault()
            }).catch(err => {
                console.log(err)
                if(err.response){
                    if(err.response.status === 401){
                        refesh_token().then(res => {
                            localStorage.setItem("access_token", res.data.access_token)
                            handleSubmit(new Event("submit"))
                        })
                    }
                    else{
                        setResponseMsg(err.response.data.message)
                        setSending(false)
                        setModified({
                            done: true,
                            success: false
                        })
                        restoreDefault()
                    }
                }
            })
        }
        }


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
            res.data.general_data.end_date = year2+"-"+month2+"-"+day2

            const enrollment_date = new Date(res.data.general_data.enrollment_deadline)
            res.data.general_data.enrollment_deadline_date = enrollment_date.toLocaleDateString()
            res.data.general_data.enrollment_deadline_time = enrollment_date.toLocaleTimeString()
            const[day3, month3, year3] = res.data.general_data.enrollment_deadline_date.split(".")
            res.data.general_data.enrollment_deadline_date = year3+"-"+month3+"-"+day3

            if(res.data.general_data){
                setGeneralData(res.data.general_data)
            }
            if(res.data.electives){
                setElectives(res.data.electives)
            }
            if(res.data.tour_places){
                setTourPlaces(res.data.tour_places)
            }
            if(res.data.tour_plan){
                setTourPlan(res.data.tour_plan)
            }
            if(res.data.electives.image_gallery === true){
                setImageGallery(res.data.image_gallery)
            }
            if(res.data.electives.important_info === true){
                setImportantInfo(res.data.important_info)
            }
            if(res.data.electives.price_list === true){
                setPriceList(res.data.price_list)
            }
        }).catch(err => {

        })
    }

    return (
        <div className={"guideActiveOfferModification"}>
            <Container  className={"d-flex flex-column align-items-center"}>
                <Row className={"mt-5 d-flex flex-column justify-content-center align-items-center"}>
                    <img src={icon} alt={""} width={175}/>
                </Row>
                <Row className={"mt-5 d-flex flex-column justify-content-center align-items-center col-xl-6"}>
                    <h1 style={{}}> Modyfikacja oferty </h1>
                </Row>
                <Row className={"mt-3 d-flex flex-column justify-content-center align-items-center col-xl-4"} style={{minHeight: "100px"}}>
                    {
                        modified.done === true && modified.success === true ? <Alert severity={"success"} >{responseMsg}</Alert> : null
                    }
                    {
                        modified.done === true && modified.success === false ? <Alert severity={"error"}>{responseMsg} </Alert> : null
                    }
                    {
                        sending === false && modified.done === false ? <Button className={"w-100"} onClick={handleSubmit} variant={disabled ? "info" : "danger"}> {disabled ? "Modyfikuj" : "Zapisz zmiany"} </Button> : null
                    }
                    {
                        sending ? <CircularProgress size={80}/> : null
                    }
                </Row>
                <OfferDetails
                    disabled={disabled}
                    general_data={generalData}
                    setGeneralData={setGeneralData}
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
                {
                    !electives.important_info ? null :
                        <OfferImportantInfo
                            disabled={disabled}
                            imporantInfo={importantInfo}
                            setImportantInfo={setImportantInfo}
                        />
                }
                {
                    !electives.image_gallery ? null:
                        <OfferImageGallery
                            disabled={disabled}
                            imageGallery={imageGallery}
                            setImageGallery={setImageGallery}
                            imagesToDelete={imagesToDelete}
                            setImagesToDelete={setImagesToDelete}
                        />
                }
                <Row className={"mb-5"}></Row>
            </Container>
        </div>
    )
}

export default GuideActiveOfferModification