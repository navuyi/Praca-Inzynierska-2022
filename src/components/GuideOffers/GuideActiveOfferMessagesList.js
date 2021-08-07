import React, {useState} from "react"
import {Container, Row, Col, Button, Table} from "react-bootstrap"
import MessageBox from "../MessageBox";

function GuideActiveOfferMessagesList(props){
    const [dropdown, setDropdown] = useState(true)

    return(
        <React.Fragment>
        <Row>
            <Table striped bordered hover  className={"mb-0"}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Nadawca</th>
                    <th> Email </th>
                    <th>Tytuł</th>
                    <th>Data</th>
                </tr>
                </thead>
                <tbody>
                    <tr  style={{cursor: "pointer"}}>
                        <td>1</td>
                        <td> Joe Doe </td>
                        <td> joedoe@gmai.com </td>
                        <td> Voluptatem accusantium doloremque </td>
                        <td>09.08.2021</td>
                    </tr>
                    <tr  style={{cursor: "pointer"}}>
                        <td>1</td>
                        <td> Joe Doe </td>
                        <td> joedoe@gmai.com </td>
                        <td> Voluptatem accusantium doloremque </td>
                        <td>09.08.2021</td>
                    </tr>
                    <tr  style={{cursor: "pointer"}}>
                        <td>1</td>
                        <td> Joe Doe </td>
                        <td> joedoe@gmai.com </td>
                        <td> Voluptatem accusantium doloremque </td>
                        <td>09.08.2021</td>
                    </tr>
                    <tr  style={{cursor: "pointer"}}>
                        <td>1</td>
                        <td> Joe Doe </td>
                        <td> joedoe@gmai.com </td>
                        <td> Voluptatem accusantium doloremque </td>
                        <td>09.08.2021</td>
                    </tr>
                </tbody>
            </Table>
        </Row>
        </React.Fragment>
    )
}

export default GuideActiveOfferMessagesList