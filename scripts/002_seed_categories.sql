-- Insert default categories
INSERT INTO public.categories (name, description, icon, sort_order) VALUES
  ('Personal', 'Personal identification documents and records', 'user', 1),
  ('Finance', 'Banking, investments, and financial records', 'pound-sterling', 2),
  ('Vehicle & Driving Licence', 'Vehicle registrations, insurance, and driving documents', 'car', 3),
  ('Family', 'Family member information and records', 'users', 4),
  ('Employment & Education', 'Work history, qualifications, and educational records', 'briefcase', 5),
  ('Property', 'Property ownership, rental, and mortgage information', 'home', 6)
ON CONFLICT (name) DO NOTHING;
