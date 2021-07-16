import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";

import {Row, Col, Container, ListGroup, FormControl} from "react-bootstrap"
import TourPlacesSelect from "../components/TourPlacesSelect";
import TextField from '@material-ui/core/TextField';



import {Slider} from "@material-ui/core";
import React, {useState} from "react";

function Tours(){
    const [tourPrice, setTourPrice] = useState([20, 900]);
    function handleChange(e, newValue){
        if(e.target.id === "tour-price"){
            setTourPrice(newValue)
            console.log(newValue)
        }
    }

    return(
    <div className="tours">
        <NavbarComponent />
        <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
            <Row style={{minHeight: "75vh"}}>
                <Col lg={2} sm={12} style={{backgroundColor: "orange", padding: "0"}}>
                    <Container>
                        <Row style={{margin: "0 0"}}>
                            <div className={"tours-filters-container"}>
                                <h1> Filtry </h1>
                                <div className={"tours-filters-element"}>
                                  <label> Miejsce </label>
                                  <TourPlacesSelect />
                                </div>
                                <div className={"tours-filters-element"}>
                                    <label> Przedział cenowy </label>
                                    <Slider
                                        id="tour-price"
                                        min={20}
                                        max={1000}
                                        step={1}
                                        onChange={handleChange}
                                        value={tourPrice}
                                        color={"secondary"}
                                        valueLabelDisplay="auto"
                                    />
                                </div>
                                <div className={"tours-filters-element"}>
                                    <label> Data początkowa </label>
                                    <FormControl
                                        id="start_date"
                                        type="date"
                                    />
                                </div>
                                <div className={"tours-filters-element"}>
                                    <label> Data końcowa </label>
                                    <FormControl
                                        id="start_date"
                                        type="date"
                                    />
                                </div>
                            </div>

                        </Row>
                    </Container>
                </Col>
                <Col lg={8} sm={12} style={{padding: "0"}} >
                    asd
                </Col>
                <Col lg={2} sm={12} style={{padding: "0"}} >

                </Col>
            </Row>
        </Container>
        <Footer />
    </div>
)
}
export default Tours;