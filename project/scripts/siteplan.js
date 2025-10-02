// Get current year and last modified date for footer
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    const currentYear = document.getElementById('currentyear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Set last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = `Last Modified: ${document.lastModified}`;
    }
});