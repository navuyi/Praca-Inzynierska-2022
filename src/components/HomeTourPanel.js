


function HomeTourPanel(props){
    return(
        <div className="homeTourPanel">
            <div className="home-tour-panel-row">
                <img src={props.image} alt="" />
            </div>
            <div className="home-tour-panel-row">
                <h1> {props.title} </h1>
                <p> {props.description} </p>
            </div>
        </div>
    );
}

export default HomeTourPanel;