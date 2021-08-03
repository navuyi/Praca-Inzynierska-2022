
import React, {useEffect, useState} from "react";

import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";
import {Row, Col, Container, Button, FormControl, Dropdown, DropdownButton, FormGroup} from "react-bootstrap"
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
    const [toursFound, setToursFound] = useState(0)
    const [filterData, setFilterData] = useState({
        tour_price: [20, 900],
        tour_places: [],
        tour_date: ["",""]
    })
    const [resultsConfig, setResultsConfig] = useState({
        results_per_page: 5,
        sort_by: "most_recent",
        page: 1
    })

    function handleChange(e, value){
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
        else if(e.target.id === "sort-select"){
            const update = {...resultsConfig, sort_by: e.target.value, page: 1}
            setResultsConfig(update)
        }
        else if(e.target.id === "results-per-page-select"){
            const update = {...resultsConfig, results_per_page: e.target.value, page: 1}
            setResultsConfig(update)
        }
    }
    function handlePage(e, value){
        if(value === resultsConfig.page){
            return
        }
        const update = {...resultsConfig, page: value}
        setResultsConfig(update)
    }

    useEffect(()=>{
        //console.log(stringify(filterData))
        fetchData()
    }, [filterData, resultsConfig])

    useEffect(()=>{
        fetchData()
    }, []);

    function fetchData(){
        setTourData([])
        setLoading(true)
        const url = "http://167.99.143.194/api/tour/tours"
        const params = {...filterData, ...resultsConfig};
        window.scroll(0, null)
        console.log(params)

        axios.get(url, {params})
            .then(res => {
                setTourData(res.data.tours_data)
                setToursFound(res.data.tours_found)
                setLoading(false)
            })
            .catch(err => {
                console.log(err.response)
                setTourData([])
                setLoading(false)
            })
    }







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
                <Col lg={8} sm={12} style={{padding: "0"}} className={"d-flex  justify-content-center align-items-start"}>
                        <Container style={{flexGrow: "1", height: "100%"}} className={"d-flex flex-column "}>
                            <Row className={"center-header d-flex justify-content-between align-items-center "}>
                                <Col xl={3} >
                                    <p> Wyszukano ofert: <span> {toursFound} </span></p>
                                </Col>
                                <Col xl={5}  className={"header-sort d-flex flex-row align-items-start justify-content-xl-center align-items-xl-center mt-3 mt-xl-0"}>
                                    <label> Wyników na stronę </label>
                                    <FormControl as={"select"}  className={"w-25"} onChange={handleChange} id="results-per-page-select" value={resultsConfig.results_per_page}>
                                        <option value={5}> 5 </option>
                                        <option value={10}> 10 </option>
                                        <option value={50}> 50 </option>
                                        <option value={100}> 100 </option>
                                    </FormControl>
                                </Col>
                                <Col xl={4}  className={" header-sort d-flex flex-row align-items-start justify-content-xl-center align-items-xl-center mt-3 mt-xl-0"}>
                                    <label> Sortowanie: </label>
                                    <FormControl as={"select"}   className={"w-50"} onChange={handleChange} id="sort-select" value={resultsConfig.sort_by}>
                                        <option value={"most_recent"}> Od najnowszych </option>
                                        <option value={"price"}> Cena rosnąco </option>
                                        <option value={"price_desc"}> Cena malejąco </option>
                                    </FormControl>
                                </Col>
                            </Row>
                            <Row className={"center-body"} style={{flexGrow: "1"}}>
                                { loading ? <CircularProgress  size={120}  color={"secondary"} /> : null}
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
                                                image_url={tour.image_url}
                                            />
                                        )
                                    })
                                }
                            </Row>
                            <div className={"center-footer"}>
                                <Pagination count={Math.ceil(toursFound/resultsConfig.results_per_page)} variant="outlined" color={"secondary"} page={resultsConfig.page} onChange={handlePage}/>
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