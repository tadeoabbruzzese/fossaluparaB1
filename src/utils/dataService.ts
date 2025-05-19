// Mock database using localStorage

// Types
export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  published: boolean;
}

export interface PricingOption {
  id: string;
  name: string;
  description: string;
  pricePerNight: number;
  features: string[];
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  featured: boolean;
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  requestType: 'quote' | 'information';
  dateSubmitted: string;
  responded: boolean;
}

// Initial Data
const initialReviews: Review[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    rating: 5,
    comment: "The most peaceful camping experience I've ever had. The facilities were clean and the staff was incredibly friendly!",
    date: '2025-03-15',
    published: true
  },
  {
    id: '2',
    name: 'Michael Taylor',
    rating: 4,
    comment: 'Beautiful location with amazing views. The hiking trails are well-maintained and offer various difficulty levels.',
    date: '2025-02-28',
    published: true
  },
  {
    id: '3',
    name: 'Emma Wilson',
    rating: 5,
    comment: 'We loved our cabin stay! The amenities were perfect and the atmosphere was so relaxing. Will definitely return.',
    date: '2025-02-10',
    published: true
  }
];

const initialPricing: PricingOption[] = [
  {
    id: '1',
    name: 'Standard Campsite',
    description: 'Perfect for tent camping with basic amenities.',
    pricePerNight: 35,
    features: ['Fire pit', 'Picnic table', 'Access to communal bathrooms', 'Parking spot']
  },
  {
    id: '2',
    name: 'Premium Campsite',
    description: 'Spacious site with water and electric hookups.',
    pricePerNight: 55,
    features: ['Water hookup', 'Electric hookup', 'Fire pit', 'Picnic table', 'Wi-Fi', 'Premium location']
  },
  {
    id: '3',
    name: 'Rustic Cabin',
    description: 'Cozy cabin with basic amenities for a comfortable stay.',
    pricePerNight: 95,
    features: ['Queen bed', 'Small kitchenette', 'Private bathroom', 'Heating/AC', 'Covered porch']
  },
  {
    id: '4',
    name: 'Luxury Cabin',
    description: 'Fully equipped cabin with modern amenities for an upscale camping experience.',
    pricePerNight: 165,
    features: ['King bed', 'Full kitchen', 'Hot tub', 'Fireplace', 'Private deck', 'Premium views']
  }
];

const initialGalleryImages: GalleryImage[] = [
  {
    id: '1',
    url: 'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg',
    title: 'Lakeside View',
    description: 'Beautiful sunrise view from our premium campsites',
    featured: true
  },
  {
    id: '2',
    url: 'https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg',
    title: 'Cozy Cabin',
    description: 'Interior of our rustic cabins with all amenities',
    featured: false
  },
  {
    id: '3',
    url: 'https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg',
    title: 'Campfire Nights',
    description: 'Enjoy evenings around the campfire with friends and family',
    featured: true
  },
  {
    id: '4',
    url: 'https://images.pexels.com/photos/6271619/pexels-photo-6271619.jpeg',
    title: 'Forest Trails',
    description: 'Explore our extensive network of hiking trails',
    featured: false
  },
  {
    id: '5',
    url: 'https://images.pexels.com/photos/27865/pexels-photo-27865.jpg',
    title: 'Wildlife Encounters',
    description: 'The campsite is home to diverse wildlife',
    featured: false
  },
  {
    id: '6',
    url: 'https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg',
    title: 'Stargazing Deck',
    description: 'Perfect spot for nighttime astronomy',
    featured: true
  }
];

// Helper to initialize data in localStorage if it doesn't exist
const initializeData = () => {
  if (!localStorage.getItem('campsite-reviews')) {
    localStorage.setItem('campsite-reviews', JSON.stringify(initialReviews));
  }
  
  if (!localStorage.getItem('campsite-pricing')) {
    localStorage.setItem('campsite-pricing', JSON.stringify(initialPricing));
  }
  
  if (!localStorage.getItem('campsite-gallery')) {
    localStorage.setItem('campsite-gallery', JSON.stringify(initialGalleryImages));
  }
  
  if (!localStorage.getItem('campsite-contacts')) {
    localStorage.setItem('campsite-contacts', JSON.stringify([]));
  }
};

// Data Service Functions

