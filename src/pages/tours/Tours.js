
import React, {useState} from "react";

import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import {Row, Col, Container, Button, FormControl, Dropdown, DropdownButton} from "react-bootstrap"
import {Pagination} from "@material-ui/lab";
import TourPlacesSelect from "../../components/TourPlacesSelect";
import {useQueryParams, NumberParam, StringParam, withDefault, ArrayParam, useQueryParam} from "use-query-params";
import ToursPriceSlider from "../../components/Tours/ToursPriceSlider";
import ToursTourPanel from "../../components/Tours/ToursTourPanel";
import {useHistory} from "react-router-dom";
import {useEffect} from "react";


function Tours(){
    const history = useHistory();
    const [tourPrice, setTourPrice] = useState([20,900])
    const [query, setQuery] = useQueryParams({
        x: withDefault(NumberParam, 39),
        q: StringParam,
        tourDate: withDefault(ArrayParam, ["", ""]),
    });



    const [filterData, setFilterData] = useState({
        tourPlaces: [],
    })
    const [tours, setTours] = useState([1,2,3,4,522]) // numbers for now




    function handleChange(e){
        if(e.target.id === "start_date"){
            const date = e.target.value;
            const tmp = query;
            tmp.tourDate[0]=date;
            setQuery(tmp, 'push')
        }
        else if(e.target.id === "end_date"){
            const date = e.target.value;
            const tmp = query;
            tmp.tourDate[1]=date;
            console.log(tmp)
            setQuery(tmp, 'push')
        }
    }


    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    return(
    <div className="tours">
        <NavbarComponent />
        <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
            <Row style={{minHeight: "75vh"}}>
                <Col lg={2} sm={12} style={{backgroundColor: "orange", padding: "0"}}>
                    <Container style={{position: "sticky", top: "3rem", padding: "2rem 0"}}>
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
                                        value={query.tourDate[0]}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={"tours-filters-element"}>
                                    <label> Data końcowa </label>
                                    <FormControl
                                        id="end_date"
                                        type="date"
                                        value={query.tourDate[1]}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </Row>
                    </Container>
                </Col>
                <Col lg={8} sm={12} style={{padding: "0"}} >
                    <Container style={{marginTop: "2rem"}}>
                        <div className={"center-header"}>
                            <p> Wyszukano ofert: <span> 56 </span> </p>
                            <DropdownButton id="dropdown-basic-button" title="Sortuj" style={{height: "38px"}} variant="danger">
                                <Dropdown.Item href="#/action-1"> Cena rosnąco </Dropdown.Item>
                                <Dropdown.Item href="#/action-2"> Cena malejąco </Dropdown.Item>
                                <Dropdown.Item href="#/action-3"> Czas trwania rosnąco </Dropdown.Item>
                                <Dropdown.Item href="#/action-3"> Czas trwania malejąco </Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className={"center-body"}>
                            {
                                tours.map((tour, index) => {
                                    return(
                                        <ToursTourPanel
                                            key={index}
                                            tourId={123} // Change it when data is fetched from server
                                        />
                                    )

                                })
                            }
                        </div>
                        <div className={"center-footer"}>
                            <Pagination count={12} variant="outlined" color={"secondary"} />
                        </div>
                    </Container>
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