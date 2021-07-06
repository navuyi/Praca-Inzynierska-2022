import React from "react";
import {Row, Col, Form, Carousel, Button, Container} from "react-bootstrap";
import {useState} from "react";


export default function GuideNewTourImageGallery(props) {
    const [images, setImages] = useState([]);

    function handleChange(e) {
        const tmp_images = [...images];
        const file_list = e.target.files;
        for(let file of file_list){
            const image = {
                name: file.name,
                url: URL.createObjectURL(file)
            }
            // Check if image with given name was already uploaded
            if(images.filter(e => e.name === image.name).length === 0){
                // Add image to temporary array
                tmp_images.push(image)
                // Add files to formData - for upload to database
                props.formData.set(file.name, file, file.name);
            }
        }
        setImages(tmp_images);
    }
    function handleDelete(e){
        const index = e.target.getAttribute("index");
        const tmp_images = [...images];
        // Delete from array - display
        tmp_images.splice(index, 1);
        setImages(tmp_images);

        // Delete from formData - for upload to database
        props.formData.delete(images[index].name);
    }

    return (
        <React.Fragment>
            <Row className={"mt-5"}>
                <Col>
                    <h2 style={{textAlign: "center", color: "#1d6cf5"}}> Galeria zdjęć </h2>
                </Col>
            </Row>
            <Row className={"d-flex flex-column align-items-center justify-content-around mt-2"}>
                <Col xl={6} className={"d-flex align-items-center justify-content-between flex-column"}>
                    <Button className={"btn-success w-100"} onClick={()=>{document.getElementById("pg-input").click()}}> Dodaj zdjęcia </Button>
                    <input
                        id="pg-input"
                        type="file"
                        multiple={true}
                        style={{display: "none"}}
                        onChange={handleChange}
                    />
                </Col>
                <Col xl={6} className={"mt-3"}>
                    <div className={"image-list"}>
                        {
                            images.map((image, index) => {
                                return(
                                    <div key={index} index={index} className={"image-list-element"} onDoubleClick={handleDelete}> {image.name} </div>
                                )
                            })
                        }
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    )
}