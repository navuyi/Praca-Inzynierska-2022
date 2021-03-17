



function HomeInfoPanel(props){
    return(
        <div className="homeInfoPane">
            <img src={props.icon} />
            <h1> {props.title} </h1>
            <p>{props.description}</p>
        </div>
    );
}


export default HomeInfoPanel;