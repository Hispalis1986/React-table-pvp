import React, { useState, Fragment, useEffect } from "react";
import { nanoid } from 'nanoid';
import "./App.css";
// import data from "./mock-data.json";
import ReadOnlyRow from "./components/ReadOnlyRow";
import EditableRow from "./components/EditableRow";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: "",
    rol: "",
    weapon: "",
    profession: ""
  });

  const [editFormData, setEditFormData] = useState({
    name: "",
    rol: "",
    weapon: "",
    profession: ""
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: addFormData.name,
      rol: addFormData.rol,
      weapon: addFormData.weapon,
      profession: addFormData.profession,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      name: editFormData.name,
      rol: editFormData.rol,
      weapon: editFormData.weapon,
      profession: editFormData.profession
    }

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    setEditContactId(null);
  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      name: contact.name,
      rol: contact.rol,
      weapon: contact.weapon,
      profession: contact.profession,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  }

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }



  useEffect(() => {
    if (contacts.length === 0) return;
    var textContacts = JSON.stringify(contacts);
    window.localStorage.setItem("PvP", textContacts);
  }, [contacts])


  useEffect(() => {
    var textContacts = window.localStorage.getItem("PvP");
    setContacts(JSON.parse(textContacts))
  }, [])





  return <div className="app-container">
    <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Rol</th>
            <th>Armas</th>
            <th>Profesión</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <Fragment key={contact.id}>
              {editContactId === contact.id ? (
                <EditableRow editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} />
              ) : (
                <ReadOnlyRow contact={contact} handleEditClick={handleEditClick} handleDeleteClick={handleDeleteClick} />
              )}
            </Fragment>
          ))}

        </tbody>
      </table>
    </form>
    <h2>Añadir miembro:</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input type="text" name="name" required="required" placeholder="Nombre del miembro" onChange={handleAddFormChange} />
      <input type="text" name="rol" required="required" placeholder="rol" onChange={handleAddFormChange} />
      <input type="text" name="weapon" required="required" placeholder="weapon" onChange={handleAddFormChange} />
      <input type="text" name="profession" required="required" placeholder="profession" onChange={handleAddFormChange} />
      <button type="submit">Añadir miembro</button>
    </form>
  </div>;
};

export default App;
