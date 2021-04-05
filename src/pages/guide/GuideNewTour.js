
import {Container, Row, Col, Form, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';

function GuideNewTour(){
    const [points, setPoints] = useState([]);
    const [pointInput, setPointInput] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [idToEdit, setIdToEdit] = useState(-1);

    function handlePointAdd(){
        if(editMode === false){
            // Add new point
            setPoints(prevPoints => [...prevPoints, pointInput]);
            setPointInput("");
        }
        else if(editMode === true){
            // Modify selected point
            let tmpPoints = [...points];
            tmpPoints[idToEdit] = pointInput;

            setPoints(tmpPoints);
            setEditMode(false);
            setPointInput("");
        }
    }
    function handlePointDelete(e){
        let tmpPoints = [...points];
        let index = e.target.id;
        tmpPoints.splice(index, 1);
        setPoints(tmpPoints);

        console.log(tmpPoints);
    }
    function handlePointEdit(e){
        // Enable edit mode
        setEditMode(true);
        let tmpPoints = [...points];
        let inputToEdit = tmpPoints[e.target.id];
        setIdToEdit(e.target.id);
        setPointInput(inputToEdit);
    }


    return(
        <div className="guideNewTour">
            <Container className={"mt-lg-5 cont"}>
                <Row lg={12}>
                    <h1> Kreator wycieczki </h1>
                </Row>
                <Row  className={"d-flex justify-content-lg-center"}>
                    <Col lg={4}>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlTextarea1" className={"w-100 d-flex flex-column align-items-start"}>
                                <h2> Nagłówek wycieczki </h2>
                                <Form.Control as="textarea" rows={2} />
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                                <div className="inputGroup">
                                    <p> Ilość miejsc</p>
                                    <input type="text"/>
                                </div>
                                <div className="inputGroup">
                                    <p> Cena</p>
                                    <input type="number"/>
                                </div>
                                <div className="inputGroup">
                                    <p> Data </p>
                                    <input type="date"/>
                                </div>
                                <div className="inputGroup">
                                    <p> Zdjęcie główne</p>
                                    <input type="file"/>
                                </div>
                        </Col>
                    </Col>
                    <Col lg={8}>
                        <Form.Group controlId="exampleForm.ControlTextarea1" className={"w-100 d-flex flex-column align-items-start"}>
                            <h2> Opis wycieczki </h2>
                            <Form.Control as="textarea" rows={20} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className={"d-flex flex-column align-items-lg-center justify-content-lg-center mt-lg-5"}>
                    <Col lg={6}>
                        <Form.Group>
                            <h3> Plan wycieczki </h3>
                            <Form.Control as="textarea" rows={5} value={pointInput} onChange={(e)=>setPointInput(e.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col lg={4} className={"d-flex justify-content-center"}>
                        <Button variant={"outline-dark"}  onClick={handlePointAdd} className={"m-lg-3 m-4"}> {editMode ? <span>Edytuj</span> : <span>Dodaj</span>}</Button>
                    </Col>

                </Row>
                <Row className={"d-flex justify-content-lg-center"}>
                    <Col lg={10} sm={12}>
                    {
                        points.map((item, index)=>{
                            return(
                                <div key={index} className="point-container" id={index}>
                                    <Row className={"d-flex align-items-lg-center justify-content-lg-between justify-content-center"}>
                                        <Col lg={1} sm={12} className="point-number d-flex justify-content-center">
                                            {index+1}
                                        </Col>
                                        <Col lg={8}  className="point-content justify-content-sm-center">
                                            {item}
                                        </Col>
                                        <Col xs={6} lg={3}  className={"d-flex justify-content-between justify-content-lg-between mt-3"}>
                                            <Button variant={"dark"} as={"button"} id={index} onClick={handlePointDelete}> Usuń </Button>
                                            <Button variant={"dark"} as={"button"} id={index} onClick={handlePointEdit}> Edytuj </Button>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GuideNewTour;