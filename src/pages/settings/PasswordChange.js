import React from "react"
import {Row, Col, Button, FormControl, Container, Form, FormLabel} from "react-bootstrap"
import image from "../../images/icons/password.svg"
import {CircularProgress} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert"

import {useState} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import axios from "axios";
import {API_PREFIX} from "../../config";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {_logout} from "../../utils/_logout";


function PasswordChange(){
    const history = useHistory()
    const dispatch = useDispatch()
    const [sending, setSending] = useState(false)
    const [operation, setOperation] = useState({
        done: false,
        success: true
    })
    const [credentials, setCredentials] = useState({
        current_password: "",
        new_password: "",
        new_password_repeat: ""
    })
    const [responseMsg, setResponseMsg] = useState("")

    function handleChange(e){
        const tmp = {...credentials, [e.target.id]: e.target.value}
        setCredentials(tmp)
    }

    function restoreDefault(){
        setCredentials({
            new_password_repeat: "",
            new_password: "",
            current_password: ""
        })

       setTimeout(() => {
           setOperation({
               done: false,
               success: false
           })
       }, 3000)
    }

   function handleSubmit(e){
        e.preventDefault()
        const url = API_PREFIX+"/settings/password"
        const access_token = localStorage.getItem("access_token")
        const config = {
            headers:{
                Authorization: `Bearer ${access_token}`
            }
       }
       setOperation({
           done: false,
           success: false
       })
       setSending(true)
       axios.patch(url, credentials, config).then(res => {
            console.log(res.data)
            setSending(false)
            setResponseMsg(res.data.message)
            setOperation({
               done: true,
               success: true
            })
            restoreDefault()
            }).catch(err => {
                if(err.response){
                    console.log(err.response)
                    if(err.response.status === 401 && err.response.data.msg === "Token has expired"){
                        // Handle expired token
                        refesh_token().then(res => {
                            localStorage.setItem("access_token", res.data.access_token)
                            handleSubmit(new Event("submit"))
                        }).catch(err =>{
                            _logout(dispatch)
                            history.push("/login")
                        })
                    }
                    else{
                        setSending(false)
                        setResponseMsg(err.response.data.message)
                        setOperation({
                            done: true,
                            success: false
                        })
                        restoreDefault()
                    }
                }
       })
    }
    return(
        <div className={"passwordChange"}>
            <Container className={""}>
                <Row className={"d-flex justify-content-center mt-5"} style={{minHeight: "200px"}}>
                    <img src={image} alt={""} width={200} color={"orange"} />
                </Row>
                <Form onSubmit={handleSubmit} className={"w-100 d-flex flex-column align-items-center"}>
                    <Row className={"d-flex flex-column align-items-start mt-5 col-xl-4 col-lg-5"}>
                        <FormLabel> Aktualne hasło </FormLabel>
                        <FormControl
                            as={"input"}
                            type={"password"}
                            id={"current_password"}
                            value={credentials.current_password}
                            required
                            onChange={handleChange}
                        />
                    </Row>
                    <Row className={"d-flex flex-column align-items-start mt-3 col-xl-4 col-lg-5"}>
                        <FormLabel> Nowe hasło </FormLabel>
                        <FormControl
                            as={"input"}
                            type={"password"}
                            id={"new_password"}
                            value={credentials.new_password}
                            required
                            onChange={handleChange}
                        />
                    </Row>
                    <Row className={"d-flex flex-column align-items-start  mt-3 mb-5 col-xl-4 col-lg-5"}>
                        <FormLabel> Powtórz nowe hasło </FormLabel>
                        <FormControl
                            as={"input"}
                            type={"password"}
                            id={"new_password_repeat"}
                            value={credentials.new_password_repeat}
                            required
                            onChange={handleChange}
                        />
                    </Row>
                    <Row className={"d-flex flex-column align-items-center justify-content-center mb-5 col-xl-4 col-lg-5"} style={{minHeight: "100px", backgroundColor: "white"}}>
                        {
                            sending ?
                                <CircularProgress size={100} color={"secondary"}/>
                            :
                                operation.done ? null : <Button type={"submit"} className={"w-100"} variant={"danger"}> Zmień hasło </Button>
                        }
                        {
                            operation.done === true && operation.success === true ?
                            <Alert severity={"success"} variant={"filled"} style={{width: "100%"}}> {responseMsg}</Alert>
                            : null
                        }
                        {
                            operation.done === true && operation.success === false ?
                           <Alert severity={"error"} variant={"filled"} style={{width: "100%"}}> {responseMsg} </Alert> : null
                        }
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default PasswordChange