// Enhanced JavaScript for Roy West Stake YSA Website
// Course Requirements: 10+ functions, objects, arrays, template literals, conditional branching, loops, DOM manipulation, localStorage

// Complex data objects for course requirements
const ysaData = {
    members: [
        { id: 1, name: 'Sarah Johnson', age: 23, interests: ['temple', 'service'] },
        { id: 2, name: 'Michael Chen', age: 25, interests: ['sports', 'social'] },
        { id: 3, name: 'Emily Rodriguez', age: 22, interests: ['music', 'temple'] },
        { id: 4, name: 'David Kim', age: 24, interests: ['service', 'outdoors'] }
    ],
    galleryCategories: ['all', 'activities', 'service', 'temple', 'social'],
    themeSettings: {
        light: { bg: '#ffffff', text: '#333333' },
        dark: { bg: '#2c3e50', text: '#ecf0f1' }
    }
};

// Function 1: Load common HTML elements (header/footer)
function includeHTML(elementId, filePath) {
    return new Promise((resolve, reject) => {
        const element = document.getElementById(elementId);
        if (!element) {
            reject(`Element with ID '${elementId}' not found`);
            return;
        }

        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                resolve(html);
            })
            .catch(error => {
                console.error(`Error loading ${filePath}:`, error);
                reject(error);
            });
    });
}

// Function 2: Enhanced gallery filtering using array methods and conditional branching
function filterGalleryImages(category = 'all') {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Array methods with conditional branching
    Array.from(galleryItems).forEach(item => {
        const itemCategory = item.dataset.category || 'general';
        
        if (category === 'all' || itemCategory === category) {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.3s ease';
        } else {
            item.style.display = 'none';
        }
    });
    
    // Template literal for logging
    console.log(`Gallery filtered to show: ${category}`);
}

// Function 3: User preferences management with localStorage and objects
function manageUserPreferences() {
    const defaultPreferences = {
        theme: 'light',
        language: 'en',
        notifications: true,
        lastVisit: new Date().toISOString()
    };
    
    // Get existing preferences or use defaults
    let preferences = JSON.parse(localStorage.getItem('userPreferences') || JSON.stringify(defaultPreferences));
    
    // Conditional branching for theme application
    if (preferences.theme === 'dark') {
        document.body.classList.add('dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
    }
    
    // Update last visit using template literal
    preferences.lastVisit = new Date().toISOString();
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    
    return preferences;
}

// Function 4: Theme management with conditional branching
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Conditional branching for theme switching
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    localStorage.setItem('theme', newTheme);
    document.body.classList.toggle('dark-theme', newTheme === 'dark');
    
    // Template literal for theme indicator
    const themeIndicator = document.getElementById('theme-indicator');
    if (themeIndicator) {
        themeIndicator.textContent = `Theme: ${newTheme.toUpperCase()}`;
    }
    
    // Update user preferences
    const prefs = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    prefs.theme = newTheme;
    localStorage.setItem('userPreferences', JSON.stringify(prefs));
}

// Function 5: Initialize gallery modal functionality (enhanced)
function initializeGalleryModal() {
    const imageModal = document.getElementById('imageModal');
    if (!imageModal) return;

    // Array of gallery images for navigation
    const galleryImages = Array.from(document.querySelectorAll('.gallery-item img'));
    let currentImageIndex = 0;

    // Event delegation for gallery clicks
    document.addEventListener('click', function(event) {
        if (event.target.matches('.gallery-item img')) {
            const clickedImage = event.target;
            currentImageIndex = galleryImages.indexOf(clickedImage);
            
            // Template literal for modal content
            const modalImage = imageModal.querySelector('#modalImage');
            modalImage.src = clickedImage.src;
            modalImage.alt = clickedImage.alt;
            
            // Show modal using Bootstrap
            const modal = new bootstrap.Modal(imageModal);
            modal.show();
        }
    });
}

