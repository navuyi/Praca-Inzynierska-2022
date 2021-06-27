import {Row, FormControl, FormGroup} from "react-bootstrap";
import TourPlacesSelect from "./TourPlacesSelect";


function GuideNewTourInputs(props){

    const handleMainImageChange = (e) => {
        // Set image to display
        props.setMainUrl(URL.createObjectURL(e.target.files[0]));

        // Add image to FormData
        props.formData.set('main_image', e.target.files[0], e.target.files[0].name);
        for (var value of props.formData.entries()) {
            console.log(value);
        }
    }

    return(
        <Row className={"d-flex flex-column ml-3 mr-3"}>
            <FormGroup>
            <h2> Podstawowe informacje </h2>
            <div className="inputGroup">
                <p> Nagłówek wycieczki </p>
                <FormControl
                    as="textarea"
                    id="header"
                    onChange={props.handleChange}
                    rows={1}
                    placeholder="Nagłówek wycieczki"
                    value={props.tourData.header}
                    required
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
                    required
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
                    required
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
                    required
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
                    required
                />
            </div>
            <div className="inputGroup">
                <p> Miejsce </p>
                <TourPlacesSelect
                    setTourData={props.setTourData}
                    tourData={props.tourData}
                    required
                />
            </div>
            <div className="inputGroup">
                <p> Zdjęcie główne </p>
                <input
                    type="file"
                    onChange={handleMainImageChange}
                    required
                />
                <img src={props.mainUrl} alt={""} style={{maxWidth: "100%", marginTop: "1em", borderRadius: "0.5em"}}/>
            </div>
            </FormGroup>
        </Row>
    )
}

export default GuideNewTourInputs;