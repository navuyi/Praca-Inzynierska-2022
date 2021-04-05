
function HomeInfoPanel(props){
    return(
        <div className="homeInfoPanel">
            <img src={props.image} />
            <h1> {props.title} </h1>
            <p>{props.description}</p>
        </div>
    );
}


export default HomeInfoPanel;