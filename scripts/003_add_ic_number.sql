-- Add IC number to user profiles
ALTER TABLE user_profiles
ADD COLUMN ic_number VARCHAR(12) UNIQUE,
ADD COLUMN nfc_verified BOOLEAN DEFAULT false,
ADD COLUMN biometric_enabled BOOLEAN DEFAULT false;

-- Create index for IC number lookups
CREATE INDEX idx_user_profiles_ic_number ON user_profiles(ic_number);

-- Add comment
COMMENT ON COLUMN user_profiles.ic_number IS 'Malaysian Identity Card (IC) number';
COMMENT ON COLUMN user_profiles.nfc_verified IS 'Whether the IC card has been verified via NFC';
COMMENT ON COLUMN user_profiles.biometric_enabled IS 'Whether biometric authentication is enabled';
