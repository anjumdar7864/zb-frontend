import Assets from "@/assets";
import React from "react";
import { StyleWellCome } from "./style";

const SecurityPage = () => {
  return (
    <>
      <StyleWellCome>
        <section>
          <img src={Assets.Images.zeitBlast_logoA} alt="logo" />
          <h1>Coming soon</h1>
          <p>we're working hard to bring something awesome. Stay tuned!</p>
        </section>
      </StyleWellCome>
    </>
  );
};

export default SecurityPage;