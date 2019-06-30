//Custom function to sort device list 

const sortArray = function(a, b) {
  return isNaN(a.device) === isNaN(b.device) ? a.device.localeCompare(b.device) : (isNaN(a.device) ? -1 : 1);
}

export default sortArray





