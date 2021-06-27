

import {Fragment} from "react";
import {Form} from "react-bootstrap";



function GuideNewTourDescription(props){
    return(
        <Fragment>
            <Form.Group  className={"w-100 d-flex flex-column align-items-lg-start align-items-center"}>
                <h2> Opis wycieczki </h2>
                <Form.Control
                    as="textarea"
                    rows={20}
                    placeholder="Miejsce na opis wycieczki"
                    onChange={props.handleChange}
                    id="description"
                    value={props.tourData.description}
                    required
                />
            </Form.Group>
        </Fragment>
    )
}

export default GuideNewTourDescription;