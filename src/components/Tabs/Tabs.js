import React, { useState } from 'react';
import { MDBTabs, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';
import Tab1Content from './Tab4/Tab1Content';
import Tab2Content from './Tab4/Tab2Content';
import Tab3Content from './Tab4/Tab3Content';
import Tab4Content from './Tab4/Tab4Content';
import { Link } from 'react-router-dom';

export default function Tabs() {
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return;
        }

        setBasicActive(value);
    };

    return (
        <>
            <div className='item-center'>
                <div className='item-center bg-color-blue-sec-small'>

                    <MDBTabs className='align-content-center common-grid-mobile border-0'>
                        <div className='padding-for-soporte-1'>
                            {/* <Link to={"/"} className={"text-decoration-none"}> */}
                                <Button className='tab-btn'
                                onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}
                                >
                                    Reglas del torneo
                                </Button>
                            {/* </Link> */}
                        </div>
                        <div className='padding-for-soporte-1'>
                            <Button className='tab-btn'
                            onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}
                            >
                                Premios
                            </Button>
                        </div>
                        <div className='padding-for-soporte-2'>
                            <Button className='tab-btn'
                            onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}
                            >
                                Juegos
                            </Button>
                        </div>
                        <div className='padding-for-soporte-2'>
                            <Button className='tab-btn'
                            onClick={() => handleBasicClick('tab4')} active={basicActive === 'tab4'}
                            >
                                Entradas
                            </Button>
                        </div>

                    </MDBTabs>
                </div>

            </div>
            <MDBTabsContent>

                <MDBTabsPane show={basicActive === 'tab1'}>
                    <Tab1Content />
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'tab2'}>
                    <Tab2Content />
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'tab3'}>
                    <Tab3Content />
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'tab4'}>
                    <Tab4Content />
                </MDBTabsPane>

            </MDBTabsContent>
        </>
    );
}