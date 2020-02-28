import React from 'react';


const Loader = (props) => {
  const LoadedApp = props.app.component;
  const appprops = props.app.props;
  return (
		<React.Fragment>
	    <h2>{props.title}</h2>
	    <div><LoadedApp options={appprops}/></div>
		</React.Fragment>
  );
}

export default Loader;
