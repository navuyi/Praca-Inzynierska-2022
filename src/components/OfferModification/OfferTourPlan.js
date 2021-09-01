import React from "react"
import {Container, Row, Col, Button, FormControl, FormLabel, Form} from "react-bootstrap"
import {useState} from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import isEmptyString from "../../utils/isEmptyString";
import Separator from "../ReusableComponents/Separator";

function OfferTourPlan(props){
    const [editMode, setEditMode] = useState(false)
    const [input, setInput] = useState("")
    const [editID, setEditID] = useState(undefined)

    function handleDelete(e){
        const tmp = [...props.tourPlan]
        tmp.splice(e.currentTarget.id, 1)
        props.setTourPlan(tmp)
    }
    function handleEdit(e){
        setInput(props.tourPlan[e.currentTarget.id].description)
        setEditID(e.currentTarget.id)
        setEditMode(true)
    }
    function handleSubmit(e){
        e.preventDefault()
        if(isEmptyString(input)){
            return
        }
        if(editMode === false){
            // Handle adding element
            const tmp = [...props.tourPlan]
            tmp.push({
                number: tmp.length+1,
                description: input
            })
            props.setTourPlan(tmp)
            setInput("")
        }
        else if(editMode === true){
            // Handle editing element
            const tmp = [...props.tourPlan]
            const part = {...tmp[editID]}
            part.description = input
            tmp[editID] = part
            props.setTourPlan(tmp)
            setEditMode(false)
            setInput("")
        }
    }

    return(
        <React.Fragment>
            <Row className={"col-xl-8"}>
                <h3 className={"m-0"}> Plan wycieczki</h3>
            </Row>
            <Row className={"mt-2 col-xl-8"}>
                <Form className={"w-100 d-flex flex-column align-items-center"} onSubmit={handleSubmit}>
                    <FormControl
                        disabled={props.disabled}
                        as={"textarea"}
                        rows={2}
                        type={"input"}
                        value={input}
                        onChange={(e) => {setInput(e.target.value)}}
                        required
                    />
                    {
                        editMode
                    }
                    <Button type={"submit"} className={"w-50 mt-2 mb-5"} variant={editMode ? "primary" : "success"}> {editMode ? "Edytuj" : "Dodaj"} </Button>
                </Form>
            </Row>

            <Row className={"mt-2 col-xl-8 d-flex flex-column tour-plan-container"}>
                <Col>
                    {
                        props.tourPlan ? props.tourPlan.map((item, index) => {
                            return(
                                <Row className={"tour-plan-element  d-flex justify-content-between align-items-center "} key={index}>
                                    <Col xl={1} xs={12} className={"d-flex justify-content-center"}> <span>{index+1}</span> </Col>
                                    <Col xl={9} xs={12} className={"d-flex justify-content-center justify-content-xl-start"}>
                                        {item.description}
                                    </Col>
                                    <Col xl={2} xs={12} className={"d-flex justify-content-xl-between justify-content-around pt-4 pt-xl-0"}>
                                        {
                                            props.disabled ? null :
                                                <React.Fragment>
                                                    <EditIcon fontSize={"large"} id={index} onClick={handleEdit} className={"edit"}/>
                                                    <DeleteForeverIcon  fontSize={"large"} id={index} onClick={handleDelete} className={"delete"}/>
                                                </React.Fragment>
                                        }
                                    </Col>
                                </Row>
                            )
                        }) : null
                    }
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default OfferTourPlan