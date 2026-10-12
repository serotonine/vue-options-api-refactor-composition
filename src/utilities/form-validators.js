export function isValidLink(link){
  /* const regExp = new RegExp(/^https?:\/\//,"i"); */
  const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/;

  return urlRegex.test(link);
}