// Function 6: Member search functionality with array methods
function searchMembers(searchTerm) {
    const results = ysaData.members.filter(member => {
        const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
        const interestMatch = member.interests.some(interest => 
            interest.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return nameMatch || interestMatch;
    });

    // Template literal for results display
    const resultHTML = results.map(member => `
        <div class="member-card">
            <h4>${member.name}</h4>
            <p>Age: ${member.age}</p>
            <p>Interests: ${member.interests.join(', ')}</p>
        </div>
    `).join('');

    console.log(`Found ${results.length} members matching "${searchTerm}"`);
    return results;
}

// Function 7: Dynamic content generator using loops and template literals
function generateNavigationMenu(pages) {
    const navContainer = document.querySelector('.navbar-nav');
    if (!navContainer) return;

    // Loop through pages array to generate menu
    pages.forEach((page, index) => {
        // Conditional branching for active page
        const isActive = window.location.pathname.includes(page.url);
        const activeClass = isActive ? 'active' : '';
        
        // Template literal for menu item
        const menuItem = `
            <li class="nav-item">
                <a class="nav-link ${activeClass}" href="${page.url}">
                    ${page.title}
                </a>
            </li>
        `;
        
        navContainer.innerHTML += menuItem;
    });
}

// Function 8: Form validation with conditional logic
function validateContactForm(formData) {
    const validation = {
        isValid: true,
        errors: []
    };

    // Array of required fields
    const requiredFields = ['email', 'name'];
    
    // Loop through required fields
    requiredFields.forEach(field => {
        if (!formData[field] || formData[field].trim() === '') {
            validation.isValid = false;
            validation.errors.push(`${field} is required`);
        }
    });

    // Conditional branching for email validation
    if (formData.email && !formData.email.includes('@')) {
        validation.isValid = false;
        validation.errors.push('Please enter a valid email address');
    }

    return validation;
}

// Function 9: Local storage management with objects
function saveFormData(formData) {
    const timestamp = new Date().toISOString();
    const savedData = {
        ...formData,
        timestamp,
        id: Date.now()
    };

    // Get existing submissions
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    submissions.push(savedData);
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));

    // Template literal for confirmation
    console.log(`Form data saved at ${timestamp}`);
    return savedData;
}

// Function 10: Initialize everything on page load with error handling
function initializeYSAWebsite() {
    try {
        // Load common header and footer
        Promise.all([
            includeHTML('common-header', 'ysa_header.html'),
            includeHTML('common-footer', 'ysa_footer.html')
        ]).then(() => {
            console.log('Header and footer loaded successfully');
        }).catch(error => {
            console.error('Error loading common elements:', error);
        });

        // Initialize gallery modal functionality
        initializeGalleryModal();
        
        // Initialize gathering page modal functionality
        initializeGatheringModal();
        
        // Initialize contact form if present
        initializeContactForm();
        
        // Apply saved user preferences
        manageUserPreferences();
        
        // Log initialization with template literal
        console.log(`YSA Website initialized at ${new Date().toISOString()}`);
        
    } catch (error) {
        console.error('Initialization error:', error);
    }
}

