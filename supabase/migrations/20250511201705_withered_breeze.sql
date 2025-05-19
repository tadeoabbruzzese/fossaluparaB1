/*
  # Initial schema setup for Forest Haven Campsite

  1. New Tables
    - reviews
      - id (uuid, primary key)
      - name (text)
      - rating (integer)
      - comment (text)
      - date (timestamptz)
      - published (boolean)
      - user_id (uuid, foreign key)
      
    - pricing_options
      - id (uuid, primary key)
      - name (text)
      - description (text)
      - price_per_night (integer)
      - features (text[])
      
    - gallery_images
      - id (uuid, primary key)
      - url (text)
      - title (text)
      - description (text)
      - featured (boolean)
      
    - contact_requests
      - id (uuid, primary key)
      - name (text)
      - email (text)
      - phone (text)
      - message (text)
      - request_type (text)
      - date_submitted (timestamptz)
      - responded (boolean)
      - user_id (uuid, foreign key)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text NOT NULL,
  date timestamptz DEFAULT now(),
  published boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read published reviews"
  ON reviews
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can create reviews"
  ON reviews
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Pricing options table
CREATE TABLE IF NOT EXISTS pricing_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_per_night integer NOT NULL,
  features text[] NOT NULL
);

ALTER TABLE pricing_options ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read pricing options"
  ON pricing_options
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Only authenticated users can modify pricing"
  ON pricing_options
  FOR ALL
  TO authenticated
  USING (true);

-- Gallery images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  url text NOT NULL,
  title text NOT NULL,
  description text,
  featured boolean DEFAULT false
);

ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view gallery images"
  ON gallery_images
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Only authenticated users can modify gallery"
  ON gallery_images
  FOR ALL
  TO authenticated
  USING (true);

-- Contact requests table
CREATE TABLE IF NOT EXISTS contact_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  request_type text NOT NULL,
  date_submitted timestamptz DEFAULT now(),
  responded boolean DEFAULT false,
  user_id uuid REFERENCES auth.users(id)
);

ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create contact requests"
  ON contact_requests
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view and manage contact requests"
  ON contact_requests
  FOR ALL
  TO authenticated
  USING (true);

-- Insert initial pricing data
INSERT INTO pricing_options (name, description, price_per_night, features) VALUES
  (
    'Standard Campsite',
    'Perfect for tent camping with basic amenities.',
    35,
    ARRAY['Fire pit', 'Picnic table', 'Access to communal bathrooms', 'Parking spot']
  ),
  (
    'Premium Campsite',
    'Spacious site with water and electric hookups.',
    55,
    ARRAY['Water hookup', 'Electric hookup', 'Fire pit', 'Picnic table', 'Wi-Fi', 'Premium location']
  ),
  (
    'Rustic Cabin',
    'Cozy cabin with basic amenities for a comfortable stay.',
    95,
    ARRAY['Queen bed', 'Small kitchenette', 'Private bathroom', 'Heating/AC', 'Covered porch']
  ),
  (
    'Luxury Cabin',
    'Fully equipped cabin with modern amenities for an upscale camping experience.',
    165,
    ARRAY['King bed', 'Full kitchen', 'Hot tub', 'Fireplace', 'Private deck', 'Premium views']
  );

-- Insert initial gallery images
INSERT INTO gallery_images (url, title, description, featured) VALUES
  (
    'https://images.pexels.com/photos/2422265/pexels-photo-2422265.jpeg',
    'Lakeside View',
    'Beautiful sunrise view from our premium campsites',
    true
  ),
  (
    'https://images.pexels.com/photos/2582818/pexels-photo-2582818.jpeg',
    'Cozy Cabin',
    'Interior of our rustic cabins with all amenities',
    false
  ),
  (
    'https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg',
    'Campfire Nights',
    'Enjoy evenings around the campfire with friends and family',
    true
  ),
  (
    'https://images.pexels.com/photos/6271619/pexels-photo-6271619.jpeg',
    'Forest Trails',
    'Explore our extensive network of hiking trails',
    false
  ),
  (
    'https://images.pexels.com/photos/27865/pexels-photo-27865.jpg',
    'Wildlife Encounters',
    'The campsite is home to diverse wildlife',
    false
  ),
  (
    'https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg',
    'Stargazing Deck',
    'Perfect spot for nighttime astronomy',
    true
  );