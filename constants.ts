

import { PromptComponent, PlacementRule } from './types';
import promptComponentData from './promptComponentData.generated';

const newData = {
  "Architecture": {
    "subcomponents": [
      "American Colonial", "American Foursquare", "American-Craftsman", "Ancient Egyptian", "Ancient Greek", "Anglo-Saxon", "Arcology", "Armenian", "Austrian Baroque", "Bagan", "Balinese", "Benin", "Blobtecture", "Bristol Byzantine", "Brownstone", "Brutalist", "Buddhist", "Byzantine", "Carolingian", "Carpenter Gothic", "Churrigueresque", "Colonial Georgian", "Constructivist", "Czech Baroque", "Danish Baroque", "Deconstructivism", "Dravidian Temple", "Dutch Baroque", "Dutch Colonial", "Dzong", "English Baroque", "Farmhouse", "Federal", "Federation Queen-Anne", "Finnish Baroque", "French Baroque", "French Colonial", "German Baroque", "Googie", "Gurudwara", "Heliopolis", "Incan", "International Style", "Inter-War Californian Bungalow", "Inter-War Spanish Mission", "Inter-War Streamline Moderne", "Italian Baroque", "Italianate", "Jacobean", "Japanese", "Jeffersonian", "Jugendstil", "Kashmir", "Khmer", "Lithuanian Baroque", "Mali", "Maratha", "Mayan", "Mediterranean", "Mediterranean Revival", "Merovingian", "Metabolism", "Minoan", "Modern", "Mughal", "Murcutt Drew", "National Park Service Rustic", "Norwegian Baroque", "Organic", "Palladian", "Ponce Creole", "Portuguese Baroque", "Pueblo", "Rajput", "Ranch", "Regency", "Richardsonian Romanesque", "Romanesque", "Romanesque Revival", "Russian", "Russian Baroque", "Russian Revival", "Saltbox", "Scots Baronial", "Second Empire", "Sikh", "Soft Portuguese", "Southern Plantation", "Spanish Baroque", "Spanish Colonial", "Stave Church", "Storybook", "Streamline Moderne", "Structuralism", "Sultanate", "Sustainable", "Swedish Baroque", "Swiss Chalet", "Taishō", "Tang", "Thai", "Tibetan", "Timber and Fibro Fisherman's Cottage", "Tiwanaku", "Tudor", "Tudorbethan", "Ukrainian Baroque", "Usonian", "Vesara Temple", "Victorian Free Gothic", "Victorian Italianate", "Victorian Second Empire"
    ]
  },
  "Art Mediums": {
    "subcomponents": [
      "3D Glue Model", "3D Print Model", "Acrylic Painting", "Airbrush", "Assemblage", "Ballpoint Pen Drawing", "Bismuth Sculpture", "Bronze Sculpture", "Cardboard Cutout", "Carving", "Casein Painting", "Cave Painting", "Ceramic", "Chalk", "Charcoal Sketch", "Claymation", "Collage", "Colored Pencil", "Crayon", "Cross Stitch", "Cut Paper Illustration", "Digital Art", "Encaustic Painting", "Epoxy Resin Art", "Etching", "Fabric Art", "Fresco", "Gel Pen Drawing", "Gold Leaf", "Gouache Painting", "Graffiti", "Graphite Drawing", "Grease Pencil", "Impasto Painting", "Ink Wash Painting", "Kirigami", "Layered Paper", "Leaded Glass", "Lego Bricks", "Linocut", "Lithography", "Marble Carving", "Matte Painting", "Metalwork", "Mural", "Needlepoint", "Newspaper Collage", "Nok Sculpture", "Oil on Canvas", "Oil Painting", "Origami", "Paper Quilling", "Pastels", "Pencil Sketch", "Petroglyph", "Pixel Art", "Playdough", "Plique-à-jour Enameling", "Porcelain", "Rangoli", "Risograph Print", "Rock Art", "Sand Art", "Scratchboard", "Sculpture", "Spun Sugar Art", "Spray Paint Art", "Stained Glass", "Stucco", "Tā moko Tattoo", "Technical Drawing", "Tempera Painting", "Terracotta", "Tibetan Thangka Painting", "Tissue Paper Collage", "Vector Art", "Vitreous Enamel", "Watercolor Painting", "Wax Casting", "Weaving", "Wet Plate Collodion", "Whakairo Carving", "Wood Carving", "Woodblock Print", "Woodcut", "Yarn Art", "Zardozi Embroidery"
    ]
  },
  "Art Movements": {
    "subcomponents": [
      "Abstract Art", "Abstract Expressionism", "Art Deco", "Art Nouveau", "Baroque", "Bauhaus", "Byzantine", "Classicism", "Conceptual Art", "Constructivism", "Crystal Cubism", "Cubism", "Cubo-Futurism", "Dadaism", "De Stijl", "Deconstructivism", "Divisionism", "Expressionism", "Fauvism", "Folk Art", "Futurism", "Geometric Abstraction", "Gothic", "Grisaille", "Harlem Renaissance", "Impressionism", "Industrial Art", "Installation Art", "Insular Illumination", "Les Nabis", "Lyrical Abstraction", "Mannerism", "Massurrealism", "Metaphysical Painting", "Minimalism", "Modernism", "Mongol Zurag", "Naïve Art", "Neoclassicism", "Neo-Expressionism", "Op Art", "Orphism", "Pointillism", "Pop Art", "Post-Impressionism", "Precisionism", "Pre-Raphaelite Brotherhood", "Primitivism", "Qajar", "Rayonism", "Realism", "Regionalism", "Renaissance", "Retablo", "Rococo", "Romanesque", "Shin-hanga", "Suprematism", "Surrealism", "Symbolism", "Synchromism", "Synthetism", "Tachisme", "Ukiyo-e", "Verdaille", "Vorticism"
    ]
  },
  "Artists": {
    "subcomponents": [
      "Achille Lauge", "Aimee Rolin Hoover", "Albert Bierstadt", "Albrecht Dürer", "Alex Senna", "Alfred Jacob Miller", "Alison Kinnaird", "Alma Thomas", "Alphonse Mucha", "Ando Hiroshige", "Andrew Wyeth", "Andy Warhol", "Ansel Adams", "Anselm Kiefer", "Araceli Gilbert", "Archibald Thorburn", "Artgerm", "Arthur Rackham", "Ashley Wood", "Atey Ghailan", "Auguste Rodin", "Banksy", "Bartolomé Esteban Murillo", "Basil Gogos", "Ben Templesmith", "Bernard Wrightson", "Boris Mikhaylovich Kustodiev", "Brian Froud", "Bruce Onobrakpeya", "Carl Larsson", "Caspar David Friedrich", "Charles Le Brun", "Charles Marion Russell", "Chesley Bonestell", "Claude Monet", "Daido Moriyama", "Dale Chihuly", "Dave McKean", "E.H. Shepard", "Eanger Irving Couse", "Edgar Degas", "Edvard Munch", "Edward Ardizzone", "Eleonor Abbot", "Elizabeth Adela Stanhope Forbes", "Emil Nolde", "Emily Carr", "Eric Carle", "Ezra Tucker", "Filfury", "Francisco De Zurbarán", "François Schuiten", "Franz Marc", "Frederick Remington", "Frida Kahlo", "Fritz von Dardel", "George Catlin", "George Inness", "Georges Seurat", "Gerald Brom", "Gerhard Richter", "Giorgio De Chirico", "Grandma Moses", "Greg Rutkowski", "Gustav Klimt", "H.R. Giger", "Hans Holbein The Younger", "Hans Makart", "Hayao Miyazaki", "Henri de Toulouse-Lautrec", "Henri Matisse", "Hilma Af Klint", "Hiroshi Sugimoto", "Hiroshi Yoshida", "Holly Hobbie", "Howard Pyle", "Imhotep", "Italo Calvino", "Ivan Aivazovsky", "J. M. W. Turner", "J. Scott Campbell", "Jack Kirby", "Jack Sorenson", "Jackson Pollock", "Jacob Epstein", "James Bama", "James Gurney", "James Jean", "James R. Eads", "Jean-Baptiste Monge", "Jean-Christian Biville", "Jean-Honoré Fragonard", "Jean-Michel Basquiat", "Jean-Paul Riopelle", "Jeffrey T. Larson", "Jim Fitzpatrick", "Johannes Vermeer", "John Bauer", "John Constable", "John Harris", "John Singer Sargent", "John Sloan", "John William Waterhouse", "Jose Guadalupe Posada", "Juan Gris", "Junji Ito", "Katsushika Hokusai", "Kay Nielsen", "Kazuo Oga", "Keiichi Tanaami", "Kohei Nawa", "Konstantin Razumov", "Kwon Soon-ho", "Käthe Kollwitz", "Lawren Harris", "Lee Bul", "Leon Bakst", "Leonid Afremov", "Leonardo da Vinci", "Lesley Harrison", "Lewis Carroll", "Li Huayi", "Lori Forest", "Lorna Simpson", "Lucas Cranach", "MC Escher", "Makoto Shinkai", "Marc Brown", "Marc Chagall", "Marc Simonetti", "Marcel Reider", "Mark Ryden", "Martin Kippenberger", "Mary Blair", "Matthew Archambault", "Maurice Brazil Prendergast", "Maurice Sendak", "Max Ernst", "Maxfield Parrish", "Michelangelo", "Miguel Ángel Ruiz Matute", "NC Wyeth", "Nam June Paik", "Nike Davies-Okundaye", "Norman Bridwell", "Norman Rockwell", "Ossip Zadkine", "Otto Dix", "Pablo Picasso", "Palermo", "Pat Erickson", "Patrick Nagel", "Paul Cézanne", "Paul Klee", "Paul Signac", "Pavel Korin", "Peter Han", "Peter Mohrbacher", "Peter Paul Rubens", "Philip Guston", "Piet Mondrian", "Quentin Blake", "Raja Ravi Varma", "Ralph Grady James", "Rembrandt Van Rijn", "René Magritte", "Rinko Kawauchi", "Robert Fludd", "Ross Tran (rossdraws)", "Roy Lichtenstein", "Salvador Dalí", "Senaka Senanayake", "Sesshū Tōyō", "Sigmar Polke", "Sir James Guthrie", "Sonia Delaunay", "Song Hyun-Sook", "Steven Belledin", "Studio Ghibli", "Takashi Murakami", "Tatsuo Miyajima", "Terry Redlin", "Thomas Cole", "Thomas Gerhartz", "Thomas Kinkade", "Thutmose", "Tim Burton", "Tom Bagshaw", "Tomie DePaola", "Utagawa Kuniyoshi", "Viktor Vasnetsov", "Vincent Van Gogh", "Virginia Frances Sterrett", "Vitto Ngai", "Warwick Goble", "Wassily Kandinsky", "William Blake", "William Gropper", "William Kentridge", "Winsor McCay", "Yayoi Kusama", "Yoji Shinkawa", "Yoshitomo Nara", "Zdzisław Beksiński", "Zeng Fanzhi"
    ]
  },
  "Aspect Ratio": {
    "subcomponents": [ "--ar 1:1", "--ar 1:2", "--ar 16:9", "--ar 1920:1040", "--ar 2:1", "--ar 2:3", "--ar 21:9", "--ar 3:2", "--ar 3:4", "--ar 4:3", "--ar 4:5", "--ar 5:4", "--ar 7:4", "--ar 9:16" ]
  },
  "Camera Effects & Styles": {
    "subcomponents": [
      "360 Panorama", "Anamorphic Lens Flare", "Aperture f/1.4", "Aperture f/16", "Aperture f/2.8", "Aperture f/22", "Aperture f/4", "Aperture f/5.6", "Aperture f/8", "Autochrome", "Bleached", "Cinematic Composition", "Circular Polarizer Filter", "Defocus", "Depth of Field (DOF)", "Fast Shutter Speed", "Film Grain", "Holographic", "Infra-red", "Kaleidoscope", "Lens Flare", "Long Exposure", "MRI Scan", "Night Vision", "Pinhole", "Radial Lens Flare", "Schlieren Photography", "Shallow DOF", "Slow Shutter Speed", "Super-35", "Thermography", "Tilt-Shift", "Tin Type", "Ultraviolet", "Volumetric Lighting"
    ]
  },
  "Camera Lens & Focus": {
    "subcomponents": [
      "Fisheye Lens", "Lens 300mm", "Lens 35mm", "Lens 5.6mm", "Lens 600mm", "Macro Lens", "Microscopy Lens", "Pinhole Lens", "Telephoto Lens", "Telescope Lens", "Tilt-Shift Lens", "Ultra-Wide-Angle Lens", "Wide-Angle Lens"
    ]
  },
  "Camera Shot & Framing": {
    "subcomponents": [
      "Aerial Perspective", "Architectural Perspective", "Canted Angle", "Close-Up", "Drone View", "Dutch Angle", "Extreme Close-Up", "First Person View", "From Above", "From Below", "High-Angle", "Isometric 3D", "Long Shot", "Low-Angle", "Medium Shot", "Oblique Angle", "Over The Shoulder", "Overhead Angle", "Panorama", "Rule of Thirds", "Satellite Imagery", "Security Camera View", "Selfie", "Third Person View", "Top-Down View", "Wide Shot", "Worm's-Eye View", "Zenithal View"
    ]
  },
  "Chaos": {
    "subcomponents": [ "--c 0", "--c 10", "--c 100", "--c 20", "--c 30", "--c 40", "--c 5", "--c 50", "--c 60", "--c 70", "--c 80", "--c 90" ]
  },
  "Clothing": {
    "subcomponents": [
      "Andura", "Arabian Robe", "Ball Gown", "Band Collar", "Bathrobe", "Boots", "Breastplate", "Breech Cloth", "Burka", "Business Suit", "Cape", "Chainmail", "Chogyu", "Convertible Collar", "Cowboy Hat", "Cowl", "Cummerbund", "Dance Shawl", "Dashiki", "Decorative Lapel", "Dishdasha", "Driving Gloves", "Elbow-Length Gloves", "Eton Collar", "Fabric Gloves", "Fingerless Gloves", "Flamenco Dress", "Flat Collar", "Full Platemail", "Funnel Neck Collar", "Grandad Collar", "Headdress", "Hood", "Hoodie", "Housecoat", "Jabot Collar", "Jeans", "Kasaya", "Kimono", "Lapel Collar", "Leather Armor", "Leggings", "Long Fringed Skirt", "Maid Outfit", "Mandarin Collar", "Mao Collar", "Mousquetaire Gloves", "Nehru Collar", "Notched Collar", "Opera Gloves", "Pajamas", "Peter Pan Collar", "Ribbon Skirt", "Robe", "Rolled Collar", "Romani Dress", "Ruff Collar", "Ruffle Collar", "Sailor Collar", "Sari", "Satin Gloves", "Shawl Collar", "Sheepskin Shirt", "Shirt Collar", "Silk Gloves", "Standing Collar", "Summer Dress", "Sweater", "Sweatsuit", "Swimsuit", "T-shirt", "Thoub", "Tie", "Top Collar", "Top Hat", "Touchscreen Gloves", "Towel", "Trenchcoat", "Tricivara", "Tulle Gloves", "Tunic", "Turban", "Turtle Neck Collar", "Under Collar", "Wing Collar", "Winter Gloves", "Work Gloves", "Wrist-Length Gloves"
    ]
  },
  "Color": {
    "subcomponents": [
      "Alabaster", "Amber", "Amethyst", "Analogous Colors", "Apricot", "Ash", "Avocado", "Azure", "Baby Blue", "Beige", "Black", "Black and White", "Bleached", "Blue", "Bold Colors", "Bone", "Bright Colors", "Brilliant Colors", "Bronze", "Brown", "Burgundy", "Canary", "Caramel", "Cerise", "Chalk", "Charcoal", "Chartreuse", "Cherry", "Chromatic Colors", "Cinnamon", "Claret", "Clean Colors", "Cobalt Blue", "Colorless", "Complementary Colors", "Cool Tones", "Copper", "Coral", "Cream", "Crimson", "Dark", "Deep Colors", "Delicate Colors", "Discolored", "Dove Grey", "Dun", "Dusty", "Ebony", "Ecru", "Eggshell", "Electric Blue", "Electric Colors", "Emerald", "Faded", "Fawn", "Festive Colors", "Fiery", "Flaming", "Flecked", "Fluorescent", "Fresh Colors", "Glistening", "Glittering", "Glowing", "Gold", "Green", "Greige", "Grey", "Harsh Colors", "Hazel", "High Contrast", "Ice Blue", "Indigo", "Inky", "Iridescent", "Iron Grey", "Ivory", "Jade", "Jet Black", "Lavender", "Leaden", "Light", "Lilac", "Lily White", "Lime Green", "Livid", "Low Contrast", "Magenta", "Maroon", "Matching Colors", "Mauve", "Mellow", "Milky", "Monochromatic", "Monotone", "Multicoloured", "Muted", "Navy Blue", "Neutral", "Nut Brown", "Off-White", "Olive", "Opalescent", "Opaque", "Orange", "Pale", "Pastel", "Pea Green", "Peacock Blue", "Peach", "Pink", "Plum", "Primary Colors", "Psychedelic", "Puce", "Pure Colors", "Purple", "Rainbow-Colored", "Red", "Restrained Colors", "Rich Colors", "Rose", "Rosy", "Royal Blue", "Ruby", "Ruddy", "Russet", "Rusty", "Saffron", "Salmon", "Sandy", "Saturated", "Scarlet", "Sea Green", "Sepia", "Shocking Pink", "Showy Colors", "Silver", "Sky Blue", "Smoky", "Snow White", "Soft Colors", "Sombre", "Sooty", "Splashy Colors", "Split Complementary Colors", "Steely", "Straw", "Tan", "Tawny", "Teal", "Terracotta", "Tetradic Colors", "Tinged", "Tinted", "Translucent", "Transparent", "Triadic Colors", "Turquoise", "Two-Tone", "Ultramarine Blue", "Umber", "Vermilion", "Vibrant", "Violet", "Warm Tones", "Watery", "White", "Wine", "Yellow"
    ]
  },
  "Composition Principles": {
    "subcomponents": [
      "Asymmetrical", "Balanced", "Classical Symmetry", "Consistent", "Contour Drawing", "Cutaway", "Dramatic Asymmetrical", "Equilibrium", "Glide Reflection Symmetry", "Hatching", "Hierarchical Proportion", "Insular Illumination", "Isometric", "Knolling", "Oblique Projection", "Planar Symmetry", "Proportional", "Raised Relief", "Reflection Symmetry", "Relief Artwork", "Repoussé", "Rotational Symmetry", "Rule of Thirds", "Sacred Geometry", "Screentone", "Sfumato", "Symmetrical", "Tarashikomi", "Translation Symmetry", "Trompe l'oeil", "Uniform"
    ]
  },
  "Composition Staging": {
    "subcomponents": [ "Background", "Far Distance", "Foreground", "Horizon", "Midground", "Negative Space" ]
  },
  "Conceptual & Abstract": {
    "subcomponents": [
      "Adoration", "Affection", "Aggravation", "Agitation", "Agony", "Alarm", "Alienation", "Amazement", "Amusement", "Anger", "Anguish", "Annoyance", "Anxiety", "Apprehension", "Astonishment", "Atmospheric", "Attraction", "Beautiful", "Bitterness", "Bliss", "Caring", "Cheerfulness", "Compassion", "Contempt", "Contentment", "Creepy", "Cute", "Defeat", "Dejection", "Delight", "Depression", "Desire", "Despair", "Disappointment", "Disgust", "Disintegrating", "Dislike", "Dismay", "Displeasure", "Distress", "Dread", "Dreamlike", "Dull", "Eagerness", "Ecstasy", "Elation", "Embarrassment", "Enjoyment", "Enthrallment", "Enthusiasm", "Envy", "Euphoria", "Exasperation", "Excitement", "Exhilaration", "Extravagant", "Fabergé", "Fairytale", "Fast", "Fear", "Feeling Peace", "Ferocity", "Fey", "Flamboyant", "Fluffy", "Fondness", "Fright", "Frustration", "Fury", "Furry", "Gaiety", "Gladness", "Glee", "Gloom", "Glumness", "Gorgeous", "Grief", "Grouchiness", "Grumpiness", "Guilt", "Happiness", "Hate", "Homesickness", "Hope", "Hopelessness", "Hostility", "Humiliation", "Hurt", "Hysteria", "Infatuation", "Insecurity", "Insult", "Irritation", "Isolation", "Jealousy", "Jolliness", "Joviality", "Joy", "Jubilation", "Liking", "Loathing", "Loneliness", "Longing", "Love", "Lust", "Melancholy", "Misery", "Mortification", "Neglect", "Nervousness", "Optimism", "Orthodox", "Outrage", "Panic", "Passion", "Peaceful", "Pity", "Pleasure", "Pretty", "Pride", "Rage", "Rapture", "Regret", "Rejection", "Relief", "Remorse", "Resentment", "Revulsion", "Rotten", "Sadness", "Satisfaction", "Scorn", "Sentimentality", "Shame", "Shock", "Sinister", "Sorrow", "Spite", "Starlight", "Stunning", "Suffering", "Surreal", "Surprise", "Sympathy", "Tenderness", "Tenebroso", "Tenseness", "Terror", "Thrill", "Torment", "Tranquility", "Triumph", "Ugly", "Uneasiness", "Unhappiness", "Vengefulness", "Wild", "Woe", "Worry", "Wrath", "Zeal", "Zest"
    ]
  },
  "Control & Utility": {
    "subcomponents": [ "--no [text]", "--repeat [2-40]", "--sameseed [number]", "--seed [number]", "--stop 10", "--stop 100", "--stop 20", "--stop 30", "--stop 40", "--stop 50", "--stop 60", "--stop 70", "--stop 80", "--stop 90", "--tile", "--video" ]
  },
  "Genre": {
    "subcomponents": [
      "Alternate History", "Apocalyptic", "Arcade", "Autobiographical", "Celebrity", "Crime", "Cyberpunk", "Dieselpunk", "Dystopian", "Fantasy", "Futuristic", "Gekiga", "Gothic", "High Fantasy", "Horror", "Humor", "Lo-Fi", "Medicine", "Mystery", "Punk", "Romance", "Science Fiction", "Space Opera", "Speculative Fiction", "Steampunk", "Superhero", "Teen", "Utopia", "War", "Western", "Wrestling"
    ]
  },
  "Holidays": {
    "subcomponents": [
      "Bodhi Day", "Chinese New Year", "Christmas", "Cinco de Mayo", "Day of the Dead", "Diwali", "Easter", "Eid al-Fitr", "Fourth of July", "Halloween", "Hanukkah", "Holi Festival", "New Year's Day", "Ramadan", "Valentine's Day"
    ]
  },
  "Image Weight": {
    "subcomponents": [ "--iw 0.25", "--iw 0.5", "--iw 1", "--iw 1.5", "--iw 2", "--iw 3", "--iw 5" ]
  },
  "Lighting Phenomena": {
    "subcomponents": [
      "Accent Lighting", "Anamorphic Lens Flare", "Atmospheric Lighting", "Aurora Australis", "Aurora Borealis", "Backlight", "Bioluminescence", "Black Light", "Blinding Light", "Blue Hour", "Bright", "Cinematic LUT", "Contre-jour", "Crepuscular Rays", "Dark", "Daylight", "Doppler Shift", "Dramatic Interior Lights", "Dusk", "Early Morning", "Fairy Tale Sparkles", "Film Grain", "Full Moon", "Glow-in-the-dark", "Glowing Fire", "Golden Hour", "Half-Rear Lighting", "Hard Light", "Incandescent", "Infrared", "Laser", "Lens Flare", "Light Rays", "Light Scattering", "Light Spectrography", "Low-Key Lighting", "Magic Sparkles", "Moody", "Moonlight", "Morning Light", "Natural Light", "Night Scene", "Opalescent Crepuscular Rays", "Orthochromatic", "Panchromatic", "Parallax Shadows", "Phosphorescent", "Prismatic", "Radiant Light", "Ray Tracing Global Illumination", "Realistic Light", "Refracted Light", "Silhouette", "Snoot Effect", "Soft Light", "Sparkly Lights", "Spotlight", "Studio Light", "Subsurface Scattering", "Sunlight", "Sunset", "Volumetric Lighting", "Waning Light", "X-Ray"
    ]
  },
  "Lighting Sources": {
    "subcomponents": [ "Black Light Bulb", "Black Sun", "Campfire", "Candlelight", "Christmas Lights", "Diya Lamp", "Edison Bulb", "Floodlight", "Fluorescent Bulb", "Glow Stick", "Lantern", "LED Lights", "Neon Bulb", "Nixie Tube Bulb", "Plasma Globe", "Vacuum Tube Bulb" ]
  },
  "Lighting Styles": {
    "subcomponents": [ "Accent Lighting", "Atmospheric", "Backlit", "Blue Hour", "Cinematic", "Contre-jour", "Dark", "Dramatic", "Film Noir", "Golden Hour", "Hard", "Low-Key", "Moody", "Natural", "Night", "Realistic", "Soft", "Studio" ]
  },
  "Location & Environment": {
    "subcomponents": [
      "Adobo Hut", "Alley", "Amalfi Coast, Italy", "Amsterdam, Netherlands", "Angel Falls, Venezuela", "Ankara, Turkey", "Antarctic Peninsula", "Antelope Canyon, Arizona", "Appalachian Mountains", "Arashiyama Bamboo Forest, Japan", "Atacama Desert, Chile", "Athens, Greece", "Atlantic City, New Jersey", "Atoll Island", "Atrium", "Avenue of the Baobabs, Madagascar", "Bagan, Myanmar", "Baltimore, Maryland", "Bamboo Shelter", "Banff National Park, Canada", "Bangkok, Thailand", "Barcelona, Spain", "Bathroom", "Beach", "Bedroom", "Beijing, China", "Benin, Republic of", "Berlin, Germany", "Berne, Switzerland", "Biodome", "Black Rock City, Nevada", "Blue Lagoon, Iceland", "Boat", "Bora Bora, French Polynesia", "Boy Scout Camp", "Brussels, Belgium", "Budapest, Hungary", "Buenos Aires, Argentina", "Caño Cristales, Colombia", "Cairngorms National Park, Scotland", "Cairo, Egypt", "Cameron Highlands, Malaysia", "Canberra, Australia", "Cannes, France", "Cape Town, South Africa", "Cappadocia, Turkey", "Capri, Italy", "Casino", "Castle", "Catacombs", "Caucasus Mountains, Georgia", "Champs Élysées, France", "Chefchaouen, Morocco", "Chicago, Illinois", "City", "City Street", "Cliffs of Etretat, France", "Cliffs of Moher, Ireland", "Closet", "Clouds", "Cologne, Germany", "Comino Island, Malta", "Cottage", "Crowded Japanese Ramen Stall", "Damascus, Syria", "Dark Hedges, Northern Ireland", "Delhi, India", "Denali National Park, Alaska", "Desert", "Desert Oasis Palace City", "Dining Room", "Dirt Road", "Douro Valley, Portugal", "Dubai, UAE", "Dublin, Ireland", "Edinburgh Castle, Scotland", "El Yunque National Forest, Puerto Rico", "Engine Room", "Entryway", "Fernando de Noronha, Brazil", "Finnish Lapland", "Fiordland National Park, New Zealand", "Florence, Italy", "Forbidden City, Beijing, China", "Forest", "French Café on the Riviera", "French Chalet", "Galápagos Islands, Ecuador", "Galleon", "Garage", "Genève, Switzerland", "Girl Scout Camp", "Giza, Egypt", "Grand Canyon National Park, Arizona", "Grand Prismatic Spring, Wyoming", "Grand Teton National Park, Wyoming", "Great Hall", "Great Ocean Road, Australia", "Greenhouse", "Ha Long Bay, Vietnam", "Ha Noi, Viet Nam", "Hallway", "Havana, Cuba", "Havasu Falls, Arizona", "Hawa Mahal, Jaipur, India", "Helsinki, Finland", "Hoia-Baciu Forest, Romania", "Hong Kong", "Honolulu, Hawaii", "Hovel", "Iguazú Falls, Argentina", "Ipanema Beach, Brazil", "Isla Holbox, Mexico", "Isle of Skye, Scotland", "Istanbul, Turkey", "Jakarta, Indonesia", "Jerusalem", "Jodhpur, Rajasthan, India", "Julia Pfeiffer Burns State Park, California", "Jungle", "Kansas City, Missouri", "Kathmandu, Nepal", "Keukenhof Park, Netherlands", "Key West, Florida", "Kingdom", "Kitchen", "Kowloon Walled City", "Krabi, Thailand", "Kuala Lumpur, Malaysia", "Lagoon", "Lake", "Lake Louise, Canada", "Lake Lugano, Switzerland", "Lake Tekapo, New Zealand", "Land Art", "Larnach Castle, New Zealand", "Las Salinas de Torrevieja, Spain", "Laundry Room", "Leap Castle, Ireland", "Li River, China", "Liquor Bar", "Lisbon, Portugal", "Living Room", "Lofoten Islands, Norway", "London, UK", "Los Angeles, California", "Luxembourg", "Mù Cang Chải, Vietnam", "Machu Picchu, Peru", "Madrid, Spain", "Mali, Republic of", "Manarola, Italy", "Manila, Philippines", "Market", "Marrakesh, Morocco", "Melbourne, Australia", "Mexico City, Mexico", "Miho no Matsubara, Japan", "Milan, Italy", "Montane Rainforest", "Monteverde, Costa Rica", "Montreal, Canada", "Mosh Pit", "Moscow, Russia", "Mossy Hill", "Mount Fuji, Japan", "Mount Kilimanjaro, Tanzania", "Mountain", "Mountains with Fog", "Mumbai, India", "Munich, Germany", "Na Pali Coast State Park, Hawaii", "Nahanni National Park Reserve, Canada", "Namaqualand, South Africa", "Namib Desert, Namibia", "Nazareth, Israel", "New York City, New York", "Nizza, France", "Nuuk, Greenland", "Ocean", "Oia, Greece", "Okavango Delta, Botswana", "Osaka, Japan", "Oslo, Norway", "Ottawa, Canada", "Palace", "Palawan, Philippines", "Pamukkale, Turkey", "Paris, France", "Perfect World", "Philadelphia, Pennsylvania", "Phnom Penh, Cambodia", "Pine Barrens", "Pirate Bar", "Planet", "Plitvice Lakes National Park, Croatia", "Prague, Czech Republic", "Provence, France", "Quito, Ecuador", "Rainforest", "Raja Ampat, Indonesia", "Rakotzbrücke, Germany", "Reine, Norway", "Reserva Biológica Bosque Nuboso Monteverde", "Reykjavik, Iceland", "Reynisfjara Beach, Iceland", "Rio de Janeiro, Brazil", "Ronda, Spain", "Rustic Restaurant in Greece", "Sa Pa, Vietnam", "Saint Petersburg, Russia", "Salar de Uyuni, Bolivia", "San Francisco, California", "Sand", "Santa Fe, New Mexico", "Santiago, Chile", "Seoul, South Korea", "Sequoia National Park, California", "Serengeti National Park, Tanzania", "Shanghai, China", "Sheikh Zayed Grand Mosque, Abu Dhabi", "Ship", "Singapore", "Skeleton Coast, Namibia", "Socotra, Yemen", "Sossusvlei, Namibia", "South Luangwa National Park, Zambia", "St. Basil's Cathedral, Moscow", "Stadium", "Stockholm, Sweden", "Street", "Street Market", "Supermarket", "Swamp", "Sydney, Australia", "São Paulo, Brazil", "Table Mountain, South Africa", "Taipei, Taiwan", "Tamil Nadu, India", "Tattoo Parlour", "Tavern", "Tea Plantations of Munnar, India", "Temple of Dendur", "The Azores, Portugal", "The Baths, British Virgin Islands", "The Dead Sea, Israel", "The Great Barrier Reef, Australia", "The Hague, Netherlands", "The Maroon Bells, Colorado", "The Pitons, Saint Lucia", "The Storr, Scotland", "Tiger's Nest, Bhutan", "Tiwanaku, Bolivia", "Tokyo, Japan", "Toronto, Canada", "Torres del Paine National Park, Chile", "Traditional Bedouin Tent in Persia", "Trolltunga, Norway", "Tundra", "Twelve Apostles, Australia", "Underground", "Underwater", "Utopia", "Utility Room", "Vaadhoo Island, Maldives", "Valle de Cocora, Colombia", "Varanasi, India", "Venice, Italy", "Victoria Falls, Zambia/Zimbabwe", "Vienna, Austria", "Volcano", "Vorarlberg, Austria", "Wadi Rum, Jordan", "Washington D.C., USA", "Whirlpool", "White Desert, Egypt", "Whitsunday Islands, Australia", "World", "Wulingyuan Scenic Area, China", "Zakynthos, Greece", "Zhangjiajie National Forest, China", "Zhangye National Geopark, China", "Zlatni Rat, Croatia", "Zürich, Switzerland"
    ]
  },
  "Materials & Textures": {
    "subcomponents": [
      "Ablaze", "Acetate", "Alexandrite", "Allover Lace", "Aluminized", "Amber", "Amethyst", "Aquamarine", "Bamboo", "Basket Weave", "Batiste", "Bumpy", "Burlap", "Burn Out Fabric", "Butyl Rubber", "Cashmere", "Cat's Eye Quartz", "Challis", "Chantilly Lace", "Chenille", "Cheviot", "Chiffon", "Citrine", "Cluny Lace", "Coated Fabric", "Coral", "Corduroy", "Cotton", "Covered in Runes", "Covered in Sequins", "Crepe", "Crystallized Fiberoptic", "Damask", "Denim", "Diamond", "Double-Cloth", "Embossed", "Emerald", "Eyelet", "Faux Fur", "Felt", "Filet Lace", "Fleece", "Fur", "Garnet", "Gauze", "Georgette", "Gilding", "Glassy", "Glitter", "Glossy", "Granular", "Grungy", "Guipure Lace", "Hatched", "Hemp", "Hessonite", "Houndstooth", "Ikat", "Iolite", "Jade", "Kevlar", "Knit", "Lace", "Lapis Lazuli", "Latex", "Lawn Fabric", "Leather", "Linen", "Lustrous", "Lycra", "Matte", "Merino Wool", "Mesh", "Nylon", "Ogee", "Onyx", "Opal", "Opalescent", "Organdie", "Organza", "Paisley", "Panko Breaded", "Pearl", "Peridot", "Peyote Stitch Bead Weaving", "Plain Weave", "Polyester", "Puncture-Resistant", "Quartz", "Quilted", "Ruby", "Sapphire", "Satin", "Shibori", "Silk", "Smooth", "Spandex", "Suede", "Synthetic", "Tana Lawn", "Tanzanite", "Tape Lace", "Terry Cloth", "Topaz", "Tourmaline", "Tulle", "Tweed", "Twill Weave", "Val Lace", "Velour", "Velvet", "Visible Brushstrokes", "Voile", "Waffle Weave", "Wool", "Woven"
    ]
  },
  "Quality": {
    "subcomponents": [ "--q 0.25", "--q 0.5", "--q 1", "--q 2", "--q 4" ]
  },
  "Reference": {
    "subcomponents": [ "--cref [image_url]", "--cw [0-100]", "--oref [image_url]", "--ow [0-100]", "--sref [image_url]", "--sref random", "--sw [0-1000]" ]
  },
  "Rendering & VFX": {
    "subcomponents": [
      "3-Point Perspective", "8K Post-Production", "Artstation", "Award-Winning", "Bioengineered", "Blender Render", "Cinema4D Render", "CryEngine Render", "Detailed", "Epic", "HD Octane Render", "High-Definition", "Highly Detailed", "Hyperrealistic", "Insanely Detailed", "Insanely Detailed and Intricate", "LuxCoreRender", "Maya Render", "Movie Concept Art", "Octane Render", "Origami Studio 3 Design", "Photo-Realistic", "Physically Based Render", "Ray Tracing", "Realistic", "RedShift Render", "Rendered in Octane", "Super-Detailed", "Super-Resolution", "Toon Boom Render", "Trending on Artstation", "Ultra-Detailed", "Ultra-Realistic", "Unity Render", "Unreal Engine 5 Render", "V-Ray Render", "ZBrush Render"
    ]
  },
  "Seasons": {
    "subcomponents": [ "Autumn", "Autumnal Equinox", "Dry Season", "Fall", "Growing Season", "Harvest Season", "Planting Season", "Rainy Season", "Spring", "Summer", "Summer Solstice", "Vernal Equinox", "Winter", "Winter Solstice" ]
  },
  "Speed & Mode": {
    "subcomponents": [ "--draft", "--fast", "--relax", "--turbo" ]
  },
  "Style": {
    "subcomponents": [ "--style cute", "--style expressive", "--style original", "--style raw", "--style scenic" ]
  },
  "Stylize": {
    "subcomponents": [ "--s 0", "--s 100", "--s 1000", "--s 1250", "--s 250", "--s 2500", "--s 50", "--s 500", "--s 5000", "--s 625", "--s 750" ]
  },
  "Subjects": {
    "subcomponents": [
      "Abominable Snowman", "Alien", "Alligator Lizard", "Ambystoma Mexicanum", "Angel", "Anole", "Arctic Hare", "Arctic Wolf", "Axolotl", "Banshee", "Barbarian", "Basilisk", "Bear", "Behemoth", "Beta Fish", "Bigfoot", "Bird", "Bombus Polaris", "Brown Bear", "Butterfly", "Capybara", "Cat", "Centaur", "Chameleon", "Cheek Conure", "Cheerleader", "Cherub", "Chimera", "Chinchilla", "Chipmunk", "Chupacabra", "Clown", "Collared Lizard", "Cowboy", "Creature", "Cyclops", "Cyborg", "Deer", "Demon", "Devil", "Dog", "Doll", "Dolphin", "Drag Queen", "Dragon", "Dwarf", "Dybbuk", "Eastern Wolf", "Elephant", "Elf", "Ermine", "Fairy", "Ferret", "Flamenco Dancer", "Flamingo", "Frog", "Gecko", "Ghost", "Ghoul", "Gila Monster", "Giraffe", "Gnome", "Goat", "Goddess", "Goblin", "Golem", "Gorgon", "Gremlin", "Griffin", "Himalayan Tahr", "Horse", "Iguana", "Imp", "Jester", "Jersey Devil", "Joker", "Kangra Bride", "Kea", "Kelpie", "King", "Kitten", "Knight", "Komodo Dragon", "Kraken", "Lemming", "Leopard Gecko", "Leprechaun", "Leviathan", "Lich", "Lizard", "Llama", "Loch Ness Monster", "Lynx", "Manticore", "Marine Iguana", "Marmot", "Mecha", "Medusa", "Mermaid", "Merman", "Minotaur", "Monkey", "Monster", "Mummy", "Narwhal", "Newt", "Ninja", "Oni", "Orc", "Owl", "Owlette", "Pegasus", "Penguin", "Phoenix", "Phorusrhacidae Terror Bird", "Pika", "Pirate", "Pixie", "Polar Bear", "Pontianak", "Pony", "Ptarmigan", "Puppy", "Pokémon", "Queen", "Reindeer", "Robot", "Saint", "Sand Lizard", "Sea Lion", "Sea Serpent", "Seal", "Shark", "Sheep", "Siren", "Skeleton", "Skink", "Smurf", "Snow Petrel", "Soldier", "Sphinx", "Spirit", "Squirrel", "Stag", "Stoat", "Tardigrade", "Tegu", "Tengu", "Toy", "Troll", "Unicorn", "Vampire", "Vulture", "Walrus", "Wendigo", "Werewolf", "Whale", "Witch", "Wizard", "Yak", "Zombie"
    ]
  },
  "UI & Typography": {
    "subcomponents": [
      "Arabic Calligraphy", "Blueprint Style", "Book of Kells Style", "Braille", "Calligraphy", "Celtic Knotwork", "Character Reference Sheet", "Circuit Board", "Codex Style", "Coloring Book Page", "Comic Book Art", "Decal", "Distressing", "Eastern Calligraphy", "Egyptian Book of the Dead", "Eldritch Manuscript", "Engraving", "Faux Painting", "Graphic Novel", "Guilloche Pattern", "Hand-Painted", "Horoscope Chart", "Icon Art", "Keum-boo Gilding", "Mandala", "Map Compass", "Nautical Chart", "Nerikomi Clay Pattern", "Patent Drawing", "Rosetta Stone", "Runes", "Sheet Music", "Sticker", "Sundial", "Tapestry", "Topographic Map", "Treasure Map", "Typography", "Vector Logo", "Victorian Card", "Voynich Manuscript", "Western Calligraphy", "Wine Bottle Label", "Yin-Yang", "Zen Buddhist Style"
    ]
  },
  "Version": {
    "subcomponents": [ "--niji 5", "--niji 6", "--v 4", "--v 5", "--v 5.1", "--v 5.2", "--v 6", "--v 7" ]
  },
  "Weather": {
    "subcomponents": [ "Arid", "Balmy", "Breezy", "Calm", "Cloudy", "Cold", "Cool", "Drizzle", "Dust Devil", "Fluffy Clouds", "Fog", "Frigid", "Frost", "Frosty", "Full Sun", "Hurricane", "Mist", "Overcast", "Partially Cloudy", "Rain", "Rainy", "Sandstorm", "Snow", "Stormy", "Sunny", "Thunderstorm", "Tornado", "Tsunami", "Warm", "Wet", "Windy" ]
  },
  "Weird": {
    "subcomponents": [ "--w 0", "--w 100", "--w 1000", "--w 2000", "--w 250", "--w 3000", "--w 500", "--w 750" ]
  }
};

