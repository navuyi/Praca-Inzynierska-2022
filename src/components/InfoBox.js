
import React from 'react'
import {Alert} from "@material-ui/lab";

function InfoBox(props){

    const div_style = {
        width: "100%",
        height: "100%",
        zIndex: "2022",
        position: "absolute",
        backgroundColor: "rgba(34,34,34,0.5)",
        marginTop: "-3em",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    return(
        <div style={div_style}>
            <Alert variant={"filled"} severity={"success"}> Pomyślnie utworzono wycieczkę </Alert>
        </div>
    )
}


export default InfoBox