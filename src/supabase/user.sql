-- SignUP --
CREATE OR REPLACE FUNCTION public.sign_up(
    user_id UUID,
    email TEXT,
    password TEXT,
    full_name TEXT DEFAULT NULL,
    phone_number TEXT DEFAULT NULL,
    country_code TEXT,
    raw_number TEXT,
    gender TEXT DEFAULT NULL
  ) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE result JSONB;
BEGIN IF user_id IS NULL
OR email IS NULL
OR password IS NULL THEN RETURN jsonb_build_object(
  'success',
  false,
  'error',
  'Missing required fields'
);
END IF;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
INSERT INTO public.users (
    id,
    email,
    password,
    name,
    phonenumber,
    raw_number,
    country_code,
    gender,
    created_at
  )
VALUES (
    user_id,
    email,
    crypt(password, gen_salt('bf')),
    full_name,
    phone_number,
    raw_number,
    country_code,
    gender,
    NOW()
  )
RETURNING to_jsonb(public.users.*) INTO result;
RETURN jsonb_build_object('success', true, 'data', result);
EXCEPTION
WHEN unique_violation THEN RETURN jsonb_build_object('success', false, 'error', 'User already exists');
WHEN others THEN RETURN jsonb_build_object('success', false, 'error', SQLERRM);
END;
$$;
--LogIn--
CREATE OR REPLACE FUNCTION public.login_user(p_email TEXT, p_password TEXT) RETURNS JSONB AS $$
DECLARE user_record RECORD;
user_data JSONB;
password_match BOOLEAN;
BEGIN -- Get user by email
SELECT * INTO user_record
FROM users
WHERE email = p_email;
IF NOT FOUND THEN RETURN jsonb_build_object(
  'success',
  false,
  'error',
  'User not found',
  'status_code',
  404 -- Not Found
);
END IF;
-- Verify password using pgcrypto
password_match := (
  crypt(p_password, user_record.password) = user_record.password
);
IF password_match THEN IF user_record.is_verified THEN user_data := to_jsonb(user_record) - 'password';
RETURN jsonb_build_object(
  'success',
  true,
  'user',
  user_data,
  'status_code',
  200 -- OK
);
ELSE RETURN jsonb_build_object(
  'success',
  false,
  'error',
  'Profile needs verification',
  'data',
  jsonb_build_object(
    'id',
    user_record.id,
    'email',
    user_record.email
  ),
  'status_code',
  403 -- Forbidden
);
END IF;
ELSE RETURN jsonb_build_object(
  'success',
  false,
  'error',
  'Invalid password',
  'status_code',
  401 -- Unauthorized
);
END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
--reset-pass--
CREATE OR REPLACE FUNCTION public.reset_pass(p_email TEXT, p_password TEXT) RETURNS JSONB AS $$
DECLARE user_record RECORD;
password_match BOOLEAN;
BEGIN IF p_email IS NULL
OR p_password IS NULL THEN RETURN jsonb_build_object(
  'success',
  false,
  'error',
  'Missing required fields'
);
END IF;
CREATE EXTENSION IF NOT EXISTS pgcrypto;
SELECT * INTO user_record
FROM users
WHERE email = p_email;
IF NOT FOUND THEN RETURN jsonb_build_object(
  'success',
  false,
  'error',
  'User not found'
);
END IF;
password_match := (
  crypt(p_password, user_record.password) = user_record.password
);
IF password_match THEN RETURN jsonb_build_object(
  'success',
  false,
  'error',
  'Password cannot be the same as the old password'
);
END IF;
UPDATE users
SET password = crypt(p_password, gen_salt('bf'))
WHERE email = p_email;
RETURN jsonb_build_object(
  'success',
  true,
  "message",
  "Password has been changed successfully",
  'status_code',
  201
);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- Edit Profile --
CREATE OR REPLACE FUNCTION public.edit_profile(
    user_id UUID,
    user_name TEXT,
    country_cod TEXT,
    national_numbr TEXT,
    formatted_numbr TEXT,
    profile_image TEXT
  ) RETURNS JSONB AS $$
DECLARE user_profile RECORD;
BEGIN
UPDATE users
SET name = COALESCE(user_name, name),
  country_code = COALESCE(country_cod, country_code),
  national_number = COALESCE(national_numbr, national_number),
  formatted_number = COALESCE(formatted_numbr, formatted_number),
  profileImage = COALESCE(profile_image, profileImage)
WHERE id = user_id;
SELECT * INTO user_profile
FROM users
WHERE id = user_id;
RETURN to_jsonb(user_profile);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
-- user_info --
CREATE OR REPLACE FUNCTION get_user_info(user_id UUID) RETURNS JSONB LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE user_data RECORD;
BEGIN
SELECT * INTO user_data
FROM users
WHERE id = user_id;
RETURN to_jsonb(user_data);
END;
$$;