import React from "react"
import NavbarComponent from "../../components/NavbarComponent";
import Footer from "../../components/Footer";

import {Container, Row, Col, Button, FormControl, DropdownButton, Dropdown} from "react-bootstrap"
import TourPanelLabel from "../../components/Tours/TourPanelLabel";

import img from "../../images/home/tour03.jpg";
import Separator from "../../components/Separator";
import PersonIcon from "@material-ui/icons/Person";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import DateRangeIcon from "@material-ui/icons/DateRange";
import GroupIcon from "@material-ui/icons/Group";
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';

import TourPriceList from "../../components/Tours/TourPriceList";
import TourImportantInfo from "../../components/Tours/TourImportantInfo";

function TourDetails(){

    // I will use query string to indicate tour id and then fetch full data
    //const search = useLocation().search;
    //console.log(search);
    //const values = queryString.parse(search)
    //console.log(values);

    const arr = [1,2,3,4,3]

    return(
        <div className={"tourDetails"}>
            <NavbarComponent/>
            <Container fluid className={"h-100"} style={{marginTop: "0em", top: "0", flexGrow: "1"}}>
                <Row style={{minHeight: "75vh"}}>
                    <Col lg={2} sm={12} style={{backgroundColor: "orange", padding: "0"}} className={"d-flex justify-content-center align-items-center"}>

                    </Col>
                    <Col lg={8} sm={12} style={{padding: "0"}} >
                        <Container className={"details-body d-flex flex-column align-items-center justify-content-center"}>
                            <Row className={"d-flex justify-content-center"}>
                                <img src={img} alt={""} className="details-main-img"/>
                            </Row>
                            <Row className={"col-xl-10 mt-5"}>
                                <h1> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </h1>
                            </Row>
                            <Row className={"col-xl-10 mt-5"}>
                                <span className="description">
                                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
                                </span>
                            </Row>
                            <Separator />
                            <Row className={"w-100 d-flex flex-row justify-content-around"}>
                                <Col xl={5} className={"info-panel d-flex flex-column justify-content-start align-items-center mb-5 mb-xl-0"}>
                                    <TourPanelLabel
                                        image={<AttachMoneyIcon fontSize={"medium"} />}
                                        text="Cena"
                                        value="XYZ"
                                    />
                                    <TourPanelLabel
                                        image={<DateRangeIcon fontSize={"medium"} />}
                                        text="Data"
                                        value=" od dd/mm/YY do dd/mm/YY"
                                    />
                                    <TourPanelLabel
                                        image={<GroupIcon fontSize={"medium"} />}
                                        text="Miejsca"
                                        value="xx/YY"
                                    />
                                </Col>
                                <Col xl={5} className={"info-panel d-flex flex-column justify-content-start align-items-center"}>
                                    <TourPanelLabel
                                        image={<PersonIcon fontSize={"medium"} />}
                                        text="Przewodnik"
                                        value="John Doe"
                                    />
                                    <TourPanelLabel
                                        image={<EmailIcon fontSize={"medium"} />}
                                        text="Email"
                                        value="joedoe@gmail.com"
                                    />
                                    <TourPanelLabel
                                        image={<PhoneIcon fontSize={"medium"} />}
                                        text="Numer tel."
                                        value="xxx yyy zzz"
                                    />
                                    <Button variant={"outline-light w-100 mt-4"}> Masz pytanie? Napisz wiadomość. </Button>
                                </Col>
                            </Row>
                            <Separator />
                            <Row className={"w-100 col-11"}>
                                <h2> Plan wycieczki </h2>
                            </Row>
                            <Row className={"w-100 col-10"}>
                                {
                                    arr.map((item, index)=>{
                                        return(
                                            <div className={"tour-plan-point"}>
                                                At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi
                                            </div>
                                        )
                                    })
                                }
                            </Row>
                            <Separator />
                            <Row className={"w-100 col-10 d-flex justify-content-between"} >
                                <Col xl={6} className={"d-flex align-items-center flex-column"}>
                                    <TourPriceList />
                                </Col>
                                <Col xl={6} className={"d-flex align-items-center flex-column"}>
                                   <TourImportantInfo />
                                </Col>
                            </Row>
                            <Separator />
                        </Container>
                    </Col>
                    <Col lg={2} sm={12} style={{backgroundColor: "orange", padding: "0"}} className={"d-flex justify-content-center align-items-center"}>

                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    )
}

export default TourDetails;