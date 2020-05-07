import { connect } from 'react-redux';
import Controls from '../components/Controls';
import { videoReady } from '../actions';


class Controls extends Component{
  componentDidMount() {
    this.props.ready(this.video);
  }

  render() {
    return (
      <div className="controls">
        <div>
          <div className="video">
            <video
              ref={el => this.video = el}
              autoPlay
              playsInline
              muted
              id="webcam"
              width="100%"
              height="100%"
            />


const mapDispatchToProps = (dispatch) => {
  return {
    ready: (videoEl) => dispatch(videoReady(videoEl)),
  }
}

const ControlsContainer = connect(
  null,
  mapDispatchToProps,
)(Controls);

export default ControlsContainer;
