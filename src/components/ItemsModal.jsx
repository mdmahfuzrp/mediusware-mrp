import React, { useEffect } from "react";
import { Badge, Form, FormControl, Modal } from "react-bootstrap";

const ItemsModal = ({
  showModalA,
  showModalB,
  handleClose,
  modalType,
  searchQuery,
  handleShowModalA,
  handleSearch,
  handleCheckboxChange,
  handleShowModalB,
  handleShowModalC,
  filteredContacts,
  onlyEven,
}) => {
  const handleInfiniteScroll = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);
  return (
    <div className="">
      <Modal show={showModalA || showModalB} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "A" ? "All Contacts" : "US Contacts"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormControl
              type="text"
              placeholder="Search..."
              className="mr-sm-2"
              value={searchQuery}
              onChange={handleSearch}
            />
          </Form>
          <ul
            className="list-group mt-3"
            style={{ maxHeight: "300px", overflowY: "auto" }}
          >
            {filteredContacts.map((contact) => (
              <button
                onClick={() => handleShowModalC(contact)}
                key={contact.id}
                className="list-group-item"
                style={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ width: "20px" }}>{contact?.id}</span>
                <span>{contact?.phone}</span>
                <Badge bg="primary">{contact?.country?.name}</Badge>
              </button>
            ))}
          </ul>
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

export default ItemsModal;
