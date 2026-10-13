export function cleanTxt(txt) {
  if(txt && txt.length){
    return txt.toLowerCase().trim();
  }
  return '';
}
