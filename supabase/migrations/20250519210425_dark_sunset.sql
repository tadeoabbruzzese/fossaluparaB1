/*
  # Create pricing options table and add initial data

  1. New Tables
    - `pricing_options`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price_per_night` (numeric)
      - `features` (text array)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on `pricing_options` table
    - Add policy for public read access
    - Add policy for authenticated users to manage pricing options

  3. Initial Data
    - Add default pricing options
*/

-- Create the pricing_options table
CREATE TABLE IF NOT EXISTS pricing_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price_per_night numeric NOT NULL,
  features text[] NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE pricing_options ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Allow public read access"
  ON pricing_options
  FOR SELECT
  TO public
  USING (true);

-- Create policy for authenticated users to manage pricing options
CREATE POLICY "Allow authenticated users to manage pricing options"
  ON pricing_options
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert initial pricing options
INSERT INTO pricing_options (name, description, price_per_night, features)
VALUES
  (
    'Basic Camping',
    'Perfect for the adventurous camper',
    29.99,
    ARRAY[
      'Tent camping spot',
      'Access to shared bathrooms',
      'Picnic table',
      'Fire pit',
      'Parking space'
    ]
  ),
  (
    'Premium Camping',
    'Enhanced camping experience',
    49.99,
    ARRAY[
      'Large camping spot',
      'Electric hookup',
      'Water hookup',
      'Private fire pit',
      'Premium parking location',
      'Access to shower facilities'
    ]
  ),
  (
    'Basic Cabin',
    'Cozy cabin for a comfortable stay',
    89.99,
    ARRAY[
      'One bedroom cabin',
      'Basic kitchenette',
      'Private bathroom',
      'Air conditioning',
      'Queen bed',
      'Small porch'
    ]
  ),
  (
    'Deluxe Cabin',
    'Luxury cabin experience',
    149.99,
    ARRAY[
      'Two bedroom cabin',
      'Full kitchen',
      'Spacious living area',
      'Private bathroom with tub',
      'Climate control',
      'Large deck with furniture',
      'Premium lake view'
    ]
  );