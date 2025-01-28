// script.js
class ImageGallery {
    constructor() {
        this.images = [];
        this.currentIndex = 0;
        
        // DOM Elements
        this.gallery = document.getElementById('imageGallery');
        this.modal = document.getElementById('imageModal');
        this.modalImg = document.getElementById('modalImg');
        
        // Load images from directory
        this.loadImagesFromDirectory();
        this.initializeEventListeners();
    }

    async loadImagesFromDirectory() {
        try {
            // List of image names in your images folder
            const imageNames = [
                'thor1.jpg',
                'thor2.jpg',
                'thor4.jpg',
                'thor5.jpg',
                'thor6.jpg',
                'space1.jpg',
                'space2.jpg',
                'space3.jpg',
                
                'nature1.jpg',
                'nature2.jpg',
                'nature3.jpg',
                'nature4.jpg',
                'nature5.jpg'
                // Add more image names as needed
            ];

            imageNames.forEach(imageName => {
                const imageUrl = `images/${imageName}`;
                this.images.push(imageUrl);
                this.addImageToGallery(imageUrl);
            });
        } catch (error) {
            console.error('Error loading images:', error);
        }
    }

    initializeEventListeners() {
        // Modal navigation
        document.querySelector('.close-btn').addEventListener('click', () => this.closeModal());
        document.querySelector('.prev-btn').addEventListener('click', () => this.navigateImage(-1));
        document.querySelector('.next-btn').addEventListener('click', () => this.navigateImage(1));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                if (e.key === 'ArrowLeft') this.navigateImage(-1);
                if (e.key === 'ArrowRight') this.navigateImage(1);
                if (e.key === 'Escape') this.closeModal();
            }
        });
    }

    addImageToGallery(imageUrl) {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = 'Gallery Image';
        
        // Add loading animation
        img.onload = () => {
            imageContainer.classList.add('loaded');
        };
        
        imageContainer.appendChild(img);
        this.gallery.appendChild(imageContainer);
        
        // Add click event to open modal
        imageContainer.addEventListener('click', () => {
            this.openModal(this.images.indexOf(imageUrl));
        });
    }

    openModal(index) {
        this.currentIndex = index;
        this.modalImg.src = this.images[index];
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    navigateImage(direction) {
        this.currentIndex = (this.currentIndex + direction + this.images.length) % this.images.length;
        this.modalImg.src = this.images[this.currentIndex];
    }
}

// Initialize the gallery when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageGallery();
});