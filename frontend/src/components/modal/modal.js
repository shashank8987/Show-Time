import { useState } from "react";
import "./modal.css";

const Modal = ({ children, popTitle }) => {
  const [toggle, setToggle] = useState(false);
  const toggleModal = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <button className="btn pointer" style={{height:"9%", width:"30%", backgroundColor:"black", color:"white", padding:"1.3%", fontWeight:"medium", fontFamily:"Cambria, Cochin, Georgia, Times, 'Times New Roman', serif", borderRadius:"20%", cursor:"pointer", fontSize:"medium"}} onClick={toggleModal}>{popTitle}</button>
      {toggle ? (
        <div>
          <div onClick={toggleModal} className="overlay"></div>
          <div className="Modal_content">
            {children}
            <button onClick={toggleModal} className="close_Modal">
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Modal;