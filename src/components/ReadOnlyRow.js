import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{contact.name}</td>
            <td>{contact.rol}</td>
            <td>{contact.weapon}</td>
            <td>{contact.profession}</td>
            <td>
                <button type="button" onClick={(event) => handleEditClick(event, contact)}>Editar</button>
                <button type="button" onClick={() => handleDeleteClick(contact.id)}>Borrar</button>
            </td>
          </tr>
    );
};

export default ReadOnlyRow;