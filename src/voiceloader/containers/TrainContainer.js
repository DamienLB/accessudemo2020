import React from 'react';
import { connect } from 'react-redux';
import { captureSample, nextSample, train, saveModel } from '../actions';

const Display = (props) => {
	if (props.disabled) return null;
	const collectbtn_text = props.collectDisabled ? 'Sampling Room Noise' : 'Collect';
	let trainbtn_text = 'Train';
	if (props.training) {
		trainbtn_text = 'Training in Progress (Please Wait)';
	}
	if (props.trainingEnded) {
		trainbtn_text = 'Training Complete!';
	}
	let savebtn_text = "Save";
	if (props.modelSaved) {
		savebtn_text = "Saved!";
	}
  return (
  	<div className="savi-trainer">
  	  <button
  	    onMouseUp={() => { props.endCollect(); }}
  	    onMouseDown={() => { props.startCollect(props.index); }}
  	    disabled={props.collectDisabled}
  	   >{collectbtn_text}</button>
  	   <button
  	    onClick={() => { props.next(); }}
  	    disabled={props.nextDisabled}
  	   >Next</button>
  	   <button
  	    onClick={() => { props.train(); }}
  	    disabled={props.trainDisabled}
  	   >{trainbtn_text}</button>
  	   <button
  	    onClick={() => { props.save(); }}
  	    disabled={props.saveDisabled}
  	   >{savebtn_text}</button>
  	</div>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.components && state.components[state.current] || '',
    index: state.current,
    nextDisabled: state.current === state.components.length - 1 || state.nextDisabled,
    collectDisabled: state.samplingNoise || state.trainMode > 1,
    trainDisabled: state.trainMode !== 1,
    training: state.trainMode === 2,
    trainingEnded: state.trainMode === 3,
    saveDisabled: state.trainMode !== 3 || state.modelSaved,
    disabled: !state.showTrainer,
    modelSaved: state.modelSaved,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startCollect: (label) => { dispatch(captureSample(label)) },
    endCollect: () => { dispatch(captureSample()) },
    next: () => { dispatch(nextSample()) },
    train: () => { dispatch(train()) },
    save: () => { dispatch(saveModel()) },
  };
};

const TrainContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Display);

export default TrainContainer;
