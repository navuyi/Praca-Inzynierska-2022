import React from "react";
import {Row, Col, Form, Carousel, Button, Container} from "react-bootstrap";
import {useState} from "react";


export default function GuideNewTourImageGallery() {
    const [images, setImages] = useState([]);

    function handleChange(e) {
        const tmp_images = [...images];
        const file_list = e.target.files;
        for(let file of file_list){
            const image = {
                name: file.name,
                url: URL.createObjectURL(file)
            }
            tmp_images.push(image);
        }
        setImages(tmp_images);
    }

    return (
        <React.Fragment>
            <Row className={"mt-5"}>
                <Col>
                    <h2 style={{textAlign: "center", color: "#1d6cf5"}}> Galeria zdjęć </h2>
                </Col>
            </Row>
            <Row className={"d-flex flex-column align-items-center justify-content-around mt-2"}>
                <Col xl={5} className={"d-flex align-items-center justify-content-between flex-column"}>
                    <Button className={"btn-success w-100"} onClick={()=>{document.getElementById("pg-input").click()}}> Dodaj zdjęcia </Button>
                    <input
                        id="pg-input"
                        type="file"
                        multiple={true}
                        style={{display: "none"}}
                        onChange={handleChange}
                    />
                </Col>
                <Col xl={5} className={"mt-3 image-list"}>
                    {
                        images.map((image, index) => {
                            return(
                                <div className={"image-list-element"}> {image.name} </div>
                            )
                        })
                    }
                </Col>
            </Row>
        </React.Fragment>
    )
}