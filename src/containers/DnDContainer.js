import { updateNotification } from '../actions';


export const mapDispatchToProps = (dispatch) => {
  return {
    notify: (el) => (type, payload) => {
      switch(type) {
        case 'SELECTED':
          dispatch(updateNotification(`The ${el.type} is selected.`));
          break;
        case 'GRABBED':
          dispatch(updateNotification(`The ${el.type} is picked-up.`, 1));
          break;
        case 'DROPPING':
          if (payload.target) {
            if (
              (el.type === 'mouse' && payload.target.type === 'cheese') ||
              (el.type === 'cat' && payload.target.type === 'mouse')
            ) {
              return false;
            }
              dispatch(updateNotification(`The ${el.type} is rejected from the ${payload.target.type}.`, 1));
              return () => el.returnToPivot();
          }
          break;
        case 'DROPPED':
          dispatch(updateNotification(`The ${el.type} has been dropped${payload.target ? ` on ${payload.target.type}` : ''}.`, 1));
          break;
        case 'HOVERING':
          if (payload.hovering.length) {
            dispatch(updateNotification(`The ${el.type} is hovering the ${payload.hovering[0].target.type}.`, 1));
           }
          break;
        case 'MOVING_TOWARDS':
          const { x, y, newx, newy } = payload;
          if (x < newx) {
            dispatch(updateNotification(`The ${el.type} is moving to the right.`));
          }
          if (x > newx) {
            dispatch(updateNotification(`The ${el.type} is moving to the left.`));
          }
          if (y < newy) {
            dispatch(updateNotification(`The ${el.type} is moving down.`));
          }
          if (y > newy) {
            dispatch(updateNotification(`The ${el.type} is moving up.`));
          }
          break;        
      }
      return false;
    },
  };
};
