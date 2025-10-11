// Roy West YSA Hub - Main JavaScript
// Handles hero image toggling, content management, and interactive features

// Hero Image Management System
class HeroImageManager {
    constructor() {
        this.heroSettings = this.loadHeroSettings();
        this.initializeHeroImages();
        this.initializeDateElements();
        this.initializeNavigation();
        this.initializeContent();
    }

    // Load hero image settings from localStorage (admin-controlled)
    loadHeroSettings() {
        const defaultSettings = {
            h1: { enabled: true, src: 'images/hero-h1.jpg', alt: 'Roy West YSA Community' },
            h2: { enabled: true, src: 'images/hero-h2.jpg', alt: 'About Our Mission' },
            h3: { enabled: true, src: 'images/hero-h3.jpg', alt: 'Gathering Place Events' },
            h4: { enabled: true, src: 'images/hero-h4.jpg', alt: 'Contact Our Leaders' }
        };
        
        const saved = localStorage.getItem('ysa-hero-settings');
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    }

    // Save hero image settings to localStorage
    saveHeroSettings() {
        localStorage.setItem('ysa-hero-settings', JSON.stringify(this.heroSettings));
    }

    // Initialize hero images based on admin settings
    initializeHeroImages() {
        const heroContainers = document.querySelectorAll('.hero-image-container');
        
        heroContainers.forEach(container => {
            const heading = container.getAttribute('data-heading');
            const settings = this.heroSettings[heading];
            
            if (settings && settings.enabled) {
                container.style.display = 'block';
                const img = container.querySelector('.hero-image');
                if (img) {
                    img.src = settings.src;
                    img.alt = settings.alt;
                }
            } else {
                container.style.display = 'none';
            }
        });
    }

    // Admin function to toggle hero images (for future admin page)
    toggleHeroImage(heading, enabled) {
        if (this.heroSettings[heading]) {
            this.heroSettings[heading].enabled = enabled;
            this.saveHeroSettings();
            this.initializeHeroImages();
        }
    }

    // Admin function to update hero image source
    updateHeroImage(heading, src, alt) {
        if (this.heroSettings[heading]) {
            this.heroSettings[heading].src = src;
            this.heroSettings[heading].alt = alt;
            this.saveHeroSettings();
            this.initializeHeroImages();
        }
    }

    // Initialize footer date elements
    initializeDateElements() {
        const currentYear = new Date().getFullYear();
        const lastModified = document.lastModified;
        
        const yearElement = document.getElementById('year');
        const modifiedElement = document.getElementById('modified');
        
        if (yearElement) yearElement.textContent = currentYear;
        if (modifiedElement) modifiedElement.textContent = lastModified;
    }

    // Initialize smooth scrolling navigation
    initializeNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Initialize dynamic content
    initializeContent() {
        this.loadEvents();
        this.loadAnnouncements();
        this.initializeContactForm();
    }

    // Load events from localStorage or default data
    loadEvents() {
        const defaultEvents = [
            {
                title: 'Sunday Devotional',
                date: '2025-10-15',
                time: '7:00 PM',
                location: 'Roy West Stake Center',
                description: 'Weekly spiritual thought and fellowship'
            },
            {
                title: 'Service Project',
                date: '2025-10-20',
                time: '9:00 AM',
                location: 'Local Food Bank',
                description: 'Community service opportunity'
            },
            {
                title: 'Game Night',
                date: '2025-10-25',
                time: '6:30 PM',
                location: 'Cultural Hall',
                description: 'Fun activities and games for all'
            }
        ];

        const saved = localStorage.getItem('ysa-events');
        const events = saved ? JSON.parse(saved) : defaultEvents;
        
        this.renderEvents(events);
    }

