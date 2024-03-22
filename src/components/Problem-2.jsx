import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyEven, setOnlyEven] = useState(false);
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState(""); // To distinguish between modals A and B

  const handleClose = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
    setModalType("");
  };

  const handleShowModalA = () => {
    setShowModalA(true);
    setShowModalB(false); // Ensure the other modal is closed
    setModalType("A");
  };

  const handleShowModalB = () => {
    setShowModalB(true);
    setShowModalA(false); // Ensure the other modal is closed
    setModalType("B");
  };

  const handleShowModalC = () => setShowModalC(true);

  useEffect(() => {
    // Fetch contacts from the API based on modalType and onlyEven
    const fetchContacts = async () => {
      let apiUrl = "";
      if (modalType === "A") {
        apiUrl = `https://contact.mediusware.com/api/contacts/?page=${page}`;
      } else if (modalType === "B") {
        apiUrl =
          "https://contact.mediusware.com/api/country-contacts/United States/";
      }
      if (onlyEven) {
        apiUrl += "?even=true";
      }
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setContacts(data.results);
      setFilteredContacts(data.results);
    };
    fetchContacts();
  }, [modalType, onlyEven]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterContacts(query);
  };

  const filterContacts = (query) => {
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContacts(filtered);
  };

  const handleCheckboxChange = (e) => {
    setOnlyEven(e.target.checked);
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={handleShowModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={handleShowModalB}
          >
            US Contacts
          </button>
        </div>
      </div>
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
          <ul className="list-group mt-3">
            {filteredContacts.map((contact) => (
              <li key={contact.id} className="list-group-item">
                {contact.country?.name}
              </li>
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
      <Modal show={showModalC} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display contact details here */}
          {/* This modal will open with contact click handling */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
