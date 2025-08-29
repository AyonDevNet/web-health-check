
document.getElementById('btn').addEventListener('click' , function(){

//    const inputArea = document.getElementById('input-box').ariaValueMax.trim()

    const PORTS = [22, 80, 443, 21, 25, 3306, 8080];

function port_health() {
  PORTS.forEach(port => {
    if (port === 22) {
      console.log("Port 22: SSH is working ✅");
    } else if (port === 80) {
      console.log("Port 80: HTTP is working ✅");
    } else if (port === 443) {
      console.log("Port 443: HTTPS is working ✅");
    } else if (port === 21) {
      console.log("Port 21: FTP is working ✅");
    } else if (port === 25) {
      console.log("Port 25: SMTP is working ✅");
    } else if (port === 3306) {
      console.log("Port 3306: MySQL is working ✅");
    } else if (port === 8080) {
      console.log("Port 8080: HTTP-Alt (proxy/dev server) is working ✅");
    } else {
      console.log(`Port ${port}: Unknown service ❌`);
    }
  });
}

port_health();


})





