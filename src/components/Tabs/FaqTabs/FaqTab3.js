import handImg from '../../../images/Hand_img.png';
import Accordion from 'react-bootstrap/Accordion';

const FaqTab3 = () => {
    return (
        <>
            <div>
                <div className='p-4'></div>
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0" className='Acco-border'>
                        <Accordion.Header>
                            <img src={handImg} width={'20px'} className={'me-3'} />
                            <span className='color-blue'>
                                {"Quiero jugar en LotoXport, ¿cómo lo hago?"}
                            </span>
                        </Accordion.Header>
                        <div style={{ width: '100%', boder: '5px solid black' }}></div>
                        <Accordion.Body>
                            <span className='color-blue'>
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                            </span>
                        </Accordion.Body>
                    </Accordion.Item>

                    <div className='p-2'></div>
                    <Accordion.Item eventKey="1" className='Acco-border'>
                        <Accordion.Header>
                            <img src={handImg} width={'20px'} className={'me-3'} />
                            <span className='color-blue'>
                                {"¿Qué tan rápido me dan mi premio una vez que gano un juego?"}
                            </span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <span className='color-blue'>
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                            </span>
                        </Accordion.Body>
                    </Accordion.Item>

                    <div className='p-2'></div>
                    <Accordion.Item eventKey="2" className='Acco-border'>
                        <Accordion.Header>
                            <img src={handImg} width={'20px'} className={'me-3'} />
                            <span className='color-blue'>
                                {"¿Cómo lleno la información?"}
                            </span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <span className='color-blue'>
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                            </span>
                        </Accordion.Body>
                    </Accordion.Item>

                    <div className='p-2'></div>
                    <Accordion.Item eventKey="3" className='Acco-border'>
                        <Accordion.Header>
                            <img src={handImg} width={'20px'} className={'me-3'} />
                            <span className='color-blue'>
                                {"¿Cuáles son los premios?"}
                            </span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <span className='color-blue'>
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                            </span>
                        </Accordion.Body>
                    </Accordion.Item>

                    <div className='p-2'></div>
                    <Accordion.Item eventKey="4" className='Acco-border'>
                        <Accordion.Header>
                            <img src={handImg} width={'20px'} className={'me-3'} />
                            <span className='color-blue'>
                                {"¿Cuántas veces puedo jugar?"}
                            </span>
                        </Accordion.Header>
                        <Accordion.Body>
                            <span className='color-blue'>
                                {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
                            </span>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion >
            </div>
        </>
    )
}

export default FaqTab3;