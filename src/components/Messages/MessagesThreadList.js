import React from "react";
import {Row, Col, Container, Button, Table} from "react-bootstrap"



function MessagesThreadList(){
    return(
        <React.Fragment>
            <Row className={"thread-list"}>
                <Table striped bordered hover responsive={"sm"}  className={"mb-0 w-100"}  >
                    <thead>
                    <tr >
                        <th>#</th>
                        <th>Nadawca</th>
                        <th> Email </th>
                        <th>Tytuł</th>
                        <th> Oferta </th>
                        <th>Data</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td id={""} > 1</td>
                            <td id={""} > Joe Doe </td>
                            <td id={""} > joedoe@gmail.com </td>
                            <td id={""} > Lorem ipsum </td>
                            <td id={""} > <Button className={"w-100"} variant={'dark'}> Title of tour... </Button> </td>
                            <td id={""} > 14/08/2021 </td>
                        </tr>
                    </tbody>
                </Table>
            </Row>
        </React.Fragment>
    )
}

export default MessagesThreadList