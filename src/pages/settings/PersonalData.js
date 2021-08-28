import React, {useState} from "react"
import {Container, Row, Col, Button, FormControl, FormLabel} from "react-bootstrap"

import image from "../../images/icons/personal-data.svg"
import {API_PREFIX} from "../../config";
import axios from "axios";
import {useEffect} from "react";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {refesh_token} from "../../API_CALLS/api_authentication_token_refresh";
import {_logout} from "../../utils/_logout";

import {CircularProgress} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert"

function PersonalData(){
    const dispatch = useDispatch()
    const history = useHistory()
    const [disabled, setDisabled] = useState(true)
    const [responseMsg, setResponseMsg] = useState("")
    const [sending, setSending] = useState(false)
    const [operation, setOperation] = useState({
        done: false,
        success: true
    })
    const [data, setData] = useState({
        f_name: "",
        l_name: "",
        email: "",
        phone_number: ""
    })

    useEffect(() => {
        fetchData()
    }, [])

    function handleChange(e){
        const tmp = {...data, [e.target.id]: e.target.value}
        setData(tmp)
    }

    function restoreDefault(){
        setDisabled(true)
        setTimeout(() => {
            setOperation({
                done: false,
                success: false
            })
        }, 3000)
    }

    function fetchData(){
        const url = API_PREFIX+"/settings/personal_data"
        const access_token = localStorage.getItem("access_token")
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        axios.get(url, config).then(res => {
            setData(res.data)
        }).catch(err => {
            if(err.response){
                if(err.response.status === 401 && err.response.data.msg === "Token has expired"){
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", res.data.access_token)
                        fetchData()
                    }).catch(err => {
                        _logout(dispatch)
                        history.push("login")
                    })
                }
            }
        })
    }

    function updateData(){
        const url = API_PREFIX+"/settings/personal_data"
        const access_token = localStorage.getItem("access_token")
        const config = {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
        setSending(true)
        console.log(data)
        axios.put(url, data, config).then(res => {
            setSending(false)
            setResponseMsg(res.data.message)
            setOperation({
                done: true,
                success: true
            })
            restoreDefault()
        }).catch(err => {
            if(err.response){
                if(err.response.status === 401 && err.response.data.msg === "Token has expired"){
                    refesh_token().then(res => {
                        localStorage.setItem("access_token", access_token)
                        updateData()
                    }).catch(err => {
                        _logout(dispatch)
                        history.push("/login")
                    })
                }
                else{
                    setResponseMsg(err.response.data.msg)
                    setOperation({
                        done: true,
                        success: false
                    })
                }
            }
        })
    }

    return(
        <div className={"personalData"}>
            <Container className={"d-flex flex-column justify-content-center align-items-center"}>
                <Row className={"d-flex flex-column justify-content-center mt-5"} style={{minHeight: "200px"}}>
                    <img src={image} alt={""}  width={150}/>
                    <Button variant={"secondary"} onClick={()=>{setDisabled(prev => !prev)}}> {disabled ? "Modyfikuj" : "Zakończ"} </Button>

                </Row>
                <Row className={"mt-5 d-flex flex-column col-xl-4"}>
                    <FormLabel> Imię </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                        value={data.f_name}
                        onChange={handleChange}
                        id={"f_name"}
                    />
                </Row>
                <Row className={"mt-2 d-flex flex-column col-xl-4"}>
                    <FormLabel> Nazwisko </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                        value={data.l_name}
                        onChange={handleChange}
                        id={'l_name'}
                    />
                </Row>
                <Row className={"mt-2 d-flex flex-column col-xl-4"}>
                    <FormLabel> Adres email </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                        value={data.email}
                        onChange={handleChange}
                        id={"email"}
                    />
                </Row>
                <Row className={"mt-2 mb-5 d-flex flex-column col-xl-4"}>
                    <FormLabel> Numer telefonu </FormLabel>
                    <FormControl
                        as={"input"}
                        disabled={disabled}
                        value={data.phone_number}
                        id={"phone_number"}
                        onChange={handleChange}
                    />
                </Row>
                <Row className={"d-flex flex-column align-items-center justify-content-center col-xl-4 mb-5"} style={{minHeight: "100px"}}>
                    {
                        disabled ? null :
                            sending ? <CircularProgress size={100} color={"secondary"}/> :
                            operation.done ? null : <Button className={"w-100"} variant={"danger"} onClick={updateData}> Zapisz zmiany </Button>

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
            </Container>
        </div>
    )
}

export default PersonalData