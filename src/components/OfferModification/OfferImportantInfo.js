import React, {useState} from "react"
import {Container, Row, Col, Button, FormControl, FormLabel, Form} from "react-bootstrap";
import {Alert} from "@material-ui/lab";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

function OfferImportantInfo(props){
    const [input, setInput] = useState("")

    function handleDelete(e){
        const tmp = [...props.imporantInfo]
        tmp.splice(e.currentTarget.id, 1)
        props.setImportantInfo(tmp)
    }

    function handleSubmit(e){
        e.preventDefault()
        const tmp = [...props.imporantInfo]
        tmp.push({
            description: input,
        })
        props.setImportantInfo(tmp)
        setInput("")
    }

    return(
        <Container className={"offerImportantInfo d-flex flex-column justify-content-center align-items-center mt-5 mb-5"}>
            <Row className={"col-xl-6"}>
                <h3 className={"m-0"}> Ważne informacje </h3>
            </Row>
            <Form className={"w-100 d-flex flex-column align-items-center"} onSubmit={handleSubmit}>
                <Row className={"mt-2 col-xl-6"}>
                    <FormControl
                        type={"input"}
                        placeholder={"Ważna informacja"}
                        required={true}
                        disabled={props.disabled}
                        value={input}
                        onChange={(e) => {setInput(e.target.value)}}
                    />
                </Row>
                <Row className={"mt-2 col-xl-6 p-0"}>
                    <Col>
                        <Button className={"w-100"} variant={"warning"} type={"submit"} id={"included"}> Dodaj </Button>
                    </Col>
                </Row>
                <Row className={"price-list-container  mt-5 col-xl-6 p-0"}>
                    <Col>
                        {
                            props.imporantInfo? props.imporantInfo.map((item, index) => {
                                return(
                                    <Row className={"p-0 m-0 w-100 mt-2 d-flex align-items-center justify-content-between"} key={index} style={{border: "1px solid lightgrey", borderRadius: "0.5em"}}>
                                        <Col xl={props.disabled ? 12 :11} xs={props.disabled ? 12 :11} className={"m-0 p-0"}>
                                            <Alert variant={"filled"} style={{width: "100%", display: "flex"}} severity={"warning"}>{item.description}</Alert>
                                        </Col>
                                        {
                                            props.disabled ? null :
                                                <Col xl={1} xs={1} className={"m-0 p-0 d-flex justify-content-center"}>
                                                    <DeleteForeverIcon className={'delete'}  fontSize={"large"} id={index} onClick={handleDelete}/>
                                                </Col>
                                        }
                                    </Row>
                                )
                            }) : null
                        }
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default OfferImportantInfo