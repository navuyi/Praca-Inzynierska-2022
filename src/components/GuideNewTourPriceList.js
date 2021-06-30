import React from "react";
import {useState} from "react";
import {Row, Col, Container, Form, Button} from "react-bootstrap"

export default function GuideNewTourPriceList(props){
    const [input, setInput] = useState("");
    function handleChange(e){
        setInput(e.target.value);
    }
    function handleSubmit(e){
        // Get the variant - included/excluded
        let variant;
        if(e.target.id === "included"){
            variant = true;
        }
        else if(e.target.id === "excluded"){
            variant = false;
        }
        const tmp_price_list = [...props.priceList];
        tmp_price_list.push({
            text: input,
            variant: variant
        })
        // Update the price list
        props.setPriceList(tmp_price_list);

        // Clear the text input
        setInput("");
    }
    return(
        <React.Fragment >
            <Row className={"mt-5"}>
                <Col>
                    <h5 style={{textAlign: "center"}}> Cennik </h5>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p style={{textAlign: "center"}}> Proszę wypisać pozycje, które są lub nie są wliczone w cenę wycieczki </p>
                </Col>
            </Row>
            <Row className={"d-flex justify-content-around "}>
                <Col xl={5} lg={5} md={5} sm={11} xs={11}>
                    <Row>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            style={{resize: "none"}}
                            value={input}
                            onChange={handleChange}
                        />
                    </Row>
                    <Row className={"d-flex justify-content-around mt-4 "}>
                        <Button id="included" className={"btn-success "} onClick={handleSubmit}> W cenie </Button>
                        <Button id="excluded" className={"btn-danger "} onClick={handleSubmit}> Nie wliczone </Button>
                    </Row>
                </Col>
                <Col xl={5} lg={5} md={5} sm={11} xs={11} className={"mt-5 mt-sm-5 mt-md-0"}>
                    <div className={"price-list"}>
                        {
                            props.priceList.map((item, index) => {
                                let style;
                                item.variant ? style={backgroundColor: "#5cb85c"} : style={backgroundColor: "#d9534f"}
                                return(
                                    <div key={index} className={"price-list-element"} style={style}>
                                        {item.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}