-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users profile table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  emergency_contact TEXT,
  emergency_phone TEXT,
  accessibility_preferences JSONB DEFAULT '{"highContrast": false, "voiceEnabled": true, "fontSize": "medium", "screenReader": true}'::JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  sort_order INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES public.categories(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  document_type TEXT NOT NULL, -- 'passport', 'license', 'certificate', etc.
  document_number TEXT,
  issue_date DATE,
  expiry_date DATE,
  issuing_authority TEXT,
  storage_location TEXT, -- physical location
  file_url TEXT, -- if uploaded digitally
  notes TEXT,
  reminder_enabled BOOLEAN DEFAULT false,
  reminder_days_before INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Finance records table
CREATE TABLE IF NOT EXISTS public.finance_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL, -- 'bank_account', 'credit_card', 'investment', 'loan', etc.
  institution_name TEXT NOT NULL,
  account_number TEXT,
  account_holder TEXT,
  balance DECIMAL(15, 2),
  currency TEXT DEFAULT 'GBP',
  interest_rate DECIMAL(5, 2),
  maturity_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vehicle records table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_type TEXT NOT NULL, -- 'car', 'motorcycle', 'van', etc.
  make TEXT,
  model TEXT,
  year INTEGER,
  registration_number TEXT,
  vin TEXT,
  insurance_company TEXT,
  insurance_policy_number TEXT,
  insurance_expiry DATE,
  mot_expiry DATE,
  tax_expiry DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Family records table
CREATE TABLE IF NOT EXISTS public.family_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  relation_type TEXT NOT NULL, -- 'spouse', 'child', 'parent', 'sibling', etc.
  full_name TEXT NOT NULL,
  date_of_birth DATE,
  phone TEXT,
  email TEXT,
  address TEXT,
  medical_info TEXT,
  allergies TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Employment records table
CREATE TABLE IF NOT EXISTS public.employment_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL, -- 'employment', 'education', 'qualification', etc.
  organization_name TEXT NOT NULL,
  position_title TEXT,
  start_date DATE,
  end_date DATE,
  qualification_name TEXT,
  grade_achieved TEXT,
  certificate_number TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Property records table
CREATE TABLE IF NOT EXISTS public.property_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_type TEXT NOT NULL, -- 'owned', 'rented', etc.
  address TEXT NOT NULL,
  postcode TEXT,
  purchase_date DATE,
  purchase_price DECIMAL(15, 2),
  current_value DECIMAL(15, 2),
  mortgage_provider TEXT,
  mortgage_account_number TEXT,
  mortgage_balance DECIMAL(15, 2),
  landlord_name TEXT,
  landlord_phone TEXT,
  rent_amount DECIMAL(10, 2),
  lease_start_date DATE,
  lease_end_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reminders table
CREATE TABLE IF NOT EXISTS public.reminders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  document_id UUID REFERENCES public.documents(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  is_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Voice commands log table (for analytics and improvement)
CREATE TABLE IF NOT EXISTS public.voice_commands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  command_text TEXT NOT NULL,
  intent TEXT,
  success BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.family_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_commands ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- RLS Policies for categories (public read, admin write)
CREATE POLICY "categories_select_all" ON public.categories FOR SELECT USING (true);

-- RLS Policies for documents
CREATE POLICY "documents_select_own" ON public.documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "documents_insert_own" ON public.documents FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "documents_update_own" ON public.documents FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "documents_delete_own" ON public.documents FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for finance_records
CREATE POLICY "finance_select_own" ON public.finance_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "finance_insert_own" ON public.finance_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "finance_update_own" ON public.finance_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "finance_delete_own" ON public.finance_records FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for vehicles
CREATE POLICY "vehicles_select_own" ON public.vehicles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "vehicles_insert_own" ON public.vehicles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "vehicles_update_own" ON public.vehicles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "vehicles_delete_own" ON public.vehicles FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for family_records
CREATE POLICY "family_select_own" ON public.family_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "family_insert_own" ON public.family_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "family_update_own" ON public.family_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "family_delete_own" ON public.family_records FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for employment_records
CREATE POLICY "employment_select_own" ON public.employment_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "employment_insert_own" ON public.employment_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "employment_update_own" ON public.employment_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "employment_delete_own" ON public.employment_records FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for property_records
CREATE POLICY "property_select_own" ON public.property_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "property_insert_own" ON public.property_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "property_update_own" ON public.property_records FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "property_delete_own" ON public.property_records FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for reminders
CREATE POLICY "reminders_select_own" ON public.reminders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "reminders_insert_own" ON public.reminders FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reminders_update_own" ON public.reminders FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "reminders_delete_own" ON public.reminders FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for voice_commands
CREATE POLICY "voice_select_own" ON public.voice_commands FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "voice_insert_own" ON public.voice_commands FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'full_name', new.email)
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN new;
END;
$$;

-- Create trigger for new user profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON public.documents
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_finance_updated_at BEFORE UPDATE ON public.finance_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_family_updated_at BEFORE UPDATE ON public.family_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_employment_updated_at BEFORE UPDATE ON public.employment_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_property_updated_at BEFORE UPDATE ON public.property_records
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();
