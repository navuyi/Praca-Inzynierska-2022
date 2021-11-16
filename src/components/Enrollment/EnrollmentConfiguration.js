import React, {useEffect, useState} from "react"
import {Button, Col, FormControl, FormLabel, Row} from "react-bootstrap";
import BackspaceIcon from "@material-ui/icons/Backspace";
import {Form} from "react-bootstrap";


function EnrollmentConfiguration(props){
    const [participantInput, setParticipantInput] = useState("")

    const handleParticipantAdd = (e) => {
        e.preventDefault()
        const tmp = [...props.participants]
        tmp.push(participantInput)
        props.setParticipants(tmp)
        setParticipantInput("")
    }

    const handleParticipantDelete = (e) => {
        const tmp = [...props.participants]
        tmp.splice(e.currentTarget.id, 1)
        props.setParticipants(tmp)
    }

    const handleChange = (e) => {
        setParticipantInput(e.target.value)
    }

    return(
        <React.Fragment>
            <Row className={"section col-11 pb-5 w-100"}>
                <Col xl={6} className={"d-flex flex-column justify-content-start align-items-center"}>
                    <FormLabel> Uczestnicy wycieczki </FormLabel>
                    <p style={{textAlign: "center"}}>Podaj imiona i nazwiska osób, które wezmą udział w wycieczce (włącznie z Tobą jeśli bierzesz udział)</p>
                    <Row className={"w-100 justify-content-between mb-5"}>
                        <FormControl
                            as={"input"}
                            type={"text"}
                            className={"w-50"}
                            placeholder={"Imię i nazwisko uczestnika"}
                            value={participantInput}
                            onChange={handleChange}
                        />
                        <Button variant={"info w-25"} onClick={handleParticipantAdd}> Dodaj </Button>
                    </Row>

                    {
                        props.participants.map((participant, index) => {
                            return(
                                <Row className={"d-flex align-items-center justify-content-between mt-2 w-100"} key={index}>
                                    <FormControl
                                        className={"w-50"}
                                        value={participant}
                                        required
                                        readOnly={true}
                                    />
                                    <div id={index} onClick={handleParticipantDelete}>
                                        <BackspaceIcon fontSize={"large"} />
                                    </div>
                                </Row>
                            )
                        })
                    }
                </Col>
                <Col xl={6} className={"d-flex flex-column justify-content-start align-items-center mt-5 mt-xl-0"}>
                    <FormLabel> Opcjonalny komentarz</FormLabel>
                    <FormControl
                        as={"textarea"}
                        rows={3}
                        value={props.comment}
                        onChange={(e) => {
                            props.setComment(e.target.value)
                        }}
                    />
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default EnrollmentConfiguration