import { connect } from 'react-redux';
import Notification from '../components/Notification';


const mapStateToProps = (state) => {
  return {
    text: state.notification,
  };
};

const NotificationContainer = connect(
  mapStateToProps,
  null,
)(Notification);

export default NotificationContainer;
