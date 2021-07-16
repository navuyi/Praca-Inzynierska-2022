import {Container, Row, Col, Form, Button, FormControl} from "react-bootstrap";
import {useState, useEffect, Fragment} from 'react';
import FormData from 'form-data';
import GuideNewTourInputs from "../../components/GuideNewTourInputs";
import GuideNewTourPlan from "../../components/GuideNewTourPlan";
import GuideNewTourElectivesSelector from "../../components/GuideNewTourElectivesSelector";
import GuideNewTourImageGallery from "../../components/GuideNewTourImageGallery";
import GuideNewTourPriceList from "../../components/GuideNewTourPriceList";
import GuideNewTourImportantInfo from "../../components/GuideNewTourImportantInfo";
import Separator from "../../components/Separator";
import SeparatorShort from "../../components/SeparatorShort";


import {create_tour} from "../../API_CALLS/create_tour";


import {Alert} from "@material-ui/lab";
import {useHistory} from "react-router-dom";


// Create form data - it changes on every render
const formData = new FormData();

function GuideNewTour(){
    const history = useHistory();

    // Create data for post submit informations
    const [errorInfo, setErrorInfo] = useState({
        visible: false,
        text: ""
    });
    const [mainUrl, setMainUrl] = useState("");
    const empty_tour_data = {
        guide_id: 1,  // For now it is set to 1 later it will be fetched from cookie or sth
        header: "",
        description: "",
        person_limit: "",
        price: "",
        start_date: "",
        end_date: "",
        tour_plan: [],
        tour_places: []
    }
    const [tourData, setTourData] = useState(empty_tour_data)
    const [electives, setElectives] = useState({
        priceList: false,
        importantInfo: false,
        imageGallery: false
    })
    const [priceList, setPriceList] = useState([]);
    const [importantInfo, setImportantInfo] = useState([]);

    useEffect(()=>{
        setErrorInfo({...errorInfo, visible: false});
    }, [tourData, priceList, importantInfo, electives, mainUrl])


    function handleChange(e){
        // Check if price and person limit is a numeric value
        if(e.target.id == "person_limit" || e.target.id == "price"){
            if(isNaN(e.target.value)){
                return
            }
        }
        const update = {...tourData, [e.target.id]: e.target.value};
        setTourData(update);
    }

    function handleSubmit(e){
        e.preventDefault();
        // Check if tour plan is provided
        if(tourData.tour_plan.length <= 0){
            window.alert("Proszę wypełnić plan wycieczki");
            return true
        }

        // Add tourData to formData object
        formData.set('tour_data', JSON.stringify(tourData));
        formData.set('electives', JSON.stringify(electives));

        // Add conditional elements
        if(electives.priceList === true){
            formData.set('priceList', JSON.stringify(priceList));
        }
        if(electives.importantInfo === true){
            formData.set('importantInfo', JSON.stringify(importantInfo));
        }
        // Image gallery will be sent if images were added and then the section was unchecked - checking it on the server side //

        console.log(tourData);
        console.log(electives);
        console.log(priceList);
        console.log(importantInfo);

        create_tour(formData)
            .then(res=>{
                const data = res.data;
                // Redirect to success page
                history.push("/account/guide/new-tour-success");
            })
            .catch(err=>{
                const data = err.response.data;
                setErrorInfo({
                    visible: true,
                    text: data.message
                });
            })
    }



    return(
        <div className="guideNewTour">
            <Container className={"mt-lg-5 mt-5 cont"}>
                <Form onSubmit={handleSubmit}>
                    <Row lg={12}>
                        <h1 style={{color: "#1d6cf5", fontWeight: "100"}}> Kreator wycieczki </h1>
                    </Row>
                    <GuideNewTourInputs
                        handleChange={handleChange}
                        tourData={tourData}
                        setTourData={setTourData}
                        mainUrl={mainUrl}
                        setMainUrl={setMainUrl}
                        formData={formData}
                    />
                    <Separator />
                    <Row className={"d-flex justify-content-center"}> <h2 style={{textAlign: "center", color: "#1d6cf5"}}> Plan wycieczki</h2> </Row>
                    <GuideNewTourPlan
                        tourData={tourData}
                        setTourData={setTourData}
                    />
                    <Separator />
                    <Row className={"d-flex justify-content-center"}> <h2 style={{textAlign: "center", color: "#1d6cf5"}}> Opcje dodatkowe </h2> </Row>
                    <GuideNewTourElectivesSelector
                        electives={electives}
                        setElectives={setElectives}
                    />
                    <SeparatorShort />
                    { electives.priceList ? <GuideNewTourPriceList priceList={priceList} setPriceList={setPriceList} /> : null }
                    <SeparatorShort />
                    { electives.importantInfo ? <GuideNewTourImportantInfo importantInfo={importantInfo} setImportantInfo={setImportantInfo} /> : null }
                    <SeparatorShort />
                    { electives.imageGallery ? <GuideNewTourImageGallery formData={formData} /> : null }


                    <Row className={"mt-5 d-flex justify-content-center pb-5"}>
                        {
                            errorInfo.visible ?
                                <Alert severity={"error"} variant={"filled"}> {errorInfo.text} </Alert> :
                                <Button className={"w-50 pt-3 pb-3"} type="submit"> Opublikuj ofertę wycieczki </Button>
                        }
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default GuideNewTour;