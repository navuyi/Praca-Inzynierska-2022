import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css"

function TourImagesGallery(props) {

    let images = []
    props.urls.map((url) => {
        images.push({
            original: url.filename.toString(),
            originalWidth: "100%"
        })
    })

    return (
        <React.Fragment>
            <ImageGallery
                items={images}
            />
        </React.Fragment>
    )
}

export default TourImagesGallery