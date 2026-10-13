export function cleanTxt(txt) {
  if(txt && txt.length){
    return txt.toLowerCase().trim();
  }
  return '';
}
export function capitalize(txt){
   if(txt && txt.length){
  return txt.charAt(0).toUpperCase() + txt.substring(1);
   }
   return '';
}
