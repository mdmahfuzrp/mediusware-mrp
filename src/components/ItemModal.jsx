import React from "react";
import { Form, Modal } from "react-bootstrap";

const ItemModal = ({
  showModalC,
  handleCheckboxChange,
  handleClose,
  onlyEven,
  handleShowModalA,
  handleShowModalB,
  contactDetails,
}) => {
  return (
    <div>
      <Modal show={showModalC} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {contactDetails ? (
            <div>
              <div>ID: {contactDetails?.id}</div>
              <div>Phone: {contactDetails?.phone}</div>
              <div>Country: {contactDetails?.country?.name}</div>
            </div>
          ) : (
            "Nothing special"
          )}
        </Modal.Body>
        <Modal.Footer>
          <Form.Check
            type="checkbox"
            label="Only Even"
            checked={onlyEven}
            onChange={handleCheckboxChange}
          />
          <button
            className="btn btn-sm"
            type="button"
            style={{ color: "#46139f" }}
            onClick={handleShowModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-sm"
            type="button"
            style={{ color: "#ff7f50" }}
            onClick={handleShowModalB}
          >
            US Contacts
          </button>
          <button
            className="btn btn-sm btn-outline"
            type="button"
            style={{ color: "#46139f", borderColor: "#46139f" }}
            onClick={handleClose}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ItemModal;
