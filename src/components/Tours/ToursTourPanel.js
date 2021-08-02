import React from "react"
import {Container, Row, Col, Button} from "react-bootstrap"
import image from "../../images/home/tour01.jpg"

import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';

import TourPanelLabel from "./TourPanelLabel";
import {useHistory} from "react-router-dom";

const ToursTourPanel = (props) => {
    const history = useHistory();


    function limitText(text, limit){
            let n;
            n = text.slice(0, limit)
            n = n + "..."
            return n
    }

    return(
        <div  onClick={()=>{history.push(`/tours/tour?id=${props.tourId}`)}}>
        <Row className={"toursTourPanel"} >
            <Col xl={5} className={"d-flex flex-column align-items-center justify-content-center"}>
                <img src={props.image_url} alt={""} className={"tour-panel-main-img"} />
            </Col>
            <Col xl={7} className={"d-flex flex-column"}>
                <Row>
                    <h1 className={"tour-panel-header"}> {limitText(props.header, 30)} </h1>
                </Row>
                <Row style={{flexGrow: "1"}}>
                    <Col xl={6} className={"d-flex flex-column justify-content-center"}>
                        <p className={"tour-panel-description"}>
                            {limitText(props.description, 256)}
                        </p>
                    </Col>
                    <Col xl={6} className={"tour-panel-info d-flex flex-column align-items-start justify-content-center"}>
                       <TourPanelLabel
                            image={<PersonIcon fontSize={"medium"} />}
                            text="Przewodnik"
                            value={props.guide_fname + " "+ props.guide_lname}
                       />
                        <TourPanelLabel
                            image={<AttachMoneyIcon fontSize={"medium"} />}
                            text="Cena"
                            value={props.price}
                        />
                        <TourPanelLabel
                            image={<DateRangeIcon fontSize={"medium"} />}
                            text="Data"
                            value={`od ${props.start_date} do ${props.end_date}`}
                        />
                        <TourPanelLabel
                            image={<GroupIcon fontSize={"medium"} />}
                            text="Miejsca"
                            value={`xx/${props.person_limit}`}
                        />
                    </Col>
                </Row>
            </Col>
        </Row>
        </div>
    )
}

export default ToursTourPanel