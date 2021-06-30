
import {Container, Row, Col} from "react-bootstrap";
import {useState} from "react";
import Select from "react-select";
import {FormControl} from "react-bootstrap";
import X from '../../images/icons/reject.png';

function NewMessage(){
    const [contacts, setContacts] = useState([]);
    const [options, setOptions] = useState([
        {value: "Karolina Ewa", label: "Karolina Ewa"},
        {value: "Marian Ferd", label: "Marian Ferd"},
        {value: "Rick Sanchez", label: "Rick Sanchez"},
        {value: "Kyle Paul", label: "Kyle Paul"},
        {value: "Kyle dyle", label: "Kyle dyle"},
        {value: "Robert Kubica", label: "Robert Kubica"},
        {value: "Mariusz P", label: "Mariusz P"},
    ]);

    const selectContact = (e) =>{
        // Add contact to selected contacts
        const tmp_contacts = [...contacts];
        tmp_contacts.push(e);
        setContacts(tmp_contacts);

        // Delete selected contacts from available choice
        const index = options.indexOf(e);
        var tmp_options = [... options];
        tmp_options.splice(index, 1);
        setOptions(tmp_options);
    }
    const removeContact = (e) =>{
        // Remove contact from selected contacts
        var tmp_contacts = [... contacts];
        const tmp_contact = tmp_contacts[e.target.id];
        tmp_contacts.splice(e.target.id, 1);
        setContacts(tmp_contacts);

        // Add removed contact back to available choice
        var tmp_options = [... options];
        tmp_options.push(tmp_contact);
        setOptions(tmp_options);

        console.log(tmp_contact);
    }

    return(
        <div className="newMessage">
            <Container className={"cont mt-lg-5 pt-lg-5 pb-lg-5"}>
                <Row className={"d-flex align-items-center justify-content-center mb-lg-5"}>
                    <h1> Nowa wiadomość </h1>
                </Row>
                <Row className={"d-flex justify-content-lg-around"}>
                    <Col lg={3} className={"d-flex flex-column "}>
                        <h4> Do: </h4>
                        <Select
                            placeholder="Kontakty"
                            options ={options}
                            maxMenuHeight = {200}
                            onChange = {selectContact}
                        />
                        <div className="contacts-box">
                            {
                                contacts.map((contact, index)=>{
                                    return <div key={index} className="contact"><p>{contact.label}</p> <img src={X} alt={""} id={index} onClick={removeContact}/></div>
                                })
                            }
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Row className={"d-flex flex-column"}>
                            <h4>Tytuł</h4>
                            <FormControl
                                placeholder="Nagłówek wiadomości"
                            />
                        </Row>
                        <Row className={"d-flex flex-column mt-lg-3"}>
                            <h4> Edycja </h4>
                            <FormControl
                                as="textarea"
                                rows={8}
                            />
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default NewMessage
