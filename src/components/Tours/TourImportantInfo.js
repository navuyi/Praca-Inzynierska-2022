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
        backgroundColor: "#222222",
        borderRadius: "0.5em",
        color: "white",
        fontFamily: "Source Sans Pro, sans-serif",
        fontWeight: "bold",
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