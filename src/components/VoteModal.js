import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ShowVoteModal(props) {
  return (
    <Modal
      {...props}
      size="l"
      centered
      style={{ backgroundColor: "rgba(20, 30, 71, 0.9)" }}
    >
      <Modal.Body>
        <div className="color-blue d-flex flex-column align-items-center">
          <img src={props.image} alt="image" width={"150px"} />
          <span className="color-blue" style={{ fontSize: "35px" }}> 
            {props.TeamName + " " + "ganan"}
          </span>
          <p>Votas por que este equipo va a ganar.</p>
          <div
            className="text-center"
            style={{
              width: "200px",
              color: "rgba(151, 151, 151, 1)",
              fontSize: "12px",
            }}
          >
            Podrás editar el voto antes que comience el partido, una ves
            comensado no podrás editarlo, te deseamos éxito
          </div>
          <div className="p-2"></div>
          <div>
            <Button variant="success" style={{ fontSize: "22px" }}>
              Votar
            </Button>
          </div>
          <div className="pt-2 pb-3"></div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function VoteModal(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <div onClick={() => setModalShow(true)}>{props.children}</div>

      <ShowVoteModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        image={props.img}
        TeamName={props.TeamName}
      />
    </>
  );
}

export default VoteModal;
