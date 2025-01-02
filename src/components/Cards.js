import Card from 'react-bootstrap/Card';
import blank from '../images/blank.png';
import card_footer_img from '../images/Hand_img.png'

function Cards() {
    return (
        <>
            <div className='item-center2'>
                <div>
                    <Card style={{ height: '465px', width: '350px' }} className="border-radius-16px card--">
                        <div className='card-head'>
                            <Card.Header><img height={'50px'} src={blank} alt='imag' /></Card.Header>
                            <div className='container'>
                                <Card.Body>
                                    <Card.Title className='mt-4 color-green'>Juega gratis</Card.Title>
                                    <Card.Text className='mt-4 min-font'>
                                        What is Lorem Ipsum?<br />
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className='item-end'><img className='px_width' src={card_footer_img} alt='card_footer_img' /></Card.Footer>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card style={{ height: '465px', width: '350px' }} className="border-radius-16px card--">
                        <div className='card-head'>
                            <Card.Header><img height={'50px'} src={blank} alt='imag' /></Card.Header>
                            <div className='container'>
                                <Card.Body>
                                    <Card.Title className='mt-4 color-green'>Disfruta</Card.Title>
                                    <Card.Text className='mt-4 min-font'>
                                        What is Lorem Ipsum?<br />
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className='item-end'><img className='px_width' src={card_footer_img} alt='card_footer_img' /></Card.Footer>
                            </div>
                        </div>
                    </Card>
                </div>
                <div>
                    <Card style={{ height: '465px', width: '350px' }} className="border-radius-16px card--">
                        <div className='card-head'>
                            <Card.Header><img height={'50px'} src={blank} alt='imag' /></Card.Header>
                            <div className='container'>
                                <Card.Body>
                                    <Card.Title className='mt-4 color-green'>Gana premios</Card.Title>
                                    <Card.Text className='mt-4 min-font'>
                                        What is Lorem Ipsum?<br />
                                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className='item-end'><img className='px_width' src={card_footer_img} alt='card_footer_img' /></Card.Footer>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default Cards;