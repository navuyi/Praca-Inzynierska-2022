import React from "react"
import {Row, Col, Button, FormControl, FormCheck, FormLabel} from "react-bootstrap"



function OfferElectives(props){

    function handleChange(e){
        const tmp = {...props.electives, [e.target.id]: e.target.checked}
        props.setElectives(tmp)
    }



    return(
        <React.Fragment>
            <Row className={"col-xl-8"}>
                <h3 className={"m-0 w-100 text-center"}> Opcje dodatkowe</h3>
            </Row>
            <Row className={"col-xl-8 mt-5 d-flex justify-content-around "}>
                <Col xl={4} className={"d-flex flex-column justify-content-center align-items-center"}>
                    <FormLabel> Cennik </FormLabel>
                    <FormCheck
                        style={{transform: "scale(1.3)"}}
                        id={"price_list"}
                        onChange={handleChange}
                        checked={props.electives.price_list ? props.electives.price_list : false}
                        disabled={props.disabled}
                    />
                </Col>
                <Col xl={4} className={"d-flex flex-column justify-content-center align-items-center"}>
                    <FormLabel> Ważne informacje </FormLabel>
                    <FormCheck
                        style={{transform: "scale(1.3)"}}
                        id={"important_info"}
                        onChange={handleChange}
                        checked={props.electives.important_info ? props.electives.important_info : false}
                        disabled={props.disabled}
                    />
                </Col>
                <Col xl={4} className={"d-flex flex-column justify-content-center align-items-center"}>
                    <FormLabel> Galeria zdjęć </FormLabel>
                    <FormCheck
                        style={{transform: "scale(1.3)"}}
                        id={"image_gallery"}
                        onChange={handleChange}
                        checked={props.electives.image_gallery ? props.electives.image_gallery : false}
                        disabled={props.disabled}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default OfferElectives