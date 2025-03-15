import React, { useContext } from 'react';
import { UserContext } from './UserContext';

export default function Perfil() {
  const { currentUser } = useContext(UserContext);

  return (
    <div>
      {currentUser ? (
        <>
          <p><strong>Nombre:</strong> {currentUser.name}</p>
          <p><strong>Apellidos:</strong> {currentUser.lastName} {currentUser.surName}</p>
          <p><strong>Edad:</strong> {currentUser.age}</p>
          <p><strong>Teléfono:</strong> {currentUser.phone}</p>
        </>
      ) : (
        <p>No hay usuario registrado.</p>
      )}
    </div>
  );
}
