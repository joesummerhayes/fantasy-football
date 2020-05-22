import React from 'react';
import { RouteComponentProps } from "react-router-dom";

class Callback extends React.Component<{} & RouteComponentProps<{}> >{
  render() {
    return (
      <div>...Loading</div>
    )
  }
}

export default Callback;
