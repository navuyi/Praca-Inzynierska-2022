import React, {useEffect, useState} from "react"
import {Container, Col, Row, Button} from "react-bootstrap"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";


function OfferImageGallery(props){

    function handleDelete(e){
        // Delete from view
        const tmp = [...props.imageGallery]
        const imgToDel = tmp[e.currentTarget.id]
        tmp.splice(e.currentTarget.id, 1)
        props.setImageGallery(tmp)

        // Order deletion - backend
        const del = [...props.imagesToDelete]
        del.push(imgToDel.id)
        console.log("DELETE "+ del)
        props.setImagesToDelete(del)
    }
    function handleDeleteNew(e){
        const tmp = [...props.imagesToSend]
        tmp.splice(e.target.id, 1)
        props.setImagesToSend(tmp)
    }

    function handleImageAdd(e){
        const files = e.target.files ? e.target.files : []
        let tmp = [...props.imagesToSend]
        Array.from(files).forEach((file) => {
            tmp.push({
                url: URL.createObjectURL(file),
                file: file
            })
        })
        props.setImagesToSend(tmp)
    }

    useEffect(() => {
        console.log(props.images)
    }, [props.images])

    return(
        <Container className={"offerImageGallery d-flex flex-column justify-content-center align-items-center mb-5"}>
            <Row className={"col-xl-6"}>
                <h3 className={"m-0 text-center w-100"}> Galeria zdjęć </h3>
            </Row>
            <Row className={"col-xl-3 col-lg-3 col-md-4"}>
                {
                    props.disabled ? null : <Button className={"mt-4 mb-4 w-100"} onClick={() => {document.getElementById("file-upload").click()}}> Dodaj </Button>
                }
            </Row>
            <Row className={"col-xl-12 mt-4"}>
                <Col className={"gallery-container  "}>
                    {
                        props.imagesToSend.map((image, index) => {
                            return(
                                <div style={{backgroundImage: `url(${image.url})`}} className={"gallery-content"} key={index}>
                                    {
                                        props.disabled ? null :
                                            <DeleteForeverIcon fontSize={"large"} style={{right: "10px", display: "relative"}} id={index} onClick={handleDeleteNew}/>
                                    }
                                </div>
                            )
                        })
                    }
                    {
                        props.imageGallery.map((image, index) => {
                            return(
                                <div style={{backgroundImage: `url(${image.filename})`}} className={"gallery-content"} key={index}>
                                    {
                                        props.disabled ? null :
                                        <DeleteForeverIcon fontSize={"large"} style={{right: "10px", display: "relative"}} id={index} onClick={handleDelete}/>
                                    }
                                </div>
                            )
                        })
                    }
                </Col>
            </Row>
            <Row>
                <input
                    type={"file"}
                    style={{display: "none"}}
                    id={"file-upload"}
                    multiple={true}
                    onChange={handleImageAdd}
                    accept={'image/*'}
                />
            </Row>
        </Container>
    )
}

export default OfferImageGallery