
import React, {useEffect, useState} from "react";

import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import {Row, Col, Container, Button, FormControl, Dropdown, DropdownButton} from "react-bootstrap"
import {Pagination} from "@material-ui/lab";
import {CircularProgress} from "@material-ui/core";

import TourPlacesSelect from "../../components/TourPlacesSelect";

import ToursPriceSlider from "../../components/Tours/ToursPriceSlider";
import ToursTourPanel from "../../components/Tours/ToursTourPanel";
import {useHistory} from "react-router-dom";
import {stringify} from "querystring"
import axios from "axios";

function Tours(){
    const history = useHistory();
    const [loading, setLoading] = useState(true)
    const [tourData, setTourData] = useState([])
    const [filterData, setFilterData] = useState({
        tour_price: [20, 900],
        tour_places: [],
        tour_date: ["",""]
    })

    function handleChange(e){
        if(e.target.id === "start_date"){
            const tmp_date = filterData.tour_date;
            tmp_date[0] = e.target.value;
            const update = {...filterData, tour_date: tmp_date}
            setFilterData(update)
        }else if(e.target.id === "end_date"){
            const tmp_date = filterData.tour_date;
            tmp_date[1] = e.target.value;
            const update = {...filterData, tour_date: tmp_date}
            setFilterData(update)
        }
    }

    useEffect(()=>{
        //console.log(stringify(filterData))
        fetchData(stringify(filterData))
    }, [filterData])

    useEffect(()=>{
        fetchData(stringify(filterData))
    }, []);

    function fetchData(queryString){
        const url = "http://167.99.143.194:5000/tour/tours"
        const params = filterData;

        setLoading(true)
        axios.get(url, {params})
            .then(res => {
                console.log(res.data)
                setTourData(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response)
                setTourData([])
                setLoading(false)
            })
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
                                        filterData={filterData}
                                        setFilterData={setFilterData}
                                    />
                                    <div className={"price-indicator"}>
                                        <Button variant={"light"}> {filterData.tour_price[0]} </Button>
                                        <Button variant={"light"}> {filterData.tour_price[1]} </Button>
                                    </div>
                                </div>
                                <div className={"tours-filters-element"}>
                                    <label> Data początkowa </label>
                                    <FormControl
                                        id="start_date"
                                        type="date"
                                        value={filterData.tour_date[0]}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className={"tours-filters-element"}>
                                    <label> Data końcowa </label>
                                    <FormControl
                                        id="end_date"
                                        type="date"
                                        value={filterData.tour_date[1]}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                        </Row>
                    </Container>
                </Col>
                <Col lg={8} sm={12} style={{padding: "0"}} className={"d-flex  justify-content-center align-items-center"}>
                    { loading ? <CircularProgress  size={120}  color={"secondary"} /> :
                        <Container style={{marginTop: "2rem"}}>
                            <div className={"center-header"}>
                                <p> Wyszukano ofert: <span> 56 </span></p>
                                <DropdownButton id="dropdown-basic-button" title="Sortuj" style={{height: "38px"}}
                                                variant="danger">
                                    <Dropdown.Item href="#/action-1"> Cena rosnąco </Dropdown.Item>
                                    <Dropdown.Item href="#/action-2"> Cena malejąco </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3"> Czas trwania rosnąco </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3"> Czas trwania malejąco </Dropdown.Item>
                                </DropdownButton>
                            </div>
                            <div className={"center-body"}>
                                {
                                    tourData.map((tour, index) => {
                                        return (
                                            <ToursTourPanel
                                                key={index}
                                                tourId={tour.general_data.id} // Change it when data is fetched from server
                                                header={tour.general_data.header}
                                                description={tour.general_data.description}
                                                person_limit={tour.general_data.person_limit}
                                                guide={tour.general_data.guide_id}
                                                price={tour.general_data.price}
                                                start_date={tour.general_data.start_date}
                                                end_date={tour.general_data.end_date}
                                                guide_fname={tour.guide_data.f_name}
                                                guide_lname={tour.guide_data.l_name}
                                            />
                                        )
                                    })
                                }
                            </div>
                            <div className={"center-footer"}>
                                <Pagination count={12} variant="outlined" color={"secondary"} />
                            </div>
                        </Container>
                    }
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