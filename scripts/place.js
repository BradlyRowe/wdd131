// Static values for temperature and wind speed
const temperature = 50; // °F
const windSpeed = 5;    // mph

// Wind Chill Calculation (Imperial formula)
function calculateWindChill(temp, speed) {
    return (
        35.74 +
        0.6215 * temp -
        35.75 * Math.pow(speed, 0.16) +
        0.4275 * temp * Math.pow(speed, 0.16)
    ).toFixed(1);
}

// Display Wind Chill
const chillElement = document.getElementById("chill");
if (temperature <= 50 && windSpeed > 3) {
    chillElement.textContent = `${calculateWindChill(temperature, windSpeed)} °F`;
    } else {
    chillElement.textContent = "N/A";
}

// Display Current Year
document.getElementById("year").textContent = new Date().getFullYear();

// Display Last Modified Date
document.getElementById("modified").textContent = document.lastModified;
