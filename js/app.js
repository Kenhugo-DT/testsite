// State Management
const state = {
    currentPage: 'home',
    currentProperty: 0,
    filters: {
        type: 'all',
        minPrice: 0,
        maxPrice: 100000000,
        beds: 'any',
        features: new Set()
    }
};

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

// Property Detail View
function showPropertyDetail(propertyId) {
    console.log('Showing property detail for ID:', propertyId);
    
    // Ensure properties exists and is an array
    if (!Array.isArray(properties)) {
        console.error('Properties array is not available');
        return;
    }

    // Find the property and log for debugging
    const property = properties.find(p => p.id === propertyId);
    console.log('Found property:', property);

    if (!property) {
        console.error('Property not found:', propertyId);
        return;
    }

    // Check if images array exists
    if (!Array.isArray(property.images)) {
        console.error('Property images not found:', property);
        property.images = ['/api/placeholder/800/600']; // Fallback image
    }

    const detailContent = document.getElementById('property-detail-content');
    if (!detailContent) {
        console.error('Detail content element not found');
        return;
    }

    try {
        detailContent.innerHTML = `
            <div class="property-detail-header">
                <h1>${property.name}</h1>
                <p class="property-detail-price">$${typeof property.price === 'number' ? property.price.toLocaleString() : property.price}</p>
                <p class="property-detail-address">${property.address}</p>
            </div>

            <div class="property-detail-images">
                <div class="gallery-main">
                    <img src="${property.images[0]}" alt="${property.name}" id="mainImage">
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
        `;

        // Reset current image index
        currentImageIndex = 0;
        
        // Navigate to detail page
        navigate('property-detail');
        
    } catch (error) {
        console.error('Error rendering property detail:', error);
    }
}

// Gallery Functions
let currentImageIndex = 0;

function changeImage(direction) {
    const property = state.currentProperty;
    if (!property || !property.images) return;
    
    currentImageIndex = (currentImageIndex + direction + property.images.length) % property.images.length;
    updateGallery();
}

function selectImage(index) {
    currentImageIndex = index;
    updateGallery();
}

function updateGallery() {
    const property = state.currentProperty;
    if (!property || !property.images) return;

    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (mainImage) {
        mainImage.src = property.images[currentImageIndex];
    }
    
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Property Card Creation
function createPropertyCard(property) {
    const card = document.createElement('article');
    card.className = 'property-card';
    
    card.innerHTML = `
        <h2>${property.name}</h2>
        <p class="price">$${typeof property.price === 'number' ? property.price.toLocaleString() : property.price}</p>
        <p class="address">${property.address}</p>
        <div class="property-details">
            <span><i class="fas fa-bed"></i> ${property.beds} Beds</span>
            <span><i class="fas fa-bath"></i> ${property.baths} Baths</span>
            <span><i class="fas fa-ruler-combined"></i> ${property.sqft.toLocaleString()} sq ft</span>
        </div>
        <div class="property-features">
            ${property.features.map(feature => 
                `<span><i class="fas fa-check"></i> ${feature}</span>`
            ).join('')}
        </div>
        <div class="property-tags">
            ${property.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
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

// Update the render function
function renderProperties() {
    const propertiesGrid = document.getElementById('properties-grid');
    if (!propertiesGrid) return;

    propertiesGrid.innerHTML = '';
    
    const filteredProperties = filterProperties();
    filteredProperties.forEach(property => {
        const card = createPropertyCard(property);
        propertiesGrid.appendChild(card);
    });

    // Create and append property cards
    properties.forEach(property => {
        const propertyCard = document.createElement('article');
        propertyCard.classList.add('property-card');
        
        propertyCard.innerHTML = `
            <h2>${property.name}</h2>
            <p class="price">$${property.price.toLocaleString()}</p>
            <p class="address">${property.address}</p>
            <div class="property-details">
                <span><i class="fas fa-bed"></i> ${property.beds} Beds</span>
                <span><i class="fas fa-bath"></i> ${property.baths} Baths</span>
                <span><i class="fas fa-ruler-combined"></i> ${property.sqft.toLocaleString()} sq ft</span>
            </div>
            <div class="property-features">
                ${property.features.map(feature => 
                    `<span><i class="fas fa-check"></i> ${feature}</span>`
                ).join('')}
            </div>
            <div class="property-tags">
                ${property.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        `;

        // Add click event listener to the card
        propertyCard.addEventListener('click', () => {
            console.log('Property clicked:', property.id);
            showPropertyDetail(property.id);
        });

        propertiesGrid.appendChild(propertyCard);
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
}

// Make functions globally available
window.showPropertyDetail = showPropertyDetail;
window.changeImage = changeImage;
window.selectImage = selectImage;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    navigate('home');
});