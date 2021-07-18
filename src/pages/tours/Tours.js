
import React, {useState} from "react";

import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import {Row, Col, Container, Button, FormControl, Dropdown, DropdownButton} from "react-bootstrap"
import {Pagination} from "@material-ui/lab";
import TourPlacesSelect from "../../components/TourPlacesSelect";
import {createTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/core";
import ToursPriceSlider from "../../components/Tours/ToursPriceSlider";
import ToursTourPanel from "../../components/Tours/ToursTourPanel";
import {useHistory} from "react-router-dom";



function Tours(){
    const history = useHistory();
    const [tourPrice, setTourPrice] = useState([20,900])
    const [filterData, setFilterData] = useState({
        tourPlaces: [],
    })
    const [tours, setTours] = useState([1,2,3,4,5]) // numbers for now
    const theme = createTheme({
        palette: {
            primary: {
                light: '#ffffff',
                main: '#ffffff',
                dark: '#ffffff',
                contrastText: '#ffffff'
            },
        },
    });

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
                                            tourId={123} // Change it when data is fetched from server
                                        />
                                    )

                                })
                            }
                        </div>
                        <div className={"center-footer"}>
                            <ThemeProvider theme={theme}>
                                <Pagination count={12} variant="outlined" color={"primary"} />
                            </ThemeProvider>
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