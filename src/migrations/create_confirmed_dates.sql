
CREATE TABLE IF NOT EXISTS public.confirmed_dates (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    date_title TEXT NOT NULL,
    date_id TEXT NOT NULL,
    confirmed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
