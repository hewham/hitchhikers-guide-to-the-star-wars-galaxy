export default function searchFilter(input, array) {
  return array.filter((v) => {
    if (v.name.toLowerCase().indexOf(input.toLowerCase()) > -1) {
      return true;
    }
    return false;
  });
}