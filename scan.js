import createCapture from './capture'; 
import fetchMacVender from './macAddressToManufacturer';
import onConnect from './onConnect'
const macAddressCache = {};

const logMac = mac => {
  if((/amazon/gi).test(macAddressCache[mac])) {
    console.log(`${mac} (${macAddressCache[mac]})`);  
  }
}

const packetHandler = details =>  {
  const mac = details.info.srcmac;
  onConnect(details)(mac)(() => {
    if(!macAddressCache[mac]) {
      fetchMacVender(mac)
        .then(manufacturer => macAddressCache[mac] = manufacturer)
        .then(() => logMac(mac))
        .catch(console.error.bind(console))
    } else {
      logMac(mac);
    }
  });
}

createCapture(packetHandler);