export const ARTIST_COMPONENTS = newData.Artists.subcomponents;
export const STYLE_COMPONENTS = newData["Art Movements"].subcomponents;
export const INSPIRATION_CATEGORIES = {
    'Art Mediums': newData["Art Mediums"].subcomponents,
    'Lighting Styles': newData["Lighting Styles"].subcomponents,
    'Conceptual & Abstract': newData["Conceptual & Abstract"].subcomponents,
};


// --- BEGIN: Overhauled PROMPT_COMPONENTS generation using promptComponentData.generated.ts ---
const PROMPT_COMPONENTS: PromptComponent[] = [];
let idCounter = 0;
const allNewCategories = Object.keys(promptComponentData);
const allNewSubcomponents = new Set<string>();
for (const category of allNewCategories) {
  const catObj = promptComponentData[category];
  // Special handling for Midjourney Parameters with subfolders
  if (category === "Midjourney Parameters" && catObj.subfolders) {
    for (const subfolderName of Object.keys(catObj.subfolders)) {
      const subfolder = catObj.subfolders[subfolderName];
      for (const sub of Object.keys(subfolder.subcomponents)) {
        idCounter++;
        PROMPT_COMPONENTS.push({
          id: `comp-${idCounter}`,
          text: sub,
          category: subfolderName,
          description: subfolder.subcomponents[sub] || subfolder.description || '',
          placement: PlacementRule.MIDDLE,
          param: undefined,
          accepts_value: false,
        });
        allNewSubcomponents.add(sub);
      }
    }
  } else if (catObj.subcomponents) {
    for (const sub of Object.keys(catObj.subcomponents)) {
      idCounter++;
      PROMPT_COMPONENTS.push({
        id: `comp-${idCounter}`,
        text: sub,
        category,
        description: catObj.subcomponents[sub] || catObj.description || '',
        placement: PlacementRule.MIDDLE,
        param: undefined,
        accepts_value: false,
      });
      allNewSubcomponents.add(sub);
    }
  }
}
// Add any legacy components that are not in the new file
// (Optional: implement if you want to keep legacy components)
// Add Advanced Syntax at the end (if not already present)
PROMPT_COMPONENTS.push(
  { id: 'adv-1', text: '::', category: 'Advanced Syntax', description: 'Multi-Prompt Separator. Inserts a weight separator at the cursor.', placement: PlacementRule.INSERT_AT_CURSOR },
  { id: 'adv-2', text: '{}', category: 'Advanced Syntax', description: 'Permutation Wrapper. Wraps the selected text to create prompt variations.', placement: PlacementRule.WRAP_SELECTION }
);
export { PROMPT_COMPONENTS };
// --- END: Overhauled PROMPT_COMPONENTS generation ---

const FINAL_CATEGORIES = [...new Set(PROMPT_COMPONENTS.map(c => c.category))];

// Define the parameter categories (add or adjust as needed)
export const PARAMETER_CATEGORIES = new Set([
  "Aspect Ratio",
  "Chaos",
  "Control & Utility",
  "Image Weight",
  "Quality",
  "Reference",
  "Speed & Mode",
  "Style",
  "Stylize",
  "Version",
  "Weird"
]);


// Create and export the two groups of categories
export const PARAMETER_SUB_CATEGORIES = FINAL_CATEGORIES
    .filter(c => PARAMETER_CATEGORIES.has(c))
    .sort((a, b) => a.localeCompare(b));

export const OTHER_CATEGORIES = FINAL_CATEGORIES
    .filter(c => !PARAMETER_CATEGORIES.has(c))
    .sort((a, b) => a.localeCompare(b));
