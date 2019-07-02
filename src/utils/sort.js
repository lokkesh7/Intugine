//Custom function to sort device list 

const sortDevice = function(a, b) {
  return isNaN(a.device) === isNaN(b.device) ? a.device.localeCompare(b.device) : (isNaN(a.device) ? -1 : 1);
}

const isValidDate = (d) => {
  return d instanceof Date && !isNaN(d);
}

export default {sortDevice, isValidDate}




