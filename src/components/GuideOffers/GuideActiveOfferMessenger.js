import React from "react"
import {Row, Col, Button, FormControl, Form} from "react-bootstrap"

import MessageBox from "../MessageBox";

function GuideActiveOfferMessenger(){
    return(
        <div className={"guideActiveOfferMessenger"}>
            <Row className={"d-flex flex-row justify-content-between align-items-center messenger-header"} >
                <p> Nadawca: Joe Doe</p>
                <p> Tytuł: Pytanie odnośnie zakończenia wycieczki</p>
                <p> Nadano: 03/08/2021</p>
            </Row>
            <div className={"messenger-body"} >
                    <Button variant={"warning"}> Więcej </Button>
                    <MessageBox
                        side={"left"}
                        sender={"Joe doe"}
                        send_time={"03/08/2021"}
                        content={"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet"}
                    />
                    <MessageBox
                        side={"right"}
                        sender={"Ty"}
                        send_time={"09/08/2021"}
                        content={"Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae"}
                    />
                    <MessageBox
                        side={"right"}
                        sender={"Ty"}
                        send_time={"09/08/2021"}
                        content={"Veritatis et quasi architecto beatae"}
                    />
                    <MessageBox
                        side={"left"}
                        sender={"Joe Doe"}
                        send_time={"10/08/2021"}
                        content={"Ab illo inventore veritatis et quasi architecto beatae"}
                    />
            </div>
            <Row className={" m-0 mt-5"}>
                <FormControl
                    as='textarea'
                />
            </Row>
        </div>
    )
}

export default  GuideActiveOfferMessenger