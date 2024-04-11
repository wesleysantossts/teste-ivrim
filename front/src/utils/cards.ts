export function capitalizeWords(str) {
  let words = str.split(' ');
  let capitalizedWords = words.map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
  
  return capitalizedWords.join(' ');
}