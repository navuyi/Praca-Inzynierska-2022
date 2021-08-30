import React from "react"
import {Container, Col, Row} from "react-bootstrap"
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

    return(
        <Container className={"offerImageGallery d-flex flex-column justify-content-center align-items-center mb-5"}>
            <Row className={"col-xl-6"}>
                <h3 className={"m-0 text-center w-100"}> Galeria zdjęć </h3>
            </Row>
            <Row className={"col-xl-12 mt-4"}>
                <Col className={"gallery-container  "}>
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
        </Container>
    )
}

export default OfferImageGallery