// Reviews
export const getReviews = (publishedOnly = false): Review[] => {
  initializeData();
  const reviews = JSON.parse(localStorage.getItem('campsite-reviews') || '[]');
  return publishedOnly ? reviews.filter((review: Review) => review.published) : reviews;
};

export const addReview = (review: Omit<Review, 'id' | 'date' | 'published'>): Review => {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    published: false
  };
  
  localStorage.setItem('campsite-reviews', JSON.stringify([...reviews, newReview]));
  return newReview;
};

export const updateReview = (id: string, updates: Partial<Review>): Review | null => {
  const reviews = getReviews();
  const index = reviews.findIndex((r: Review) => r.id === id);
  
  if (index === -1) return null;
  
  const updatedReview = { ...reviews[index], ...updates };
  reviews[index] = updatedReview;
  
  localStorage.setItem('campsite-reviews', JSON.stringify(reviews));
  return updatedReview;
};

export const deleteReview = (id: string): boolean => {
  const reviews = getReviews();
  const filteredReviews = reviews.filter((r: Review) => r.id !== id);
  
  if (filteredReviews.length === reviews.length) return false;
  
  localStorage.setItem('campsite-reviews', JSON.stringify(filteredReviews));
  return true;
};

// Pricing
export const getPricing = (): PricingOption[] => {
  initializeData();
  return JSON.parse(localStorage.getItem('campsite-pricing') || '[]');
};

export const updatePricing = (id: string, updates: Partial<PricingOption>): PricingOption | null => {
  const pricing = getPricing();
  const index = pricing.findIndex((p: PricingOption) => p.id === id);
  
  if (index === -1) return null;
  
  const updatedPricing = { ...pricing[index], ...updates };
  pricing[index] = updatedPricing;
  
  localStorage.setItem('campsite-pricing', JSON.stringify(pricing));
  return updatedPricing;
};

// Gallery
export const getGalleryImages = (featuredOnly = false): GalleryImage[] => {
  initializeData();
  const images = JSON.parse(localStorage.getItem('campsite-gallery') || '[]');
  return featuredOnly ? images.filter((img: GalleryImage) => img.featured) : images;
};

export const addGalleryImage = (image: Omit<GalleryImage, 'id'>): GalleryImage => {
  const images = getGalleryImages();
  const newImage: GalleryImage = {
    ...image,
    id: Date.now().toString()
  };
  
  localStorage.setItem('campsite-gallery', JSON.stringify([...images, newImage]));
  return newImage;
};

export const updateGalleryImage = (id: string, updates: Partial<GalleryImage>): GalleryImage | null => {
  const images = getGalleryImages();
  const index = images.findIndex((img: GalleryImage) => img.id === id);
  
  if (index === -1) return null;
  
  const updatedImage = { ...images[index], ...updates };
  images[index] = updatedImage;
  
  localStorage.setItem('campsite-gallery', JSON.stringify(images));
  return updatedImage;
};

export const deleteGalleryImage = (id: string): boolean => {
  const images = getGalleryImages();
  const filteredImages = images.filter((img: GalleryImage) => img.id !== id);
  
  if (filteredImages.length === images.length) return false;
  
  localStorage.setItem('campsite-gallery', JSON.stringify(filteredImages));
  return true;
};

// Contact Requests
export const addContactRequest = (request: Omit<ContactRequest, 'id' | 'dateSubmitted' | 'responded'>): ContactRequest => {
  const requests = JSON.parse(localStorage.getItem('campsite-contacts') || '[]');
  const newRequest: ContactRequest = {
    ...request,
    id: Date.now().toString(),
    dateSubmitted: new Date().toISOString(),
    responded: false
  };
  
  localStorage.setItem('campsite-contacts', JSON.stringify([...requests, newRequest]));
  return newRequest;
};

export const getContactRequests = (): ContactRequest[] => {
  return JSON.parse(localStorage.getItem('campsite-contacts') || '[]');
};

export const deleteContactRequest = (id: string): boolean => {
  const requests = getContactRequests();
  const filteredRequests = requests.filter((req: ContactRequest) => req.id !== id);
  
  if (filteredRequests.length === requests.length) return false;
  
  localStorage.setItem('campsite-contacts', JSON.stringify(filteredRequests));
  return true;
};

// Initialize data on first load
initializeData();