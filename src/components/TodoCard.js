import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function TodoCard(props) {
  const { children, handleDeleteTodo, index } = props;
  return (
    <li className="todoItem">
      <div className="actionContainer">
        {children}
        <button>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
        <button
          onClick={() => {
            handleDeleteTodo(index);
          }}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </li>
  );
}
