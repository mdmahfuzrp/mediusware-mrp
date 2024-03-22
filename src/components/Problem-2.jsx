import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { Badge } from "react-bootstrap";
import ItemsModal from "./ItemsModal";
import ItemModal from "./ItemModal";

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyEven, setOnlyEven] = useState(false);
  const [page, setPage] = useState(1);
  const [modalType, setModalType] = useState("");
  const [contactDetails, setContactDetails] = useState(null);

  const handleClose = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
    setModalType("");
  };

  const handleShowModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    setModalType("A");
  };

  const handleShowModalB = () => {
    setShowModalB(true);
    setShowModalA(false);
    setShowModalC(false);
    setModalType("B");
  };

  const handleShowModalC = (contact) => {
    setShowModalC(true);
    setShowModalA(false);
    setShowModalB(false);
    setContactDetails(contact);
  };

  useEffect(() => {
    // Fetch contacts from the API based on modalType
    const fetchContacts = async () => {
      let apiUrl = "";
      if (modalType === "A") {
        apiUrl = `https://contact.mediusware.com/api/contacts/?page=${page}${
          searchQuery ? `&search=${searchQuery}` : ""
        }`;
      } else if (modalType === "B") {
        apiUrl = `https://contact.mediusware.com/api/country-contacts/United States/${
          searchQuery ? `?search=${searchQuery}` : ""
        }`;
      }
      const response = await fetch(apiUrl);
      const data = await response.json();

      let filteredData = data.results;

      // Filter even contacts if onlyEven is true
      if (onlyEven) {
        filteredData = filteredData.filter(
          (contact, index) => contact?.id % 2 === 0
        );
      }

      console.log(filteredData);
      setContacts(filteredData);
      setFilteredContacts(filteredData);
    };
    fetchContacts();
  }, [modalType, onlyEven, searchQuery]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
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
      <ItemsModal
        handleCheckboxChange={handleCheckboxChange}
        handleClose={handleClose}
        handleSearch={handleSearch}
        handleShowModalA={handleShowModalA}
        handleShowModalB={handleShowModalB}
        handleShowModalC={handleShowModalC}
        modalType={modalType}
        searchQuery={searchQuery}
        showModalA={showModalA}
        showModalB={showModalB}
        filteredContacts={filteredContacts}
        onlyEven={onlyEven}
      />
      <ItemModal
        handleCheckboxChange={handleCheckboxChange}
        handleClose={handleClose}
        handleShowModalA={handleShowModalA}
        handleShowModalB={handleShowModalB}
        contactDetails={contactDetails}
        onlyEven={onlyEven}
        showModalC={showModalC}
      />
    </div>
  );
};

export default Problem2;
