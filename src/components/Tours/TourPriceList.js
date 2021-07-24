import React from "react"

import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';


function TourPriceList(props){

    const list = [
        {text: "Zwiedzanie kościoła", variant: true},
        {text: "Lorem ipsum", variant: false},
        {text: "Joe Rogan Podcast at night all long all nightt", variant: true},
        {text: "Zwiedzanie kościoła", variant: true},
        {text: "Sprzątanie po sobie w autobusie", variant: false},
    ]


    const styleDanger = {
        width: "100%",
        backgroundColor: "#d9534f",
        borderRadius: "0.5em",
        margin: "0.1em 0",
        fontFamily: "Source Sans Pro, sans-serif",
        fontWeight: "bold",
        fontSize: "1.1rem",
        padding: "1em 1em",
        color: "whitesmoke",

        display: "flex",
        justifyContent: "space-between"
    }
    const styleSuccess = {
        width: "100%",
        backgroundColor: "#5cb85c",
        borderRadius: "0.5em",
        margin: "0.1em",
        fontFamily: "Source Sans Pro, sans-serif",
        fontWeight: "bold",
        fontSize: "1.1rem",
        padding: "1em 1em",
        color: "whitesmoke",

        display: "flex",
        justifyContent: "space-between"
    }

    let style;
    let icon;

    return(
        <React.Fragment>
            <h3 style={{width: "100%", textAlign: "center"}}> Cennik </h3>
            {
                props.price_list.map((item, index) => {
                    item.is_included ? style=styleSuccess : style=styleDanger
                    item.is_included ? icon=<CheckIcon/> : icon=<BlockIcon/>
                    return(
                        <div style={style} key={index}>
                            {item.description}
                            {icon}
                        </div>
                    )
                })
            }
        </React.Fragment>
    )
}

export default  TourPriceList