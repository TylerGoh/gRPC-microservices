import React from "react";
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import { useState } from "react";
import axios from 'axios'
import Alert from "react-bootstrap/Alert";
import Spinner from 'react-bootstrap/Spinner';

function Home(props) {
    const [textInput, setTextInput] = useState("");
    const [showAlert, setShowAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState("")
    const handleSubmit = (e)=>{
        e.preventDefault();
        let data = {
            text: textInput,
            username: props.usernameGlobal,
            password: props.passwordGlobal
        }
        setIsLoading(true)
        axios.post("/api", data).then((res)=>{
            data = res.data
            setResult("The statement is predicted to be " + data.label + " with a confidence of " + (data.score*100).toFixed(2) +"%")
            setIsLoading(false)
        }).catch((err)=>{
            setShowAlert(true)
            setIsLoading(false)
        })
    }
    return(
        <div>
            <Alert show={showAlert} variant="danger">
                <Alert.Heading>Login required!</Alert.Heading>
            </Alert>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Input a text below to get a sentiment analysis:</Form.Label>
                <Form.Control
                    className="timetable-textArea"
                    id="textAreaInput"
                    as="textarea"
                    rows={3}
                    onChange={(e)=>setTextInput(e.target.value)}/>
                <div>
                    {result}
                </div>
                <div style={{padding:"20px"}}>
                    {!isLoading 
                    ? <Button type="submit" style={{border:"20px"}}>Submit</Button> 
                    : <Button variant="primary" disabled>
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        />
                        Submit
                    </Button>}
                    
                </div> 
            </Form>
        </div>
    )
}

export default Home