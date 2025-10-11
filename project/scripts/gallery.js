// Gallery functionality for filtering and loading photos
class GalleryManager {
    constructor() {
        this.photoGrid = document.getElementById('photo-gallery');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.loadMoreBtn = document.getElementById('load-more');
        this.currentFilter = 'all';
        this.photosPerLoad = 12;
        this.currentPhotoCount = 12; // Initial photos shown
        
        this.initializeGallery();
    }

    initializeGallery() {
        // Initialize filter buttons
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterChange(e.target.dataset.filter);
            });
        });

        // Initialize load more button
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadMorePhotos();
            });
        }

        // Initialize photo click events for lightbox (future enhancement)
        this.initializePhotoClicks();
        
        // Show initial photos
        this.filterPhotos(this.currentFilter);
    }

    handleFilterChange(filter) {
        this.currentFilter = filter;
        
        // Update active button
        this.filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === filter) {
                btn.classList.add('active');
            }
        });

        // Filter photos
        this.filterPhotos(filter);
        
        // Reset photo count for new filter
        this.currentPhotoCount = this.photosPerLoad;
        this.updateLoadMoreButton();
    }

    filterPhotos(filter) {
        const photos = document.querySelectorAll('.photo-item');
        let visibleCount = 0;

        photos.forEach((photo, index) => {
            const category = photo.dataset.category;
            const shouldShow = filter === 'all' || category === filter;
            
            if (shouldShow && visibleCount < this.currentPhotoCount) {
                photo.style.display = 'block';
                // Add animation delay for better visual effect
                photo.style.animationDelay = `${(visibleCount % 4) * 0.1}s`;
                visibleCount++;
            } else {
                photo.style.display = 'none';
            }
        });

        // Update load more button visibility
        this.updateLoadMoreButton();
    }

    loadMorePhotos() {
        this.currentPhotoCount += this.photosPerLoad;
        this.filterPhotos(this.currentFilter);
    }

    updateLoadMoreButton() {
        if (!this.loadMoreBtn) return;

        const photos = document.querySelectorAll('.photo-item');
        const filteredPhotos = Array.from(photos).filter(photo => {
            const category = photo.dataset.category;
            return this.currentFilter === 'all' || category === this.currentFilter;
        });

        // Hide load more button if all photos are shown
        if (this.currentPhotoCount >= filteredPhotos.length) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'block';
        }
    }

    initializePhotoClicks() {
        const photos = document.querySelectorAll('.photo-item');
        photos.forEach(photo => {
            photo.addEventListener('click', () => {
                // Future enhancement: open lightbox
                this.openPhotoModal(photo);
            });
        });
    }

    openPhotoModal(photoElement) {
        // Future enhancement: create a modal/lightbox for photo viewing
        const img = photoElement.querySelector('img');
        const info = photoElement.querySelector('.photo-info');
        
        console.log('Photo clicked:', {
            src: img.src,
            alt: img.alt,
            title: info?.querySelector('h4')?.textContent,
            description: info?.querySelector('p')?.textContent
        });
        
        // For now, just open image in new tab
        window.open(img.src, '_blank');
    }

    // Method to add new photos dynamically (for future admin functionality)
    addPhoto(photoData) {
        const photoHTML = `
            <div class="photo-item" data-category="${photoData.category}">
                <img src="${photoData.src}" alt="${photoData.alt}" loading="lazy">
                <div class="photo-overlay">
                    <div class="photo-info">
                        <h4>${photoData.title}</h4>
                        <p>${photoData.description}</p>
                    </div>
                </div>
            </div>
        `;
        
        this.photoGrid.insertAdjacentHTML('beforeend', photoHTML);
        
        // Re-initialize click events for new photo
        const newPhoto = this.photoGrid.lastElementChild;
        newPhoto.addEventListener('click', () => {
            this.openPhotoModal(newPhoto);
        });
        
        // Refresh the current filter
        this.filterPhotos(this.currentFilter);
    }

    // Method to get gallery statistics
    getGalleryStats() {
        const photos = document.querySelectorAll('.photo-item');
        const categories = {};
        
        photos.forEach(photo => {
            const category = photo.dataset.category;
            categories[category] = (categories[category] || 0) + 1;
        });

        return {
            totalPhotos: photos.length,
            categories: categories,
            currentFilter: this.currentFilter,
            visiblePhotos: document.querySelectorAll('.photo-item[style*="block"]').length
        };
    }
}

// Placeholder image handler for missing gallery images
class PlaceholderImageManager {
    constructor() {
        this.initializePlaceholders();
    }

    initializePlaceholders() {
        const images = document.querySelectorAll('.photo-item img, .recent-photo img');
        
        images.forEach(img => {
            img.addEventListener('error', () => {
                this.createPlaceholder(img);
            });
        });
    }

    createPlaceholder(img) {
        // Create a placeholder canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 400;
        canvas.height = 300;

        // Draw placeholder background
        ctx.fillStyle = '#f0f0f0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw placeholder icon/text
        ctx.fillStyle = '#999';
        ctx.font = '20px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('📷', canvas.width / 2, canvas.height / 2 - 20);
        ctx.fillText('Photo Coming Soon', canvas.width / 2, canvas.height / 2 + 10);

        // Replace image src with placeholder
        img.src = canvas.toDataURL();
        img.style.opacity = '0.7';
    }
}

// Initialize gallery functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize gallery on gallery page
    if (document.getElementById('photo-gallery')) {
        window.galleryManager = new GalleryManager();
        window.placeholderManager = new PlaceholderImageManager();
        
        console.log('Gallery initialized');
    }
});

// Export for potential future module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GalleryManager, PlaceholderImageManager };
}