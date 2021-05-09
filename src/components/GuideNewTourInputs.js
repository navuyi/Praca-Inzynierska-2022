import {Col, Row, Form, FormControl} from "react-bootstrap";
import TourPlacesSelect from "./TourPlacesSelect";


function GuideNewTourInputs(props){
    return(
        <Row className={"d-flex flex-column ml-3 mr-3"}>
            <div className="inputGroup">
                <p> Nagłówek wycieczki </p>
                <FormControl
                    as="textarea"
                    id="header"
                    onChange={props.handleChange}
                    rows={1}
                    placeholder="Nagłówek wycieczki"
                    value={props.tourData.header}
                />
            </div>
            <div className="inputGroup">
                <p> Ilość miejsc</p>
                <FormControl
                    type="text"
                    id="person_limit"
                    onChange={props.handleChange}
                    placeholder="Ilość miejsc"
                    value={props.tourData.person_limit}
                />
            </div>
            <div className="inputGroup">
                <p> Cena</p>
                <FormControl
                    id="price"
                    onChange={props.handleChange}
                    placeholder="Cena wycieczki na osobę"
                    type="text"
                    value={props.tourData.price}
                />
            </div>
            <div className="inputGroup">
                <p> Data rozpoczęcia </p>
                <FormControl
                    id="start_date"
                    onChange={props.handleChange}
                    placeholder="Cena wycieczki na osobę"
                    type="date"
                    value={props.tourData.start_date}
                />
            </div>
            <div className="inputGroup">
                <p> Data zakończenia </p>
                <FormControl
                    id="end_date"
                    onChange={props.handleChange}
                    placeholder="Cena wycieczki na osobę"
                    type="date"
                    value={props.tourData.end_date}
                />
            </div>
            <div className="inputGroup">
                <p> Miejsce </p>
                <TourPlacesSelect

                />
            </div>
            <div className="inputGroup">
                <p> Zdjęcie główne</p>
                <input type="file" onChange={(e)=>props.setImage(URL.createObjectURL(e.target.files[0]))}/>
                <img src={props.image} alt={""} style={{maxWidth: "100%"}}/>
            </div>
        </Row>
    )
}

export default GuideNewTourInputs;