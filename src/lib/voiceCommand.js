let type;


const voiceCommand = (text) => {
  const selectregex = /(select|use|focus|pick up) (the|a) (mouse|cat|cheese)/i
  const selectmatch = text.match(selectregex);
  if (selectmatch && selectmatch.length) {
    type = selectmatch[3];
    return { type, cmd: 'pickup' };
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