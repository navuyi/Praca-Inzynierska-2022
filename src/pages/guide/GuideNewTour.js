
import {Container, Row, Col, Form, Button, FormControl} from "react-bootstrap";
import {useState, useEffect} from 'react';
import Select from 'react-select';

function GuideNewTour(){
    const [points, setPoints] = useState([]);
    const [pointInput, setPointInput] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [idToEdit, setIdToEdit] = useState(-1);
    const [image, setImage] = useState("");

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
        <div className="guideNewTour">
            <Container className={"mt-lg-5 mt-5 cont"}>
                <Row lg={12}>
                    <h1> Kreator wycieczki </h1>
                </Row>
                <Row  className={"d-flex justify-content-lg-center"}>
                    <Col lg={4}>
                        <Col>
                            <Form.Group controlId="exampleForm.ControlTextarea1" className={"w-100 d-flex flex-column align-items-start"}>
                                <h2> Nagłówek wycieczki </h2>
                                <FormControl
                                    as="textarea"
                                    rows={1}
                                    placeholder="Nagłówek wycieczki"
                                />
                            </Form.Group>
                        </Col>
                        <Col lg={12}>
                                <div className="inputGroup">
                                    <p> Ilość miejsc</p>
                                    <FormControl
                                        placeholder="Ilość miejsc"
                                    />
                                </div>
                                <div className="inputGroup">
                                    <p> Cena</p>
                                    <FormControl
                                        placeholder="Cena wycieczki na osobę"
                                        type="number"
                                    />
                                </div>
                                <div className="inputGroup">
                                    <p> Data rozpoczęcia </p>
                                    <FormControl
                                        placeholder="Cena wycieczki na osobę"
                                        type="date"
                                    />
                                </div>
                                <div className="inputGroup">
                                    <p> Data zakończenia </p>
                                    <FormControl
                                        placeholder="Cena wycieczki na osobę"
                                        type="date"
                                    />
                                </div>
                                <div className="inputGroup">
                                    <p> Miejsce </p>
                                    {/* #TODO Asynchronus select for fetching places from database*/}
                                    <Select
                                        placeholder="Miejsca, których dotyczy wycieczka"
                                    />
                                </div>
                                <div className="inputGroup">
                                    <p> Zdjęcie główne</p>
                                    <input type="file" onChange={(e)=>setImage(URL.createObjectURL(e.target.files[0]))}/>
                                    <img src={image} alt={""} style={{maxWidth: "100%"}}/>
                                </div>
                        </Col>
                    </Col>
                    <Col lg={8} >
                        <Form.Group controlId="exampleForm.ControlTextarea1" className={"w-100 d-flex flex-column align-items-lg-start align-items-center"}>
                            <h2> Opis wycieczki </h2>
                            <Form.Control as="textarea" rows={20} />
                        </Form.Group>
                    </Col>
                </Row>

                <h3 id="plan-input-header"> Plan wycieczki </h3>
                <Row className={"d-flex flex-row  mt-lg-5 align-items-start"}>
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
                                    points.map((point, index)=>{
                                        return(
                                            <tr tabIndex={0} key={index}>
                                                <td width="10%" style={{textAlign: "center"}}> {index+1} </td>
                                                <td > {point} </td>
                                                <td width="5%" ><Button className={"td-b"} variant={"outline-light"}  onClick={handlePointEdit} id={index}> Edytuj </Button></td>
                                                <td width="5%" ><Button className={"td-b"} variant={"outline-light"} onClick={handlePointDelete} id={index}> Usuń </Button></td>
                                            </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GuideNewTour;