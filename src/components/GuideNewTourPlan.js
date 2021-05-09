import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";
import React from "react";

function GuideNewTourPlan(props){
    const [editMode, setEditMode] = useState(false);
    const [idToEdit, setIdToEdit] = useState(-1);
    const [pointInput, setPointInput] = useState("");

    function handlePointAdd(){
        if(editMode === false){
            // Add new point
            props.setPoints(prevPoints => [...prevPoints, pointInput]);
            setPointInput("");
        }
        else if(editMode === true){
            // Modify selected point
            let tmpPoints = [...props.points];
            tmpPoints[idToEdit] = pointInput;

            props.setPoints(tmpPoints);
            setEditMode(false);
            setPointInput("");
        }
    }
    function handlePointDelete(e){
        let tmpPoints = [...props.points];
        let index = e.target.id;
        tmpPoints.splice(index, 1);
        props.setPoints(tmpPoints);

        console.log(tmpPoints);
    }
    function handlePointEdit(e){
        // Enable edit mode
        setEditMode(true);
        let tmpPoints = [...props.points];
        let inputToEdit = tmpPoints[e.target.id];
        console.log(inputToEdit);
        setIdToEdit(e.target.id);
        setPointInput(inputToEdit);

        // Scroll back to tour plan input
        window.scroll({
            top:    document.getElementById("point-input").offsetParent.offsetTop - window.innerHeight/4,
            left: 0,
            behavior: "smooth"
        });
    }
    return(
        <React.Fragment>
            <Col lg={4} xs={12} className={"d-flex align-items-center justify-content-center flex-column"}>
                <Form.Group className={"w-100"}>
                    <Form.Control id="point-input" as="textarea" rows={2} value={pointInput} onChange={(e)=>setPointInput(e.target.value)}/>
                </Form.Group>
                <Button variant={"outline-dark"}  onClick={handlePointAdd} className={"m-lg-3 m-4"}> {editMode ? <span>Edytuj</span> : <span>Dodaj</span>}</Button>
            </Col>
            <Col lg={8} className={"d-flex justify-content-center"}>
                <div className={"table-container"}>
                    <table>
                        <tbody>
                        {
                            props.points.map((point, index)=>{
                                return(
                                    <tr tabIndex={0} key={index}>
                                        <td width="10%" style={{textAlign: "center"}}> {index+1} </td>
                                        <td > {point} </td>
                                        <td width="5%" ><Button className={"td-b"} variant={"outline-dark"}  onClick={handlePointEdit} id={index}> Edytuj </Button></td>
                                        <td width="5%" ><Button className={"td-b"} variant={"outline-dark"} onClick={handlePointDelete} id={index}> Usuń </Button></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </Col>
        </React.Fragment>
    )
}

export default GuideNewTourPlan;