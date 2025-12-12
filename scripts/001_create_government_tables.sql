-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  ic_number TEXT UNIQUE NOT NULL, -- Identity Card Number
  phone_number TEXT,
  email TEXT,
  date_of_birth DATE,
  address TEXT,
  profile_photo_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Personal Details
CREATE TABLE IF NOT EXISTS public.personal_details (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ic_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  gender TEXT CHECK (gender IN ('Male', 'Female')),
  date_of_birth DATE NOT NULL,
  place_of_birth TEXT,
  nationality TEXT DEFAULT 'Malaysian',
  race TEXT,
  religion TEXT,
  marital_status TEXT,
  blood_type TEXT,
  address TEXT,
  postcode TEXT,
  city TEXT,
  state TEXT,
  country TEXT DEFAULT 'Malaysia',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Finance/E-Wallet
CREATE TABLE IF NOT EXISTS public.finance_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_type TEXT DEFAULT 'e-wallet' CHECK (account_type IN ('e-wallet', 'bank', 'credit')),
  balance DECIMAL(12, 2) DEFAULT 0.00,
  currency TEXT DEFAULT 'MYR',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Finance Transactions
CREATE TABLE IF NOT EXISTS public.finance_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  account_id UUID REFERENCES public.finance_accounts(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('topup', 'payment', 'transfer', 'withdrawal')),
  amount DECIMAL(12, 2) NOT NULL,
  description TEXT,
  reference_number TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Driving License
CREATE TABLE IF NOT EXISTS public.driving_licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  license_number TEXT UNIQUE NOT NULL,
  license_class TEXT NOT NULL, -- B2, D, etc.
  issue_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  issuing_authority TEXT DEFAULT 'JPJ Malaysia',
  photo_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended', 'revoked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medical Cards
CREATE TABLE IF NOT EXISTS public.medical_cards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_type TEXT NOT NULL CHECK (card_type IN ('MySejahtera', 'Health Insurance', 'Medical Record')),
  card_number TEXT UNIQUE NOT NULL,
  provider TEXT, -- e.g., Ministry of Health, Insurance company
  issue_date DATE,
  expiry_date DATE,
  photo_url TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'expired', 'suspended')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medical Records
CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  record_type TEXT NOT NULL, -- Vaccination, Visit, Prescription, etc.
  date DATE NOT NULL,
  description TEXT,
  hospital_clinic TEXT,
  doctor_name TEXT,
  attachments JSONB, -- Array of file URLs
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Property/Utilities
CREATE TABLE IF NOT EXISTS public.properties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_type TEXT NOT NULL CHECK (property_type IN ('Residential', 'Commercial', 'Industrial')),
  address TEXT NOT NULL,
  postcode TEXT,
  city TEXT,
  state TEXT,
  ownership_status TEXT CHECK (ownership_status IN ('Owned', 'Rented', 'Mortgaged')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Utility Bills
CREATE TABLE IF NOT EXISTS public.utility_bills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
  utility_type TEXT NOT NULL CHECK (utility_type IN ('Electricity', 'Water', 'Gas', 'Internet', 'Phone')),
  provider TEXT NOT NULL, -- TNB, Air Selangor, etc.
  account_number TEXT NOT NULL,
  bill_amount DECIMAL(10, 2),
  due_date DATE,
  payment_status TEXT DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid', 'paid', 'overdue')),
  bill_month TEXT, -- e.g., "January 2025"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Employment Records
CREATE TABLE IF NOT EXISTS public.employment_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  employer_name TEXT NOT NULL,
  position TEXT NOT NULL,
  employment_type TEXT CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract', 'Self-employed')),
  start_date DATE NOT NULL,
  end_date DATE,
  is_current BOOLEAN DEFAULT FALSE,
  monthly_salary DECIMAL(10, 2),
  epf_number TEXT, -- EPF/KWSP number
  socso_number TEXT, -- SOCSO number
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Education Records
CREATE TABLE IF NOT EXISTS public.education_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  institution_name TEXT NOT NULL,
  qualification_level TEXT NOT NULL, -- SPM, STPM, Diploma, Degree, etc.
  field_of_study TEXT,
  start_date DATE,
  end_date DATE,
  certificate_url TEXT,
  cgpa_grade TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- KWSP/EPF Contributions
CREATE TABLE IF NOT EXISTS public.kwsp_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  epf_number TEXT NOT NULL,
  contribution_month TEXT NOT NULL, -- e.g., "January 2025"
  employee_contribution DECIMAL(10, 2) NOT NULL,
  employer_contribution DECIMAL(10, 2) NOT NULL,
  total_contribution DECIMAL(10, 2) GENERATED ALWAYS AS (employee_contribution + employer_contribution) STORED,
  balance DECIMAL(12, 2),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SOCSO Contributions
CREATE TABLE IF NOT EXISTS public.socso_contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  socso_number TEXT NOT NULL,
  contribution_month TEXT NOT NULL,
  employee_contribution DECIMAL(10, 2) NOT NULL,
  employer_contribution DECIMAL(10, 2) NOT NULL,
  total_contribution DECIMAL(10, 2) GENERATED ALWAYS AS (employee_contribution + employer_contribution) STORED,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_personal_details_user_id ON public.personal_details(user_id);
CREATE INDEX IF NOT EXISTS idx_finance_accounts_user_id ON public.finance_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_finance_transactions_user_id ON public.finance_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_driving_licenses_user_id ON public.driving_licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_cards_user_id ON public.medical_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_medical_records_user_id ON public.medical_records(user_id);
CREATE INDEX IF NOT EXISTS idx_properties_user_id ON public.properties(user_id);
CREATE INDEX IF NOT EXISTS idx_utility_bills_user_id ON public.utility_bills(user_id);
CREATE INDEX IF NOT EXISTS idx_employment_records_user_id ON public.employment_records(user_id);
CREATE INDEX IF NOT EXISTS idx_education_records_user_id ON public.education_records(user_id);
CREATE INDEX IF NOT EXISTS idx_kwsp_contributions_user_id ON public.kwsp_contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_socso_contributions_user_id ON public.socso_contributions(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.personal_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.finance_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.driving_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.utility_bills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employment_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kwsp_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.socso_contributions ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Users can only access their own data
CREATE POLICY "Users can view own profile" ON public.user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.user_profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own personal details" ON public.personal_details FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own personal details" ON public.personal_details FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own personal details" ON public.personal_details FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own finance accounts" ON public.finance_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own finance accounts" ON public.finance_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own finance accounts" ON public.finance_accounts FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own transactions" ON public.finance_transactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own transactions" ON public.finance_transactions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own driving license" ON public.driving_licenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own driving license" ON public.driving_licenses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own driving license" ON public.driving_licenses FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own medical cards" ON public.medical_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own medical cards" ON public.medical_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own medical cards" ON public.medical_cards FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own medical records" ON public.medical_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own medical records" ON public.medical_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own medical records" ON public.medical_records FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own properties" ON public.properties FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own properties" ON public.properties FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own properties" ON public.properties FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own utility bills" ON public.utility_bills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own utility bills" ON public.utility_bills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own utility bills" ON public.utility_bills FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own employment" ON public.employment_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own employment" ON public.employment_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own employment" ON public.employment_records FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own education" ON public.education_records FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own education" ON public.education_records FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own education" ON public.education_records FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own KWSP" ON public.kwsp_contributions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own KWSP" ON public.kwsp_contributions FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own SOCSO" ON public.socso_contributions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own SOCSO" ON public.socso_contributions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email, ic_number)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'ic_number', 'PENDING')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_personal_details_updated_at BEFORE UPDATE ON public.personal_details FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_finance_accounts_updated_at BEFORE UPDATE ON public.finance_accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_driving_licenses_updated_at BEFORE UPDATE ON public.driving_licenses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medical_cards_updated_at BEFORE UPDATE ON public.medical_cards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_medical_records_updated_at BEFORE UPDATE ON public.medical_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_utility_bills_updated_at BEFORE UPDATE ON public.utility_bills FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_employment_records_updated_at BEFORE UPDATE ON public.employment_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_education_records_updated_at BEFORE UPDATE ON public.education_records FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
