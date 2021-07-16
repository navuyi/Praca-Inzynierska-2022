import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";

import {Row, Col, Container, ListGroup, FormControl, Button} from "react-bootstrap"
import TourPlacesSelect from "../components/TourPlacesSelect";

import ToursPriceSlider from "../components/Tours/ToursPriceSlider";



import React, {useState} from "react";

function Tours(){
    const [tourPrice, setTourPrice] = useState([20,900])
    const [filterData, setFilterData] = useState({
        tourPlaces: [],
    })

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
                                  <TourPlacesSelect
                                    tourData={filterData}
                                    setTourData={setFilterData}
                                  />
                                </div>
                                <div className={"tours-filters-element"}>
                                    <label> Przedział cenowy </label>
                                    <ToursPriceSlider
                                        tourPrice={tourPrice}
                                        setTourPrice={setTourPrice}
                                    />
                                    <div className={"price-indicator"}>
                                        <Button variant={"light"}> {tourPrice[0]} </Button>
                                        <Button variant={"light"}> {tourPrice[1]} </Button>
                                    </div>
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