// State Management
const state = {
    currentPage: 'home',
    currentProperty: null,
    filters: {
        type: 'all',
        minPrice: 0,
        maxPrice: 1000000000,
        beds: 'any',
        features: new Set()
    }
};

// Gallery state
let currentImageIndex = 0;

// Navigation function
function navigate(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.style.display = 'block';
        state.currentPage = pageName;
        
        if (pageName === 'properties') {
            renderProperties();
        }
    }

    // Update navigation links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageName);
    });
}

// Gallery Functions
function getGalleryHTML(property) {
    if (!property.images || property.images.length === 0) {
        return '<div class="no-images">No images available</div>';
    }

    return `
        <div class="main-image-container">
            <img id="mainImage" src="${property.images[0]}" alt="${property.name}" />
            ${property.images.length > 1 ? `
                <button class="gallery-nav prev" onclick="changeImage(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="gallery-nav next" onclick="changeImage(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            ` : ''}
        </div>
        ${property.images.length > 1 ? `
            <div class="gallery-thumbnails">
                ${property.images.map((img, index) => `
                    <div class="thumbnail ${index === 0 ? 'active' : ''}" 
                        onclick="selectImage(${index})"
                        style="background-image: url('${img}')">
                    </div>
                `).join('')}
            </div>
        ` : ''}
    `;
}

function changeImage(direction) {
    if (!state.currentProperty || !state.currentProperty.images) return;
    
    currentImageIndex = (currentImageIndex + direction + state.currentProperty.images.length) % state.currentProperty.images.length;
    
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = state.currentProperty.images[currentImageIndex];
        
        // Update thumbnails
        document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }
}

function selectImage(index) {
    if (!state.currentProperty || !state.currentProperty.images) return;
    
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = state.currentProperty.images[currentImageIndex];
        
        // Update thumbnails
        document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
            thumb.classList.toggle('active', i === currentImageIndex);
        });
    }
}


// Property Detail View
function showPropertyDetail(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) {
        console.error('Property not found:', propertyId);
        return;
    }

    state.currentProperty = property;
    currentImageIndex = 0;

    const detailContent = document.getElementById('property-detail-content');
    if (!detailContent) {
        console.error('Detail content element not found');
        return;
    }

    detailContent.innerHTML = `
        <div class="property-detail-header">
            <h1>${property.name}</h1>
            <p class="property-detail-price">$${property.price.toLocaleString()}</p>
            <p class="property-detail-address">${property.address}</p>
        </div>

        <div class="property-detail-images">
            ${getGalleryHTML(property)}
        </div>

        <div class="property-detail-info">
            <div class="property-detail-description">
                <h2>Description</h2>
                <p>${property.description}</p>
                
                <div class="property-detail-tags">
                    ${property.tags.map(tag => `
                        <span class="property-detail-tag">${tag}</span>
                    `).join('')}
                </div>
            </div>

            <div class="property-detail-features">
                <h2>Property Details</h2>
                <ul class="feature-list">
                    <li><i class="fas fa-bed"></i> ${property.beds} Bedrooms</li>
                    <li><i class="fas fa-bath"></i> ${property.baths} Bathrooms</li>
                    <li><i class="fas fa-ruler-combined"></i> ${property.sqft.toLocaleString()} sq ft</li>
                    ${property.features.map(feature => `
                        <li><i class="fas fa-check"></i> ${feature}</li>
                    `).join('')}
                </ul>
            </div>
        </div>

        <div class="fullscreen-gallery" id="fullscreenGallery">
            <button class="fullscreen-close" onclick="closeFullscreen()">
                <i class="fas fa-times"></i>
            </button>
            <div class="fullscreen-main">
                <img src="${property.images[0]}" alt="${property.name}" id="fullscreenImage">
                <button class="fullscreen-nav fullscreen-prev" onclick="changeFullscreenImage(-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="fullscreen-nav fullscreen-next" onclick="changeFullscreenImage(1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
            <div class="fullscreen-thumbnails">
                ${property.images.map((img, index) => `
                    <div class="fullscreen-thumbnail ${index === 0 ? 'active' : ''}"
                        onclick="selectFullscreenImage(${index})"
                        style="background-image: url('${img}')">
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add click handlers
    updateGalleryClickHandlers();

    navigate('property-detail');
}


// Add these functions to handle fullscreen gallery
function openFullscreen() {
    const property = state.currentProperty;
    if (!property || !property.images) return;

    const gallery = document.getElementById('fullscreenGallery');
    if (gallery) {
        gallery.classList.add('active');
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        // Set current image
        selectFullscreenImage(currentImageIndex);
    }
}

function closeFullscreen() {
    const gallery = document.getElementById('fullscreenGallery');
    if (gallery) {
        gallery.classList.remove('active');
        // Restore body scroll
        document.body.style.overflow = '';
    }
}

function changeFullscreenImage(direction) {
    const property = state.currentProperty;
    if (!property || !property.images) return;

    currentImageIndex = (currentImageIndex + direction + property.images.length) % property.images.length;
    selectFullscreenImage(currentImageIndex);
}

