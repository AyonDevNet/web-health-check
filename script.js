document.getElementById('btn').addEventListener('click', function(){
    
    // Fix 1: Use .value instead of .ariaValueMax
    const inputArea = document.getElementById('input-box').value.trim();
    
    const PORTS = [22, 80, 443, 21, 25, 3306, 8080];
    
    // Fix 2: Create a variable to store all results
    let allResults = "";
    
    function port_health() {
        PORTS.forEach(port => {
            if (port === 22) {
                allResults += "Port 22: SSH is working<br>";
            } else if (port === 80) {
                allResults += "Port 80: HTTP is working<br>";
            } else if (port === 443) {
                allResults += "Port 443: HTTPS is working<br>";
            } else if (port === 21) {
                allResults += "Port 21: FTP is working<br>";
            } else if (port === 25) {
                allResults += "Port 25: SMTP is working<br>";
            } else if (port === 3306) {
                allResults += "Port 3306: MySQL is working<br>";
            } else if (port === 8080) {
                allResults += "Port 8080: HTTP-Alt (proxy/dev server) is working<br>";
            } else {
                allResults += `Port ${port}: Unknown service<br>`;
            }
        });
    }
    
    // Call the function to generate results
    port_health();
    
    // Fix 3: Show the div and display the if/else results
    let result = document.getElementById('resultShow');
    result.style.display = "block";
    
    // Fix 4: Show the actual if/else results, not the PORTS array
    result.innerHTML = allResults;
    
});