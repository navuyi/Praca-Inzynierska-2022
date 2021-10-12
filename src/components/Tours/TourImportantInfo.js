import React from "react"
import Alert from "@material-ui/lab/Alert";

function TourImportantInfo(props) {


    const fontStyle = {
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        color: "#222222"
    }
    const style = {
        border: "2px solid #d9534f",
        borderRadius: "0.5em",
        color: "#222222",
        fontFamily: "Source Sans Pro, sans-serif",
        fontWeight: "bold",
        fontSize: "1.1rem",
        padding: "0.5em 1em",
        margin: "0.1em 0",
        width: "100%"
    }
    return (
        <React.Fragment>
            <h3 style={fontStyle}> Ważne informacje </h3>
            {
                props.important_info.map((info, index) => {
                    return (
                        <Alert key={index} severity={"warning"} className={"w-100 mt-2"}>{info.description}</Alert>
                    )
                })
            }
        </React.Fragment>

    )
}

export default TourImportantInfo