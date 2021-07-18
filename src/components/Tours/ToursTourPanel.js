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

    return(
        <div  onClick={()=>{history.push(`/tours/tour?id=${props.tourId}`)}}>
        <Row className={"toursTourPanel"} >
            <Col xl={5} className={"d-flex flex-column align-items-center justify-content-center"}>
                <img src={image} alt={""} className={"tour-panel-main-img"}/>
            </Col>
            <Col xl={7}>
                <Row>
                    <h1 className={"tour-panel-header"}> Tour header</h1>
                </Row>
                <Row>
                    <Col xl={6}>
                        <p className={"tour-panel-description"}>
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur
                        </p>
                    </Col>
                    <Col xl={6} className={"tour-panel-info d-flex flex-column align-items-start justify-content-center"}>
                       <TourPanelLabel
                            image={<PersonIcon fontSize={"medium"} />}
                            text="Przewodnik"
                            value="Johny Deep"
                       />
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
                </Row>
            </Col>
        </Row>
        </div>
    )
}

export default ToursTourPanel