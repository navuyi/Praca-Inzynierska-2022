import React from "react"


function TourImportantInfo(){

    const arr = [1,2,3,32,3]
    const fontStyle = {
        width: "100%",
        textAlign: "center",
        fontWeight: "bold",
        color: "#d9534f"
    }
    const style = {
        border: "2px solid #d9534f",
        borderRadius: "0.5em",
        color: "#222222",
        fontFamily: "Source Sans Pro, sans-serif",
        fontWeight: "bold",
        fontSize: "1.1rem",
        padding: "0.5em 1em",
        margin: "0.1em 0"
    }
    return(
        <React.Fragment>
            <h3 style={fontStyle}> Ważne informacje </h3>
            {
                arr.map((info, index) => {
                    return(
                        <div style={style}>
                            Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
                        </div>
                    )
                })
            }
        </React.Fragment>

    )
}

export default TourImportantInfo