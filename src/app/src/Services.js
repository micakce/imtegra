import React from 'react';
import { Card, Accordion } from 'react-bootstrap';

function Services(props) {
    props.services.map(service => {

        if (service.name === "ADI") {
            return (
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        {service.name}
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card >
            )
        }
    }
    )
}

export default Services;