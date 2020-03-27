import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import FlagIcon from './FlagIcon.js'

const countries = [
    {code: 'gr', title: 'Greece'},
    {code: 'gb', title: 'United Kingdom'},
    {code: 'us', title: 'United States'}
];

class DropdownExperiment extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            toggleContent: "Select a country",
            selectedCountry: ""
        };
    }

    render() {
        const {toggleContent} = this.state;
        return (
            <div>
                <Form>
                    <Dropdown
                        onSelect={eventKey => {
                            const {code, title} = countries.find(({code}) => eventKey === code);

                            this.setState({
                               selectedCountry: code,
                               toggleContent: <><FlagIcon code={code}/> {title}</>
                            });
                        }}
                    >
                        <Dropdown.Toggle variant="light" id="dropdown-flags" className="text-left">
                            {toggleContent}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {countries.map(({code, title}) => (
                                <Dropdown.Item key={code} eventKey={code}><FlagIcon code={code}/> {title}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </div>
        );
    }
}

export default DropdownExperiment;