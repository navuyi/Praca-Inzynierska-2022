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

// Create form data
const formData = new FormData();

function GuideNewTour(){
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


        create_tour(formData)
            .then(res=>{
                console.log(res.data)
                window.alert(res.data.msg)
            })
            .catch(err=>{
                console.log(err);
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

                    <Row className={"mt-5"}>
                        <Button className={"w-100 m-3"} type="submit"> Opublikuj ofertę wycieczki </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default GuideNewTour;