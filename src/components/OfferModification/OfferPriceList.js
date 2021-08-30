import React from "react"
import {Container, Row, Col, Button, FormControl, FormLabel, Form, Table} from "react-bootstrap"
import {useState} from "react";
import {TableHead} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";


function OfferPriceList(props){
    const [input, setInput] = useState("")

    function handleSubmit(e){
        e.preventDefault()
        const tmp = [...props.priceList]
        tmp.push({
            description: input,
            is_included: e.nativeEvent.submitter.id === "included" ? 1 : 0
        })
        props.setPriceList(tmp)
        setInput("")
    }

    function handleDelete(e){
        const tmp = [...props.priceList]
        tmp.splice(e.currentTarget.id, 1)
        props.setPriceList(tmp)
    }

    return(
        <Container className={"offerPriceList d-flex flex-column justify-content-center align-items-center mb-5"}>
            <Row className={"col-xl-6"}>
                <h3 className={"m-0"}> Cennik </h3>
            </Row>
            <Form className={"w-100 d-flex flex-column align-items-center"} onSubmit={handleSubmit}>
                <Row className={"mt-2 col-xl-6"}>
                    <FormControl
                        type={"input"}
                        placeholder={"Wliczone lub nie wliczone w cenę wycieczki"}
                        required={true}
                        disabled={props.disabled}
                        value={input}
                        onChange={(e) => {setInput(e.target.value)}}
                    />
                </Row>
                <Row className={"mt-2 col-xl-6 p-0"}>
                    <Col className={""}>
                        <Button className={"w-100"} variant={"success"} type={"submit"} id={"included"}> Wliczone </Button>
                    </Col>
                    <Col className={""}>
                        <Button className={"w-100"} variant={"danger"} type={"submit"} id={"excluded"}> Nie wliczone</Button>
                    </Col>
                </Row>
            </Form>
            <Row className={"price-list-container  mt-5 col-xl-6 p-0"}>
                <Col>
                    {
                        props.priceList ? props.priceList.map((item, index) => {
                            return(
                                <Row className={"p-0 m-0 w-100 mt-2 d-flex align-items-center justify-content-between"} key={index} style={{border: "1px solid lightgrey", borderRadius: "0.5em"}}>
                                    <Col xl={props.disabled ? 12 : 11} xs={props.disabled ? 12 : 11} className={"m-0 p-0"}>
                                        <Alert variant={"filled"} style={{width: "100%"}} severity={item.is_included == 1 ? "success" : "error"}>{item.description}</Alert>
                                    </Col>
                                    {props.disabled ? null :
                                    <Col xl={1} xs={1} className={"m-0 p-0 d-flex justify-content-center"}>
                                         <DeleteForeverIcon className={'delete'}  fontSize={"large"} id={index} onClick={handleDelete} disa/>
                                    </Col>
                                    }
                                </Row>
                            )
                        }) : null
                    }
                </Col>
            </Row>
        </Container>
    )
}

export default OfferPriceList