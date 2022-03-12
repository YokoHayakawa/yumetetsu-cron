export const decodeToSJIS = (buffer: Buffer) => {
  const decoder = new TextDecoder('shift_jis');


  return decoder.decode(buffer);
};
