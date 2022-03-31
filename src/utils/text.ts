export const decodeToSJIS = (buffer: Buffer) => {
  const decoder = new TextDecoder('shift_jis');
  return decoder.decode(buffer);
};

export const extractNumber = (str: string) => {
  return str.match(/(\d+)(?:\.(\d+))?/g)
    ?.join('') || '0';
};
