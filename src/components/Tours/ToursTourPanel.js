import React from "react"
import {Col, Row} from "react-bootstrap"

import PersonIcon from '@material-ui/icons/Person';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import GroupIcon from '@material-ui/icons/Group';
import DateRangeIcon from '@material-ui/icons/DateRange';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import TourPanelLabel from "./TourPanelLabel";
import {useHistory} from "react-router-dom";

const ToursTourPanel = (props) => {
    const history = useHistory();


    function limitText(text, limit) {
        let n;
        n = text.slice(0, limit)
        n = n + "..."
        return n
    }

    return (
        <div onClick={() => {
            history.push(`/tours/tour/${props.tourId}`)
        }} style={{width: "100%"}}>
            <Row className={"toursTourPanel w-100"}>
                <Col xl={5} className={"d-flex  align-items-end justify-content-center"}>
                    <img src={props.image_url} alt={""} className={"tour-panel-main-img"}/>
                </Col>
                <Col xl={7} className={"d-flex flex-column"}>
                    <Row>
                        <h1 className={"tour-panel-header"}> {limitText(props.header, 30)} </h1>
                    </Row>
                    <Row style={{flexGrow: "1"}}>
                        <Col xl={5} className={"d-flex flex-column justify-content-center"}>
                            <p className={"tour-panel-description"}>
                                {limitText(props.description, 128)}
                            </p>
                        </Col>
                        <Col xl={7}
                             className={"tour-panel-info d-flex flex-column align-items-start justify-content-center"}>
                            <TourPanelLabel
                                image={<PersonIcon fontSize={"medium"}/>}
                                text="Przewodnik"
                                value={props.guide_fname + " " + props.guide_lname}
                            />
                            <TourPanelLabel
                                image={<AttachMoneyIcon fontSize={"medium"}/>}
                                text="Cena"
                                value={props.price}
                            />
                            <TourPanelLabel
                                image={<DateRangeIcon fontSize={"medium"}/>}
                                text="Data"
                                value={`od ${props.start_date} do ${props.end_date}`}
                            />
                            <TourPanelLabel
                                image={<GroupIcon fontSize={"medium"}/>}
                                text="Zapisanych"
                                value={`${props.tickets}/${props.person_limit}`}
                            />
                            <TourPanelLabel
                                image={<AccessTimeIcon fontSize={"medium"}/>}
                                text="Pozostało: "
                                value={`${props.days_left} dni ${props.time_left} godzin`}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}

export default ToursTourPanel