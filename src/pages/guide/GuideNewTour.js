import {Container, Row, Col, Form, Button, FormControl} from "react-bootstrap";
import {useState, useEffect, Fragment} from 'react';
import FormData from 'form-data';
import GuideNewTourInputs from "../../components/GuideNewTourInputs";
import GuideNewTourPlan from "../../components/GuideNewTourPlan";
import GuideNewTourElectivesSelector from "../../components/GuideNewTourElectivesSelector";

import {create_tour} from "../../API_CALLS/create_tour";


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

        create_tour(formData)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.log(err);
            })
    }

    useEffect(()=>{
        console.log(tourData);
    },[tourData])




    return(
        <div className="guideNewTour">
            <Container className={"mt-lg-5 mt-5 cont"}>
                <Form onSubmit={handleSubmit}>
                    <Row lg={12}>
                        <h1 style={{color: "#1c1c1c", fontSize: "3em", fontWeight: "100"}}> Kreator wycieczki </h1>
                    </Row>
                    <GuideNewTourInputs
                        handleChange={handleChange}
                        tourData={tourData}
                        setTourData={setTourData}
                        mainUrl={mainUrl}
                        setMainUrl={setMainUrl}
                        formData={formData}
                    />
                    <Row className={"d-flex justify-content-center mt-5 mb-2"}> <h5 style={{textAlign: "center"}}> Plan wycieczki</h5> </Row>
                    <GuideNewTourPlan
                        tourData={tourData}
                        setTourData={setTourData}
                    />
                    <Row className={"d-flex justify-content-center mt-5 mb-2"}> <h5 style={{textAlign: "center"}}> Opcje dodatkowe </h5> </Row>
                    <GuideNewTourElectivesSelector

                    />
                    <Row className={"mt-5"}>
                        <Button className={"w-100 m-3"} type="submit"> Opublikuj ofertę wycieczki </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default GuideNewTour;