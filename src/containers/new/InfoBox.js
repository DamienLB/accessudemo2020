import { connect } from 'react-redux';
import { infoBoxOff } from '../actions';


const InfoBox = ({ text, close, on }) => {
  return (
    <div className="infoBar" style={{
      display: on && 'block' || 'none';
    }}>
      <div>{text}</div>
      <button
        aria-label="close"
        onClick={() => close()}
      >X</button>
    </div>
  );
}


const mapStateToProps = (state) => {
  return {
    text: state.infoText,
    on: state.infoOn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    close: dispatch(infoBoxOff()),
  }
}

const InfoBoxContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoBox);

export default InfoBoxContainer;
