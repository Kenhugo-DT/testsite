

// Property Database
const properties = [

    {
        id: 1,
        type: 'Luxurious Cabin',
        name: 'Serenity Retreat',
        price: 1950000,
        address: '420 Tranquil Lane, Peaceful Island, State, ZIP',
        description: 'Experience unparalleled luxury in this stunning cabin located on a private island.  Featuring breathtaking views from a grand gable window and beautifully designed living spaces, this retreat offers an inviting atmosphere perfect for relaxation and entertainment. The cabin boasts a spacious lounge area with a rustic stone fireplace, a grand piano, and a large, elegant sofa. Enjoy cozy evenings by the fire or unwind in the sophisticated wine cellar. The cabin is surrounded by lush forest and serene lake views, making it an idyllic getaway.',
        beds: 4,
        baths: 3.5,
        sqft: 3.200,
        // Add array of images for gallery
        images: [
            '/testsite/images/hus1/fasadehus1.png',  // Main image
            'images/hus1/stuehus1.png',   // Living room
            '/images/hus1/kitchenhus1.png',   // Kitchen
            '/images/hus1/soveromhus1.png',   // Master bedroom
            '/images/hus1/badhus1.png',   // Bathroom
            '/images/hus1/barneromhus1.png',   // Pool
            '/images/hus1/loftstuehus1.png',   // Garden
            '/images/hus1/vinkjellerhus1.png'    // View
        ],
        features: ['waterfront', 'garden', 'views', 'fireplace', 'dock'],
        tags: ['Featured', 'Luxury']
    },

    {
        id: 2,
        type: 'Luxurious 1970s Miami Villa',
        name: 'Casa Tropicana',
        price: 14500000,
        address: '223 Ocean Drive, Star Island, Miami, FL',
        description: 'Discover the epitome of Miami’s 1970s luxury with Casa Tropicana, an opulent villa located on the prestigious Star Island. This sprawling estate blends sophisticated retro design with modern amenities. Enter into grand open spaces with floor-to-ceiling windows that offer stunning views of lush tropical gardens and a private pool. Designed for both relaxation and entertainment, Casa Tropicana features a home theater, game room with a vintage bar and pool table, and a cozy man-cave ambiance. The large, plush bedrooms exude elegance, complete with king-size beds and a walk-in closet, while the home office adds a touch of intrigue with a gun safe, secure vaults, and classic Miami sophistication.',
        beds: 6,
        baths: 7,
        sqft: 8.200,
        images: [
            '..testsite/main/public/images/hus2/hus2fasade.png',  // Main image
            '../testsite/main/public/images/hus2/hus2stue.png',   // Living room
            'blob/main/public/images/hus2/hus2kitchen.png',   // Master bedroom
            '.blob/main/public/images/hus2/hus2bad.png',    // View
            '..blob/main/public/images/hus2/hus2sov.png',   // Bathroom
            '../blob/main/public/images/hus2/hus2cinema.png',   // Pool
            '../public/images/hus2/hus2gjesterom.png',   // Kitchen
            '../public/images/hus2/hus2closet.png',   // Garden
        ],

        features: ['gym', 'garage', 'home teather', 'pool', 'bar', 'spacious'],
        tags: ['Luxury']
    },

    {
        id: 3,
        type: 'Luxury Tyrolean-style Chalet with Modern Functionalist Design',
        name: 'Alpine Haven Retreat',
        price: '3,200,000',
        address: '6234 Mountain View Road, Tyrol Village, Colorado',
        description: 'Nestled amidst scenic mountain views, this stunning two-story Tyrolean-style chalet blends rustic Alpine charm with modern minimalist design. The house features exposed wooden beams, large windows offering abundant natural light, and cozy yet elegant living spaces. Inside, you’ll find a spacious living room with a fireplace, an inviting dining area, a gourmet kitchen, and luxurious bedrooms, including a children’s room and a guest suite. The outdoor space is beautifully landscaped, with a patio, BBQ area, and a spacious veranda. Perfect for families or as a tranquil retreat, this home combines traditional warmth with contemporary elegance.',
        beds: 4,
        baths: 3.5,
        sqft: 3.500,
        images: [
            '../public/images/hus3/hus3fasade.png',
            '../public/images/hus3/hus3stue.png',
            '../public/images/hus3/hus3kitchen.png',
            '../public/images/hus3/hus3spistestue.png',
            '../public/images/hus3/hus3sov.png',
            '../public/images/hus3/hus3barnerom.png',
            '../public/images/hus3/hus3bad.png',
            '../public/images/hus3/hus3toalett.png',
        ],
        features: ['pool', 'garden', 'garage'],
        tags: ['Family']
    },

    {
        id: 4,
        type: 'Alpine-Style Chalet',
        name: 'Mountainview Lodge',
        price: 1850000,
        address: '734 Alpine Road, Snowy Peaks, Colorado',
        description: 'Nestled in a scenic winter wonderland, Mountainview Lodge is a luxurious yet cozy retreat that combines the rustic charm of Polish Zakopane and Tyrolean style. This alpine chalet features intricate wood carvings, exposed timber beams, and large windows that frame breathtaking views of snow-covered mountains. Inside, you’ll find a spacious living area with a stone fireplace, a gourmet kitchen with custom cabinetry, a cozy attic lounge perfect for movie nights, and a charming childrens room. With added amenities like a home library, a hobby room, and a private sauna, this home is designed for relaxation and creativity.',
        beds: 4,
        baths: 3,
        sqft: 3.500,
        images: [
            '../public/images/hus4/hus4fasade.png',  // Main image
            '../public/images/hus4/hus4stue.png', 
            '../public/images/hus4/hus4spisestue.png', 
            '../public/images/hus4/hus4loftstue.png', 
            '../public/images/hus4/hus4kjellerstue.png', 
            '../public/images/hus4/hus4hobby.png', 
            '../public/images/hus4/hus4soverom.png', 
            '../public/images/hus4/hus4soverom2.png', 
            '../public/images/hus4/hus4barnerom.png', 
            '../public/images/hus4/hus4bad.png', 
            '../public/images/hus4/hus4bad2.png', 
            '../public/images/hus4/hus4library.png', 

        ],
        features: ['library', 'sauna', 'mountain view', 'library', 'fireplace',],
        tags: ['Family']
    },

    {
        id: 5,
        type: 'Modern Log House',
        name: 'The Woodlands Retreat',
        price: 2150000,
        address: '383 Forest Lane, Timber Lake, OR, USA',
        description: 'Discover this unique blend of contemporary style and rustic Norwegian charm. Nestled within serene woodlands, this luxury log house offers an unparalleled retreat with spacious rooms, high-end amenities, and captivating views of the surrounding forest. Designed for relaxation and entertainment, the property includes a custom-built music studio, a cozy guest suite, a stylish bar lounge, and a large garage with ample storage space. Each room combines modern elegance with rustic charm, creating a warm and sophisticated atmosphere throughout.',
        beds: 5,
        baths: 4,
        sqft: 4.800,
        images: [
            '../public/images/hus5/hus5fasade.png',  
            '../public/images/hus5/hus5stue.png',    // View
            '../public/images/hus5/hus5kitchen.png',    // View
            '../public/images/hus5/hus5bar.png',    // View
            '../public/images/hus5/hus5soverom.png',    // View
            '../public/images/hus5/hus5gjestrom.png',    // View
            '../public/images/hus5/hus5bad.png',    // View
            '../public/images/hus5/hus5gjesterom.png',    // View
            '../public/images/hus5/hus5barnerom.png',    // View
            '../public/images/hus5/hus5studio.png',    // View
            '../public/images/hus5/hus5garage.png',    // View
        ],
        features: ['fireplace', 'garage', 'garden', 'view', 'spacious'],
        tags: ['Luxury', 'Featured']
    },

    {
        id: 6,
        type: 'apartment',
        name: 'Super 4-room in wonderful Ladegårdsgaten',
        price: 407723,
        address: 'Ladegårdsgaten 48, 5033 Bergen',
        description: 'Ladegårdsgaten 48 is located in attractive Sandviken. The residential area is popular with its central location and well-established area. You wouldnt think you were only a 10-minute walk away from Bryggen when the surroundings are calm and peaceful. When you walk in the direction of the city centre, you move through cozy streets, local cafes, dense wooden buildings and a small piece of Bergens residential history. Sandviken is a unique area. Here you get proximity to the city centre, but also a tranquility that you cannot find in the city centre.',
        beds: 3,
        baths: 1,
        sqft: 667,
        images: [
            '../public/images/hus6/hus6fasade.png',
            '../public/images/hus6/hus6fasade2.png',    // View
            '../public/images/hus6/hus6stue.png',    // View
            '../public/images/hus6/hus6kitchen.png',    // View
            '../public/images/hus6/hus6kitchen2.png',    // View
            '../public/images/hus6/hus6soverom.png',    // View
            '../public/images/hus6/hus6bad.png',    // View
            '../public/images/hus6/hus6bad2.png',    // View
                // View
        ],
        features: ['modern', 'chill area', 'cool neighbours'],
        tags: ['Featured', ]
    },

    {
        id: 7,
        type: 'shed',
        name: 'you cant spell PARTYSVENSKE without PARTYSVENSKE',
        price: 150,
        address: 'Hardangervegen 482, 5709 Voss',
        description: 'Tucked away in the serene western woods of Norway, this rustic 1930s home offers a unique blend of old-world charm and secluded rural beauty. Surrounded by towering pines and lush greenery, its an ideal getaway for nature lovers seeking quietude and privacy. With classic wood-beamed ceilings, original hardwood floors, and cozy fireplaces, the house embodies the timeless charm of Norwegian forest retreats. However, this home does come with one, lets say, spirited twist—a resident "partysvenske" - a hard-to-evict party-loving Swede! - who has proven as much a fixture as the vintage light fixtures themselves. While youll enjoy the stillness of the woods, be prepared for the occasional midnight techno session or an enthusiastic Swedish sing-along echoing through the halls',
        beds: 'wherever you see fit',
        baths: 'every bit of floor',
        sqft: 666,
        images: [
            '../public/images/hus7/hus7front.png',  // Main image
            '../public/images/hus7/hus7rear.png',   // Living room
            '../public/images/hus7/hus7side.png',   // Kitchen
            '../public/images/hus7/hus7partysvenske.png',   // Master bedroom   
        ],
        features: ['garden'],
        tags: ['Featured', 'Luxury']
    },
];


// Update any property that has a single image to use an images array
properties.forEach(property => {
    // Convert any string numbers to actual numbers
    if (typeof property.price === 'string') {
        property.price = Number(property.price.replace(/[,\$]/g, ''));
    }
    if (typeof property.beds === 'string' && !isNaN(property.beds)) {
        property.beds = Number(property.beds);
    }
    if (typeof property.baths === 'string' && !isNaN(property.baths)) {
        property.baths = Number(property.baths);
    }
    if (typeof property.sqft === 'string') {
        property.sqft = Number(property.sqft.replace(/,/g, ''));
    }

    // Validate image paths
    if (!Array.isArray(property.images)) {
        property.images = property.images ? [property.images] : ['/api/placeholder/800/600'];
    }
});


