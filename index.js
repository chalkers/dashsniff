import createCapture from './capture'; 
import onConnect from './onConnect'

const packetHandler = details =>  {
  const onSrcAddress = onConnect(details);
  onSrcAddress("aa:bb:cc:dd:ee:ff")(() => console.log("tide"));
  onSrcAddress("aa:bb:cc:dd:ee:fe")(() => console.log("ziploc"));
  onSrcAddress("aa:bb:cc:dd:ee:fd")(() => console.log("cascade"));
}

createCapture(packetHandler); 