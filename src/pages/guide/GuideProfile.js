
// Dependencies
import {Container, Row, Col, Form, Dropdown, DropdownButton, FormControl, InputGroup, Button} from "react-bootstrap";
import {useState} from "react";

// Images
import mail from '../../images/icons/mail.png';
import person from '../../images/icons/person.png';
import phone from '../../images/icons/phone.png';
import {forEach} from "react-bootstrap/ElementChildren";
import Footer from "../../components/Footer";


function GuideProfile(props){
    const socialsInit = {
        "facebook": false,
        "instagram": false,
        "twitter": false,
        "linkedin": false
    };
    const [socials, setSocials] = useState(socialsInit);
    function handleSocialAdd(e){
        let clicked = (e.target.value).toString();
        console.log(socials);
        switch (clicked){
            case "facebook":
                setSocials(prevState => ({
                    ...prevState,
                    "facebook": true
                }));
                break;
            case "twitter":
                setSocials(prevState => ({
                    ...prevState,
                    "twitter": true
                }));
                break;
            case "instagram":
                setSocials(prevState => ({
                    ...prevState,
                    "instagram": true
                }));
                break;
            case "linkedin":
                setSocials(prevState => ({
                    ...prevState,
                    "linkedin": true
                }));
                break;
        }
    }
    function handleSocialDelete(e){
        let clicked = (e.target.value).toString();
        console.log(e.target.value);
        switch (clicked){
            case "facebook":
                setSocials(prevState => ({
                    ...prevState,
                    "facebook": false
                }));
                break;
            case "twitter":
                setSocials(prevState => ({
                    ...prevState,
                    "twitter": false
                }));
                break;
            case "instagram":
                setSocials(prevState => ({
                    ...prevState,
                    "instagram": false
                }));
                break;
            case "linkedin":
                setSocials(prevState => ({
                    ...prevState,
                    "linkedin": false
                }));
                break;
        }
    }

    return(

        <Container className="guideProfile" style={{marginTop: "5rem"}} >
            <Row  className={"flex flex-column align-items-lg-center"}>
                <Col lg={4} className={"d-flex flex-column align-items-center justify-content-center"}>
                    <img src={person} alt="" className="profile-img"/>
                </Col>
                <Col lg={8} className="header-container m-5">
                    <h1> Andrzej Nowak </h1>
                    <div className="info-container">
                        <img src={phone} alt={""} className="info-icon"/>
                        <input
                            type="text"
                            value="546-656-443"
                        />
                    </div>
                    <div className="info-container">
                        <img src={mail} alt={""} className="info-icon"/>
                        <input
                            type="text"
                            value="example@gmail.com"

                        />
                    </div>
                </Col>
            </Row>
            <Row lg={12}  className={"d-flex flex-column align-items-center"} style={{margin: "5em 0"}} >
                <Col lg={8}>
                    <Form.Group controlId="exampleForm.ControlTextarea1" >
                        <h4> Dodaj swój opis </h4>
                        <Form.Control as="textarea" rows={12} className={"p-lg-3"} style={{borderRadius: "1em"}} />
                    </Form.Group>
                </Col>
                <Col lg={8} className={"d-lg-flex justify-content-lg-between mt-lg-5"}>
                    <h4> Serwisy społecznościowe </h4>
                    <DropdownButton id="dropdown-item-button" title="Dodaj odnośnik">
                        <Dropdown.Item as="button" onClick={handleSocialAdd} value="facebook">Facebook</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleSocialAdd} value="instagram">Instagram</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleSocialAdd} value="twitter">Twitter</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={handleSocialAdd} value="linkedin">LinkedIn</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col className={"d-lg-flex flex-lg-column mt-5"} sm={12} lg={7}>
                    {
                        Object.entries(socials).map((item)=> {
                            if(item[1]) {
                                return (
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <Button className={"btn btn-dark"} disabled style={{width: "125px"}}>{item[0]}</Button>
                                        </InputGroup.Prepend>
                                        <FormControl aria-describedby="basic-addon1" className={"pl-3"}/>
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" as={"button"} onClick={handleSocialDelete} value={item[0]}>Usuń</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                )
                            }
                        })
                    }
                </Col>
                <Col className={"d-lg-flex flex-lg-column mt-5"} sm={12} lg={8}>
                    <h4> Szkolenia i kwalifikacje </h4>
                </Col>
            </Row>
        </Container>

    )
}

export default GuideProfile;