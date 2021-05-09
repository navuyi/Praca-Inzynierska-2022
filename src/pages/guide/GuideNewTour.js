
import {Container, Row, Col, Form, Button, FormControl} from "react-bootstrap";
import {useState, useEffect} from 'react';
import Select from 'react-select';
import GuideNewTourInputs from "../../components/GuideNewTourInputs";
import GuideNewTourPlan from "../../components/GuideNewTourPlan";
import GuideNewTourDescription from "../../components/GuideNewTourDescription";

function GuideNewTour(){
    const [points, setPoints] = useState([]);
    const [image, setImage] = useState("");
    const empty_tour_data = {
        header: "",
        description: "",
        person_limit: "",
        price: "",
        start_date: "",
        end_date: "",
        tour_plan: [],
        main_image: Object
    }
    //TODO CREATE FORM WRITING FUNCTIONALITIES ONCHANGE UPDATE STATE
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

        console.log(tourData);
    }
    function handleSubmit(e){
        e.preventDefault();
    }

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
                                setImage={setImage}
                                image={image}
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
                           points={points}
                           setPoints={setPoints}
                       />
                    </Row>

                    <Row className={"mt-5"}>
                        <Button className={"w-100 m-3"}> Stwórz </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default GuideNewTour;