import React from "react";

const Confirmed = () => {
  return (
    <div id="Confirmed" className="flex-container">
      <img src={require("../images/logo.svg")} alt="logo" />
      <div id="confirm-msg">
        <h2>TEBRİKLER!</h2>
        <h2>SİPARİŞİNİZ ALINDI!</h2>
      </div>
    </div>
  );
};
export default Confirmed;
