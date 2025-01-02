import { Button } from "react-bootstrap";
import Tab1Content from "./Tab3/Tab1Content";
import Tab2Content from "./Tab3/Tab2Content";
import Tab3Content from "./Tab3/Tab3Content";
import React, { useState } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

export default function FaqTabs() {
  // const [justifyActive, setJustifyActive] = useState("tab2");

  // const handleJustifyClick = (value: string) => {
  //   if (value === justifyActive) {
  //     return;
  //   }

  //   setJustifyActive(value);
  // };

  return (
    <>
      <div className="item-center">
        <div className="bg-color-blue-sec-small">
          <div className="d-flex justify-content-center align-items-center gap-3 pt-4 pb-4">
            {/* <MDBTabs justify className=" pt-4 pb-4 border-bottom-0"> */}
            {/* <MDBTabsItem> */}
            <Button
              className="dash-btn"
              // onClick={() => handleJustifyClick("tab1")}
              // active={justifyActive === "tab1"}
            >
              {"Picks"}
            </Button>
            {/* </MDBTabsItem> */}
            {/* <MDBTabsItem> */}
            <Button
              className="dash-btn"
              // onClick={() => handleJustifyClick("tab2")}
              // active={justifyActive === "tab2"}
            >
              {"Información personal"}
            </Button>
            {/* </MDBTabsItem> */}
            {/* <MDBTabsItem> */}
            <Button
              className="dash-btn dash-bottom-btn"
              // onClick={() => handleJustifyClick("tab3")}
              // active={justifyActive === "tab3"}
            >
              {"Configuración"}
            </Button>
            {/* </MDBTabsItem> */}
            {/* </MDBTabs> */}
          </div>
        </div>
      </div>

      {/* <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <Tab1Content />
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === "tab2"}>
          <Tab2Content />
        </MDBTabsPane>
        <MDBTabsPane show={justifyActive === "tab3"}>
          <Tab3Content />
        </MDBTabsPane>
      </MDBTabsContent> */}
    </>
  );
}
