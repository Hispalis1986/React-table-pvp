import React from "react";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input type="text" required="required" placeholder="Nombre del miembro" name="name" value={editFormData.name} onChange={handleEditFormChange}></input>
            </td>
            <td>
            <input type="text" required="required" placeholder="rol" name="rol" value={editFormData.rol} onChange={handleEditFormChange}/>
            </td>
            <td>
            <input type="text" required="required" placeholder="weapon" name="weapon" value={editFormData.weapon} onChange={handleEditFormChange}/>
            </td>
            <td>
            <input type="text" required="required" placeholder="profession" name="profession" value={editFormData.profession} onChange={handleEditFormChange}/>
            </td>
            <td>
                <button type="submit">Guardar</button>
                <button type="button" onClick={handleCancelClick}>Cancelar</button>
            </td>
        </tr>
    )
}

export default EditableRow;