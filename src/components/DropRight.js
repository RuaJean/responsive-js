import Dropdown from 'react-bootstrap/Dropdown';
import { ButtonGroup } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';

function DropRight() {
    return (
        <div className="mb-2 left--">
            <NavDropdown title="Juegos" id="basic-nav-dropRight" as={ButtonGroup} key='end' drop="end" variant="secondary">
                <Dropdown.Item eventKey="1">Torneo Regular</Dropdown.Item>
                <div className='item-center'><NavDropdown.Divider className='divider_' /></div>
                <Dropdown.Item eventKey="2">Torneos el pote</Dropdown.Item>
                <div className='item-center'><NavDropdown.Divider className='divider_' /></div>
                <Dropdown.Item eventKey="3">Torneos doble o nada</Dropdown.Item>
                <div className='item-center'><NavDropdown.Divider className='divider_' /></div>
                <Dropdown.Item eventKey="4">Winner take all</Dropdown.Item>
                <div className='item-center'><NavDropdown.Divider className='divider_' /></div>
                <Dropdown.Item eventKey="4">Head to head</Dropdown.Item>
            </NavDropdown>
        </div >

    );
}

export default DropRight;