function selectFullscreenImage(index) {
    const property = state.currentProperty;
    if (!property || !property.images || index >= property.images.length) return;

    currentImageIndex = index;
    
    // Update fullscreen image
    const fullscreenImage = document.getElementById('fullscreenImage');
    if (fullscreenImage) {
        fullscreenImage.src = property.images[index];
    }
    
    // Update thumbnails
    const thumbnails = document.querySelectorAll('.fullscreen-thumbnail');
    thumbnails.forEach((thumb, i) => {
        thumb.classList.toggle('active', i === index);
    });
}

// Update the gallery thumbnail click handlers in showPropertyDetail
function updateGalleryClickHandlers() {
    // Add click handler to main image to open fullscreen
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.style.cursor = 'pointer';
        mainImage.addEventListener('click', openFullscreen);
    }

    // Add click handlers to thumbnails
    document.querySelectorAll('.thumbnail').forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            selectImage(index);
        });
    });
}

// Add keyboard navigation for fullscreen mode
document.addEventListener('keydown', (e) => {
    const gallery = document.getElementById('fullscreenGallery');
    if (gallery && gallery.classList.contains('active')) {
        if (e.key === 'Escape') closeFullscreen();
        if (e.key === 'ArrowLeft') changeFullscreenImage(-1);
        if (e.key === 'ArrowRight') changeFullscreenImage(1);
    }
});

// Make functions globally available
window.openFullscreen = openFullscreen;
window.closeFullscreen = closeFullscreen;
window.changeFullscreenImage = changeFullscreenImage;
window.selectFullscreenImage = selectFullscreenImage;



// Property Card Creation
function createPropertyCard(property) {
    const card = document.createElement('article');
    card.className = 'property-card';
    
    card.innerHTML = `
        <div class="property-card-image" style="background-image: url('${property.images[0]}')"></div>
        <div class="property-card-content">
            <h2>${property.name}</h2>
            <p class="price">$${property.price.toLocaleString()}</p>
            <p class="address">${property.address}</p>
            <div class="property-details">
                <span><i class="fas fa-bed"></i> ${property.beds} Beds</span>
                <span><i class="fas fa-bath"></i> ${property.baths} Baths</span>
                <span><i class="fas fa-ruler-combined"></i> ${property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div class="property-features">
                ${property.features.slice(0, 3).map(feature => 
                    `<span><i class="fas fa-check"></i> ${feature}</span>`
                ).join('')}
            </div>
            <div class="property-tags">
                ${property.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        console.log('Card clicked for property:', property.id);
        showPropertyDetail(property.id);
    });
    
    return card;
}

// Filter Properties
function filterProperties() {
    if (!Array.isArray(properties)) return [];
    
    return properties.filter(property => {
        if (state.filters.type !== 'all' && property.type !== state.filters.type) return false;
        if (property.price < state.filters.minPrice || property.price > state.filters.maxPrice) return false;
        if (state.filters.beds !== 'any' && property.beds < parseInt(state.filters.beds)) return false;
        if (state.filters.features.size > 0) {
            return Array.from(state.filters.features)
                .every(feature => property.features.includes(feature));
        }
        return true;
    });
}

// Render Properties
function renderProperties() {
    const propertiesGrid = document.getElementById('properties-grid');
    if (!propertiesGrid) {
        console.error('Properties grid element not found');
        return;
    }

    propertiesGrid.innerHTML = '';
    const filteredProperties = filterProperties();
    
    filteredProperties.forEach(property => {
        const card = createPropertyCard(property);
        propertiesGrid.appendChild(card);
    });
}

// Event Listeners
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigate(e.target.dataset.page);
        });
    });

    // Property Type Filters
    document.querySelectorAll('#typeFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#typeFilters .filter-btn')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filters.type = btn.dataset.filter;
            renderProperties();
        });
    });

    // Feature Filters
    document.querySelectorAll('.checkbox-filters input').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                state.filters.features.add(checkbox.value);
            } else {
                state.filters.features.delete(checkbox.value);
            }
            renderProperties();
        });
    });

    // Bedroom Filters
    document.querySelectorAll('#bedFilters .filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#bedFilters .filter-btn')
                .forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.filters.beds = btn.dataset.beds;
            renderProperties();
        });
    });
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    // Make functions globally available
    window.showPropertyDetail = showPropertyDetail;
    window.changeImage = changeImage;
    window.selectImage = selectImage;
    window.navigate = navigate;
    
    initializeEventListeners();
    navigate('home');
});

// Scroll animation observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add observer to elements when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Observe sections
    document.querySelectorAll('.about-section').forEach(section => {
        observer.observe(section);
    });
    
    // Observe expertise items
    document.querySelectorAll('.expertise-item').forEach(item => {
        observer.observe(item);
    });
});

// Add these functions to your app.js
function showApplicationForm(jobTitle) {
    const modal = document.getElementById('application-modal');
    const jobTitleSpan = document.getElementById('job-title');
    
    jobTitleSpan.textContent = jobTitle;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeApplicationForm() {
    const modal = document.getElementById('application-modal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function submitApplication(event) {
    event.preventDefault();
    // Add your form submission logic here
    alert('Application submitted successfully!');
    closeApplicationForm();
}

// Add event listeners
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeApplicationForm);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('application-modal');
        if (e.target === modal) {
            closeApplicationForm();
        }
    });
});