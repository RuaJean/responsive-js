import Accordion from 'react-bootstrap/Accordion';
import handImg from '../images/Hand_img.png';

function FaqDropTab() {
    return (
        <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0" className='Acco-border'>
                <Accordion.Header>
                    <img src={handImg} width={'20px'} className={'me-3'} />
                    Accordion Item #1
                </Accordion.Header>
                <div style={{width:'100%', boder: '5px solid black'}}></div>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <div className='p-2'></div>
            <Accordion.Item eventKey="1" className='Acco-border'>
                <Accordion.Header>
                    <img src={handImg} width={'20px'} className={'me-3'} />
                    Accordion Item #2
                </Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <div className='p-2'></div>
            <Accordion.Item eventKey="2" className='Acco-border'>
                <Accordion.Header>
                    <img src={handImg} width={'20px'} className={'me-3'} />
                    Accordion Item #3
                </Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <div className='p-2'></div>
            <Accordion.Item eventKey="3" className='Acco-border'>
                <Accordion.Header>
                    <img src={handImg} width={'20px'} className={'me-3'} />
                    Accordion Item #4
                </Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>

            <div className='p-2'></div>
            <Accordion.Item eventKey="4" className='Acco-border'>
                <Accordion.Header>
                    <img src={handImg} width={'20px'} className={'me-3'} />
                    Accordion Item #5
                </Accordion.Header>
                <Accordion.Body>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
}

export default FaqDropTab;