// Components
import NavbarComponent from "../components/ReusableComponents/NavbarComponent";
import HomeWelcomeView from "../components/Home/HomeWelcomeView";
import HomeTourPanel from "../components/Home/HomeTourPanel";
import HomeInfoPanel from "../components/Home/HomeInfoPanel";
import Footer from "../components/ReusableComponents/Footer";

// Dependencies
import {Col, Container, Row} from "react-bootstrap";

// Images
import img01 from '../images/home/tour01.jpg';
import img02 from '../images/home/tour02.jpg';
import img03 from '../images/home/tour03.jpg';

import question from '../images/home/question.jpg';
import tour from '../images/home/tours.jpg';
import crypto from '../images/home/crypto.jpg';
import axios from "axios";
import {API_PREFIX} from "../config";
import {useEffect, useState} from "react";
import {limitText} from "../utils/limitText";


function Home() {
    const [recents, setRecents] = useState([])

    useEffect(() => {
        fetch_recent_tours()
    }, [])

    function fetch_recent_tours(){
        const url = API_PREFIX + "/tour/tours/recent"
        const amount = 3
        const config = {
            params: {
                amount: amount
            }
        }
        axios.get(url, config).then(res => {
            console.log(res)
            setRecents(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="home">
            <NavbarComponent/>
            <HomeWelcomeView/>
            <Container fluid className={"p-0"}>
                <Row className={"justify-content-center"}>
                    <h1 className="recent-tours-header"> Najnowsze Oferty </h1>
                </Row>
                <Row className={"justify-content-lg-around "} style={{backgroundColor: `rgb(245,173,63)`}}>
                    {
                        recents.map((offer, index) => {
                            return(
                                <Col sm={12} lg={3} style={{padding: "0"}}>
                                    <HomeTourPanel
                                        tour_id={offer.tour_id}
                                        image={offer.url}
                                        title={limitText(offer.header, 32)}
                                        description={limitText(offer.description, 256)}
                                    />
                                </Col>
                            )
                        })
                    }
                </Row>
                <Row className={"justify-content-center"}>
                    <h1 className="recent-tours-header">{/* This is empty header just to separate sections */}</h1>
                </Row>
                <Row lg={12} className={"flex-column align-content-center"} style={{backgroundColor: "whitesmoke"}}>
                    <HomeInfoPanel
                        image={tour}
                        title="Et quasi architecto"
                        description="Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                    <HomeInfoPanel
                        image={crypto}
                        title="Et quasi architecto"
                        description="Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                    <HomeInfoPanel
                        image={question}
                        title="Et quasi architecto"
                        description="Labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    />
                </Row>
                <Footer/>
            </Container>
        </div>
    )
}

export default Home;