// Function 11: Dynamic theme indicator
function updateThemeIndicator() {
    const theme = localStorage.getItem('theme') || 'light';
    let indicator = document.getElementById('theme-indicator');
    
    if (!indicator) {
        indicator = document.createElement('div');
        indicator.id = 'theme-indicator';
        document.body.appendChild(indicator);
    }
    
    // Template literal with conditional styling
    indicator.innerHTML = `Theme: ${theme.toUpperCase()}`;
    indicator.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: ${theme === 'dark' ? '#34495e' : '#003366'};
        color: white;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        z-index: 1000;
    `;
}

// Function 12: Advanced array processing for analytics
function analyzeUserEngagement() {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    const preferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
    
    // Array methods for data analysis
    const analytics = {
        totalSubmissions: submissions.length,
        averageSubmissionsPerDay: submissions.filter(sub => {
            const subDate = new Date(sub.timestamp);
            const daysDiff = (Date.now() - subDate.getTime()) / (1000 * 60 * 60 * 24);
            return daysDiff <= 7;
        }).length / 7,
        currentTheme: preferences.theme || 'light',
        lastActivity: preferences.lastVisit
    };
    
    // Template literal for analytics report
    console.log(`Analytics Report:
        - Total Submissions: ${analytics.totalSubmissions}
        - Weekly Average: ${analytics.averageSubmissionsPerDay.toFixed(2)}
        - Current Theme: ${analytics.currentTheme}
        - Last Visit: ${analytics.lastActivity || 'Never'}`);
        
    return analytics;
}

// Function 13: Contact form submission handling with reset
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Add submit event listener
    contactForm.addEventListener('submit', function(event) {
        // Prevent default form submission to handle it manually
        event.preventDefault();
        
        // Get form data for validation and storage
        const formData = new FormData(contactForm);
        const submissionData = {
            email: formData.get('entry.1790656234'),
            name: formData.get('entry.2005620554'),
            phone: formData.get('entry.1166974658') || '',
            comments: formData.get('entry.839337160') || ''
        };
        
        // Validate form using existing validation function
        const validation = validateContactForm(submissionData);
        
        if (!validation.isValid) {
            // Show validation errors
            alert('Please fix the following errors:\n' + validation.errors.join('\n'));
            return;
        }
        
        // Save form data to localStorage
        saveFormData(submissionData);
        
        // Submit to Google Forms (using original method)
        const hiddenFrame = document.querySelector('iframe[name="hiddenFrame"]');
        
        // Create a temporary form to submit to Google
        const tempForm = document.createElement('form');
        tempForm.method = 'POST';
        tempForm.action = contactForm.action;
        tempForm.target = 'hiddenFrame';
        
        // Copy all form data to temp form
        for (let [key, value] of formData.entries()) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value;
            tempForm.appendChild(input);
        }
        
        document.body.appendChild(tempForm);
        tempForm.submit();
        document.body.removeChild(tempForm);
        
        // Reset form and show success message
        resetContactForm();
        
        // Template literal for success logging
        console.log(`Contact form submitted successfully by ${submissionData.name} at ${new Date().toISOString()}`);
    });
}

// Function 14: Reset contact form with success feedback
function resetContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    
    if (contactForm) {
        // Reset all form fields
        contactForm.reset();
        
        // Show success message with animation
        if (successMessage) {
            successMessage.style.display = 'block';
            successMessage.style.animation = 'fadeIn 0.5s ease';
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                successMessage.style.animation = 'fadeOut 0.5s ease';
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 500);
            }, 5000);
        }
        
        // Focus on first input for better UX
        const firstInput = contactForm.querySelector('input[type="email"]');
        if (firstInput) {
            firstInput.focus();
        }
    }
}

// Function 15: Initialize gathering page modal functionality
function initializeGatheringModal() {
    const gatheringModal = document.getElementById('gatheringImageModal');
    if (!gatheringModal) return;

    // Handle modal show event
    gatheringModal.addEventListener('show.bs.modal', function (event) {
        const trigger = event.relatedTarget; // Element that triggered the modal
        
        if (trigger) {
            // Extract info from data-bs-* attributes
            const imageSrc = trigger.getAttribute('data-bs-image');
            const imageTitle = trigger.getAttribute('data-bs-title');
            
            // Update modal content
            const modalImage = document.getElementById('gatheringModalImage');
            const modalTitle = document.getElementById('gatheringImageModalLabel');
            
            if (modalImage && imageSrc) {
                modalImage.src = imageSrc;
                modalImage.alt = imageTitle || 'Gathering Place Image';
            }
            
            if (modalTitle && imageTitle) {
                modalTitle.textContent = imageTitle;
            }
            
            // Template literal for logging
            console.log(`Gathering modal opened for image: ${imageTitle || imageSrc}`);
        }
    });

    // Add click event listeners to all gathering images
    const gatheringImages = document.querySelectorAll('[data-bs-target="#gatheringImageModal"]');
    gatheringImages.forEach((image, index) => {
        image.style.cursor = 'pointer';
        image.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        image.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Template literal for accessibility
        image.setAttribute('title', `Click to view ${image.alt} in full size`);
    });
}

// DOM Content Loaded event listener
document.addEventListener('DOMContentLoaded', initializeYSAWebsite);

// Theme toggle button event listener
document.addEventListener('click', function(event) {
    if (event.target.id === 'theme-toggle' || event.target.closest('#theme-toggle')) {
        toggleTheme();
        updateThemeIndicator();
    }
});

// Export functions for testing and external use
if (typeof window !== 'undefined') {
    window.ysaWebsite = {
        filterGalleryImages,
        toggleTheme,
        searchMembers,
        validateContactForm,
        saveFormData,
        analyzeUserEngagement,
        manageUserPreferences,
        initializeContactForm,
        resetContactForm,
        initializeGatheringModal
    };
}