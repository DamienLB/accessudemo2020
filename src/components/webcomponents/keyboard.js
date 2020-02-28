const keyboardConfig = {
  [0]: {
    [37]: 'MOVE_LEFT',
    [38]: 'MOVE_UP',
    [39]: 'MOVE_RIGHT',
    [40]: 'MOVE_DOWN',
    // [9]: 'MOVE_TO_NEXT',
    [32]: 'PICKUP_DROP',
  },
  [1]: {
    [37]: 'MOVE_LEFT_FAST',
    [38]: 'MOVE_UP_FAST',
    [39]: 'MOVE_RIGHT_FAST',
    [40]: 'MOVE_DOWN_FAST',
    // [9]: 'MOVE_TO_PREV',
  }
}

export const StandardKeyActions = (e) => {
  const keyCode = e.keyCode || e.which;
  const token = e.target;
  const includesShift = e.shiftKey === true && 1 || 0;
  const action = keyboardConfig[includesShift] && keyboardConfig[includesShift][keyCode];
  if (action) {
    switch (action) {
      case 'MOVE_LEFT':
        if (token.pickedup) token.moveLeft();
        break;
      case 'MOVE_RIGHT':
        if (token.pickedup) token.moveRight();
        break;
      case 'MOVE_UP':
        if (token.pickedup) token.moveUp();
        break;
      case 'MOVE_DOWN':
        if (token.pickedup) token.moveDown();
        break;
      case 'MOVE_LEFT_FAST':
        if (token.pickedup) token.moveLeft(true);
        break;
      case 'MOVE_RIGHT_FAST':
        if (token.pickedup) token.moveRight(true);
        break;
      case 'MOVE_UP_FAST':
        if (token.pickedup) token.moveUp(true);
        break;
      case 'MOVE_DOWN_FAST':
        if (token.pickedup) token.moveDown(true);
        break;
        // case 'MOVE_TO_NEXT':
        //   target.moveToNext();
        // break;
        // case 'MOVE_TO_PREV':
        //   target.moveToPrev();
        break;
      case 'PICKUP_DROP':
        if (token.pickedup) {
          token.drop();
        } else {
          token.pickup();
        }
        break;
    }
  }
}
