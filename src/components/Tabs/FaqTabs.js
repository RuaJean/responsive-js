import { Button } from 'react-bootstrap';
import FaqTab1 from './FaqTabs/FaqTab1';
import FaqTab2 from './FaqTabs/FaqTab2';
import FaqTab3 from './FaqTabs/FaqTab3';
import React, { useState } from 'react';
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
} from 'mdb-react-ui-kit';

export default function FaqTabs() {
    const [justifyActive, setJustifyActive] = useState('tab1');

    const handleJustifyClick = (value: string) => {
        if (value === justifyActive) {
            return;
        }

        setJustifyActive(value);
    };

    return (
        <>
            <MDBTabs justify className='mb-3 border-bottom-0 gap-1' >
                <MDBTabsItem>
                    <Button className='faq-btn' onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
                        {"General"}
                    </Button>
                </MDBTabsItem>
                <MDBTabsItem>
                    <Button className='faq-btn' onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
                        {"Juegos"}
                    </Button>
                </MDBTabsItem>
                <MDBTabsItem>
                    <Button className='faq-btn' onClick={() => handleJustifyClick('tab3')} active={justifyActive === 'tab3'}>
                        {"Preguntas"}
                    </Button>
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={justifyActive === 'tab1'}>
                    <FaqTab1 />
                </MDBTabsPane>
                <MDBTabsPane show={justifyActive === 'tab2'}>
                    <FaqTab2 />
                </MDBTabsPane>
                <MDBTabsPane show={justifyActive === 'tab3'}>
                    <FaqTab3 />
                </MDBTabsPane>
            </MDBTabsContent>
        </>
    );
}