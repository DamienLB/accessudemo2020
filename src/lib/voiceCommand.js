let type;


const voiceCommand = (text) => {
  const selectregex = /(use|focus) the (mouse|cat|cheese)/i
  const selectmatch = text.match(selectregex);
  if (selectmatch && selectmatch.length) {
    type = selectmatch[2];
    return { type, cmd: 'focus' };
  }
  
  const cmdregex = /(up|down|left|right|next|back|pick up|drop)/i
  const cmdmatch = text.match(cmdregex);
  if (cmdmatch && cmdmatch.length) {
    const cmd = cmdmatch[1];
    return { type, cmd };
  }

  return { type, cmd: '' };
}

export default voiceCommand;