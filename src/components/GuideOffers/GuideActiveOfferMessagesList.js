import React, {useState} from "react"
import {Container, Row, Col, Button, Table} from "react-bootstrap"
import MessageBox from "../MessageBox";

function GuideActiveOfferMessagesList(props){


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
                {
                    props.threads ? props.threads.map((thread, index) => {
                       return(
                           <tr  style={{cursor: "pointer"}} key={index}>
                               <td>1</td>
                               <td> {`${thread.f_name} ${thread.l_name}`} </td>
                               <td> {thread.email} </td>
                               <td> {thread.topic} </td>
                               <td>{thread.creation_date}</td>
                           </tr>
                       )
                    }) : null
                }
                </tbody>
            </Table>
        </Row>
        </React.Fragment>
    )
}

export default GuideActiveOfferMessagesList