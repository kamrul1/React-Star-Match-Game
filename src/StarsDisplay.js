import React from "react";
import "./styles.css";

import { utils } from "./Utils";

/**This is using fragement to return multiple */
export const StarsDisplay = props => (
  <>
    {utils.range(1, props.count).map(starId => (
      <div key={starId} className="star" />
    ))}
  </>
);
