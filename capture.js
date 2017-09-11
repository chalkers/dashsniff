import flatten from 'lodash/flatten'; 
import {Cap, decoders} from 'cap';

const extractAddresses = device => device.addresses; 
const findAppropriateInterfaces = address => address.broadaddr === '0.0.0.0'; 
const networkInterfaces = Cap.deviceList()
const networkAddresses = flatten(networkInterfaces.map(extractAddresses))
                    .filter(findAppropriateInterfaces)
                    .map(address => address.addr); 

function createCaptureForAddress(address, handler) {
  var c = new Cap(), 
    device = Cap.findDevice(address), 
    filter = 'arp', 
    bufSize = 10 * 1024 * 1024, 
    buffer = new Buffer(65535); 

  var linkType = c.open(device, filter, bufSize, buffer); 

  c.setMinBytes && c.setMinBytes(0); 

  c.on('packet', handler(linkType, buffer)); 
}

const createCaptureForHandler = handler => address => createCaptureForAddress(address, handler);

const packetHandler = handler => (linkType, buffer) => (nbytes, trunc) =>  {
  if (trunc === false) {
    if (linkType === 'ETHERNET') {
      const details = decoders.Ethernet(buffer); 
      handler(details); 
    }
  }
}

export default handler =>
  networkAddresses.forEach(createCaptureForHandler(packetHandler(handler)));