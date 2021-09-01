import {Button, Container, Form, Row} from "react-bootstrap";
import {useEffect, useState} from 'react';
import FormData from 'form-data';
import GuideNewTourInputs from "../../../components/GuideNewTour/GuideNewTourInputs";
import GuideNewTourPlan from "../../../components/GuideNewTour/GuideNewTourPlan";
import GuideNewTourElectivesSelector from "../../../components/GuideNewTour/GuideNewTourElectivesSelector";
import GuideNewTourImageGallery from "../../../components/GuideNewTour/GuideNewTourImageGallery";
import GuideNewTourPriceList from "../../../components/GuideNewTour/GuideNewTourPriceList";
import GuideNewTourImportantInfo from "../../../components/GuideNewTour/GuideNewTourImportantInfo";
import Separator from "../../../components/ReusableComponents/Separator";
import SeparatorShort from "../../../components/ReusableComponents/SeparatorShort";
import {CircularProgress} from "@material-ui/core";

import {api_tour_new_tour} from "../../../API_CALLS/api_tour_new_tour";

import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router-dom";
import {refesh_token} from "../../../API_CALLS/api_authentication_token_refresh";
import {_logout} from "../../../utils/_logout";

// Create form data - it changes on every render
const formData = new FormData();

function GuideNewTour() {
    const history = useHistory();

    // Create data for post submit informations
    const [errorInfo, setErrorInfo] = useState({
        visible: false,
        text: ""
    });
    const [upload, setUpload] = useState(false)


    const [mainUrl, setMainUrl] = useState("");
    const empty_tour_data = {
        guide_id: localStorage.getItem("user_id"),  // Guide ID fetch from localStorage
        header: "",
        description: "",
        person_limit: "",
        price: "",
        start_date: "",
        end_date: "",
        tour_plan: [],
        tour_places: [],
        enrollment_deadline_date: "",
        enrollment_deadline_time: ""
    }
    const [tourData, setTourData] = useState(empty_tour_data)
    const [electives, setElectives] = useState({
        priceList: false,
        importantInfo: false,
        imageGallery: false
    })
    const [priceList, setPriceList] = useState([]);
    const [importantInfo, setImportantInfo] = useState([]);

    useEffect(() => {
        setErrorInfo({...errorInfo, visible: false});
    }, [tourData, priceList, importantInfo, electives, mainUrl])

    function handleChange(e) {
        // Check if price and person limit is a numeric value
        if (e.target.id == "person_limit" || e.target.id == "price") {
            if (isNaN(e.target.value)) {
                return
            }
        }
        const update = {...tourData, [e.target.id]: e.target.value};
        setTourData(update);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setUpload(true)
        // Check if tour plan is provided
        if (tourData.tour_plan.length <= 0) {
            window.alert("Proszę wypełnić plan wycieczki");
            return true
        }

        // Add tourData to formData object
        formData.set('tour_data', JSON.stringify(tourData));
        formData.set('electives', JSON.stringify(electives));

        // Add conditional elements
        if (electives.priceList === true) {
            formData.set('priceList', JSON.stringify(priceList));
        }
        if (electives.importantInfo === true) {
            formData.set('importantInfo', JSON.stringify(importantInfo));
        }
        // Image gallery will be sent if images were added and then the section was unchecked - checking it on the server side //


        api_tour_new_tour(formData)
            .then(res => {
                const data = res.data;
                // Redirect to success page
                setUpload(false)
                history.push("/new-tour-success");
            })
            .catch(err => {
                if (err.response.status === 401) {
                    // Access token might be expired, try refreshing
                    refesh_token()
                        .then(res => {
                            localStorage.setItem("access_token", res.data.access_token)     // <-- set new access token
                            handleSubmit(new Event("submit"))       // <-- successful token refresh, passing custom Event becouse the function takes event as argument
                        })
                        .catch(err => {
                            console.log(err)
                            console.log(err.response)
                            _logout()                                      // <-- logout in case of failure
                            history.push("/login")      // <-- redirect to to login page in case of failure
                        })
                } else {
                    const data = err.response.data;
                    setUpload(false)
                    window.scrollTo(0, document.body.scrollHeight);
                    setErrorInfo({
                        visible: true,
                        text: data.message
                    });
                }
            })
    }


    return (
        <div className="guideNewTour">
            <Container className={"cont"}>
                <Row lg={12}>
                    <h1 style={{color: "#222222", fontWeight: "100"}}> Kreator wycieczki </h1>
                </Row>
                <Form onSubmit={handleSubmit}>
                    <GuideNewTourInputs
                        handleChange={handleChange}
                        tourData={tourData}
                        setTourData={setTourData}
                        mainUrl={mainUrl}
                        setMainUrl={setMainUrl}
                        formData={formData}
                    />
                    <Separator/>
                    <Row className={"d-flex justify-content-center"}><h2
                        style={{textAlign: "center", color: "#222222"}}> Plan wycieczki</h2></Row>
                    <GuideNewTourPlan
                        tourData={tourData}
                        setTourData={setTourData}
                    />
                    <Separator/>
                    <Row className={"d-flex justify-content-center"}><h2
                        style={{textAlign: "center", color: "#222222"}}> Opcje dodatkowe </h2></Row>
                    <GuideNewTourElectivesSelector
                        electives={electives}
                        setElectives={setElectives}
                    />
                    <SeparatorShort/>
                    {electives.priceList ?
                        <GuideNewTourPriceList priceList={priceList} setPriceList={setPriceList}/> : null}
                    <SeparatorShort/>
                    {electives.importantInfo ? <GuideNewTourImportantInfo importantInfo={importantInfo}
                                                                          setImportantInfo={setImportantInfo}/> : null}
                    <SeparatorShort/>
                    {electives.imageGallery ? <GuideNewTourImageGallery formData={formData}/> : null}


                    <Row className={"mt-5 d-flex justify-content-center pb-5"}>
                        {
                            upload ?
                                <div className={"upload-indicator"}>
                                    <p> Proszę czekać </p>
                                    <CircularProgress size={"120px"} color={"primary"}/>
                                </div> :
                                errorInfo.visible ?
                                    <Alert severity={"error"} variant={"filled"}> {errorInfo.text} </Alert> :
                                    <Button className={"w-50 pt-3 pb-3"} type="submit"> Opublikuj ofertę
                                        wycieczki </Button>
                        }
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default GuideNewTour;