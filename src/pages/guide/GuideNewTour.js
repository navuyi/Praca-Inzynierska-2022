import {Container, Row, Col, Form, Button, FormControl} from "react-bootstrap";
import {useState, useEffect} from 'react';
import FormData from 'form-data';

import GuideNewTourInputs from "../../components/GuideNewTourInputs";
import GuideNewTourPlan from "../../components/GuideNewTourPlan";
import GuideNewTourDescription from "../../components/GuideNewTourDescription";

import {create_tour} from "../../API_CALLS/create_tour";

const formData = new FormData();
function GuideNewTour(){
    const [mainUrl, setMainUrl] = useState("");
    const empty_tour_data = {
        guide_id: 303,
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
                        <h1> Kreator wycieczki </h1>
                    </Row>
                    <Row  className={"d-flex justify-content-lg-center"}>
                        <Col lg={4}>
                            <GuideNewTourInputs
                                handleChange={handleChange}
                                tourData={tourData}
                                setTourData={setTourData}
                                mainUrl={mainUrl}
                                setMainUrl={setMainUrl}
                                formData={formData}
                            />
                        </Col>
                        <Col lg={8} >
                            <GuideNewTourDescription
                                handleChange={handleChange}
                                tourData={tourData}
                            />
                        </Col>
                    </Row>
                    <h3 id="plan-input-header"> Plan wycieczki </h3>
                    <Row className={"d-flex flex-row  mt-lg-5 align-items-start"}>
                       <GuideNewTourPlan
                          tourData = {tourData}
                          setTourData = {setTourData}
                       />
                    </Row>
                    <Row className={"mt-5"}>
                        <Button className={"w-100 m-3"} type="submit"> Stwórz </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default GuideNewTour;