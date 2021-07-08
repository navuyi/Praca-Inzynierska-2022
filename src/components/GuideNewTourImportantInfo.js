import React, {useState} from "react";
import {Row, Col, Button, Form} from "react-bootstrap";
import isEmptyString from "../utils/isEmptyString";

export default function GuideNewTourImportantInfo(props){

    const [editMode, setEditMode] = useState(false);
    const [idToEdit, setIdToEdit] = useState(-1);
    const [infoInput, setInfoInput] = useState("");


    function handlePointAdd() {
        if (editMode === false) {
            // Check if input is not empty string
            if (isEmptyString(infoInput)) {
                return 1;
            }
            // Add new point
            const tmp_info = [...props.importantInfo];
            tmp_info.push(infoInput);
            props.setImportantInfo(tmp_info);
            setInfoInput("");
        } else if (editMode === true) {
            if (infoInput.length != 0) {
                // Modify selected point
                const tmp_info = [...props.importantInfo];
                tmp_info[idToEdit] = infoInput;

                props.setImportantInfo(tmp_info);
                setEditMode(false);
                setInfoInput("");
            }
        }
    }

    function handlePointDelete(e) {
        const tmp_info = [...props.importantInfo];
        const index = e.target.id;
        tmp_info.splice(index, 1);
        props.setImportantInfo(tmp_info);
    }

    function handlePointEdit(e) {
        // Enable edit mode
        setEditMode(true);
        const tmp_info = [...props.importantInfo];
        let inputToEdit = tmp_info[e.target.id];

        setIdToEdit(e.target.id);
        setInfoInput(inputToEdit);
    }

    return(
        <React.Fragment>
            <Row>
                <Col>
                    <h2 style={{textAlign: "center", color: "#1d6cf5"}}> Ważne informacje </h2>
                </Col>
            </Row>
            <Row className={"d-flex flex-row justify-content-center"}>
                <Col lg={3} xs={12} className={"d-flex align-items-center justify-content-between flex-column"}>
                    <Form.Group className={"w-100"}>
                        <Form.Control id="point-input" as="textarea" rows={6} value={infoInput}
                                      placeholder="Dodaj ważne informacje"
                                      onChange={(e) => setInfoInput(e.target.value)}/>
                    </Form.Group>
                    {
                        editMode ? <Button onClick={handlePointAdd} className={"w-100 btn-primary"}> Edytuj </Button> :
                            <Button onClick={handlePointAdd} className={"w-100 btn-success"}> Dodaj </Button>
                    }
                </Col>
                <Col lg={8} className={"d-flex justify-content-center mt-5 mt-sm-5 mt-md-5 mt-lg-0 mt-xl-0"}>
                    <div className={"table-container"}>
                        {
                            props.importantInfo.length == 0 ? <div className={"table-container-text"}>  Tutaj pojawią się dodane przez Ciebie pozycje </div> : null
                        }
                        {
                            props.importantInfo.map((point, index) => {
                                return (
                                    <Row key={index} lg={12}
                                         className={"d-flex flex-xl-row flex-lg-row flex-md-row flex-row justify-content-center mt-5 mt-xl-0 mt-lg-0 mt-md-1 p-1 plan-row"}>
                                        <Col xl={1} lg={1} md={1} xs={2}></Col>
                                        <Col xl={6} lg={6} md={6} xs={7}
                                             className={"d-flex justify-content-xl-start justify-content-lg-start justify-content-md-start justify-content-center align-items-center "}> {point} </Col>
                                        <Col xl={5} lg={5} md={5} xs={12}
                                             className={"d-flex justify-content-xl-around justify-content-lg-around justify-content-md-around justify-content-around align-items-center mt-3 mt-xl-0 mt-lg-0 mt-md-0"}>
                                            <Button className={"td-b plan-row-button btn-primary"}
                                                    onClick={handlePointEdit} id={index}> Edytuj </Button>
                                            <Button className={"td-b plan-row-button btn-danger"}
                                                    onClick={handlePointDelete} id={index}> Usuń </Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}