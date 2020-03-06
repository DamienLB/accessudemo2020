import { updateNotification } from '../actions';


export const mapDispatchToProps = (dispatch) => {
  return {
    notifs: (el) => {
      return {
        SELECTED: [(payload) => {
          dispatch(updateNotification(`The ${el.type} is selected.`));
        }],
        GRABBED: [(payload) => {
          dispatch(updateNotification(`The ${el.type} is selected.`));
        }],
        DROPPING: [(payload, overrides) => {
          const target = payload.target;
          if (target) {
            if (
              (el.type === 'mouse' && target.type === 'cheese') ||
              (el.type === 'cat' && target.type === 'mouse')
            ) {
              return;
            }
              dispatch(updateNotification(`The ${el.type} is rejected from the ${payload.target.type}.`, 1));
              el.returnToPivot();
              overrides.DROPPING = true;
          }
        }],
        DROPPED: [(payload) => {
          const target = el.target;
          dispatch(updateNotification(`The ${el.type} has been dropped${target ? ` on ${target.type}` : ''}.`, 1));
        }],
        HOVERING: [(payload) => {
          if (payload.hovering.length) {
            dispatch(updateNotification(`The ${el.type} is hovering the ${payload.hovering[0].target.type}.`, 1));
           }
        }],
        MOVING_TOWARDS: [(payload) => {
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
        }],
      };
    },
  }
};