    // Render events to the page
    renderEvents(events) {
        const container = document.getElementById('events-container');
        if (!container) return;

        container.innerHTML = events.map(event => `
            <div class="event-card">
                <h5 class="event-title">${event.title}</h5>
                <div class="event-details">
                    <p class="event-date">${this.formatDate(event.date)} at ${event.time}</p>
                    <p class="event-location">${event.location}</p>
                    <p class="event-description">${event.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Load announcements from localStorage or default data
    loadAnnouncements() {
        const defaultAnnouncements = [
            {
                title: 'New YSA Leadership',
                content: 'Welcome our new YSA presidency! Meet them at the next devotional.',
                date: '2025-10-10'
            },
            {
                title: 'Temple Trip Planning',
                content: 'Planning a group temple trip for next month. Sign up at activities.',
                date: '2025-10-08'
            }
        ];

        const saved = localStorage.getItem('ysa-announcements');
        const announcements = saved ? JSON.parse(saved) : defaultAnnouncements;
        
        this.renderAnnouncements(announcements);
    }

    // Render announcements to the page
    renderAnnouncements(announcements) {
        const container = document.getElementById('announcements-container');
        if (!container) return;

        container.innerHTML = announcements.map(announcement => `
            <div class="announcement-card">
                <h6 class="announcement-title">${announcement.title}</h6>
                <p class="announcement-content">${announcement.content}</p>
                <span class="announcement-date">${this.formatDate(announcement.date)}</span>
            </div>
        `).join('');
    }

    // Load announcements for home page (limited to 3 recent)
    loadHomeAnnouncements() {
        const defaultAnnouncements = [
            {
                title: 'New YSA Leadership',
                content: 'Welcome our new YSA presidency! Meet them at the next devotional.',
                date: '2025-10-10'
            },
            {
                title: 'Temple Trip Planning',
                content: 'Planning a group temple trip for next month. Sign up at activities.',
                date: '2025-10-08'
            },
            {
                title: 'Service Project',
                content: 'Join us for community service this Saturday at 9 AM.',
                date: '2025-10-05'
            }
        ];

        const saved = localStorage.getItem('ysa-announcements');
        const allAnnouncements = saved ? JSON.parse(saved) : defaultAnnouncements;
        
        // Get most recent 3 announcements
        const recentAnnouncements = allAnnouncements
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3);
        
        this.renderHomeAnnouncements(recentAnnouncements);
    }

    // Render home announcements
    renderHomeAnnouncements(announcements) {
        const container = document.getElementById('home-announcements-container');
        if (!container) return;

        container.innerHTML = announcements.map(announcement => `
            <div class="home-announcement-item">
                <div class="home-announcement-title">${announcement.title}</div>
                <div class="home-announcement-content">${announcement.content}</div>
                <div class="home-announcement-date">${this.formatDate(announcement.date)}</div>
            </div>
        `).join('');
    }

    // Initialize contact form handling
    initializeContactForm() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(form);
            const contactData = {
                name: form.querySelector('input[type="text"]').value,
                email: form.querySelector('input[type="email"]').value,
                message: form.querySelector('textarea').value,
                timestamp: new Date().toISOString()
            };

            // Save to localStorage (in real app, would send to server)
            this.saveContactMessage(contactData);
            
            // Show success message
            this.showContactSuccess();
            
            // Reset form
            form.reset();
        });
    }

    // Save contact message to localStorage
    saveContactMessage(contactData) {
        const messages = JSON.parse(localStorage.getItem('ysa-contact-messages') || '[]');
        messages.push(contactData);
        localStorage.setItem('ysa-contact-messages', JSON.stringify(messages));
    }

    // Show contact form success message
    showContactSuccess() {
        const button = document.querySelector('.submit-button');
        const originalText = button.textContent;
        
        button.textContent = 'Message Sent!';
        button.style.backgroundColor = '#27ae60';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
        }, 3000);
    }

    // Utility function to format dates
    formatDate(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
}

// Admin Interface (for future admin page)
class YSAAdmin {
    constructor(heroManager) {
        this.heroManager = heroManager;
    }

    // Get current hero settings
    getHeroSettings() {
        return this.heroManager.heroSettings;
    }

    // Toggle hero image visibility
    toggleHero(heading, enabled) {
        this.heroManager.toggleHeroImage(heading, enabled);
    }

    // Update hero image
    updateHero(heading, src, alt) {
        this.heroManager.updateHeroImage(heading, src, alt);
    }

    // Get all contact messages
    getContactMessages() {
        return JSON.parse(localStorage.getItem('ysa-contact-messages') || '[]');
    }

    // Update events
    updateEvents(events) {
        localStorage.setItem('ysa-events', JSON.stringify(events));
        this.heroManager.loadEvents();
    }

    // Update announcements
    updateAnnouncements(announcements) {
        localStorage.setItem('ysa-announcements', JSON.stringify(announcements));
        this.heroManager.loadAnnouncements();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the hero image manager
    window.heroManager = new HeroImageManager();
    
    // Initialize admin interface (for future use)
    window.ysaAdmin = new YSAAdmin(window.heroManager);
    
    // Console message for developers
    console.log('Roy West YSA Hub initialized');
    console.log('Admin functions available via window.ysaAdmin');
    console.log('Hero manager available via window.heroManager');
});

// Export for potential future module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { HeroImageManager, YSAAdmin };
}