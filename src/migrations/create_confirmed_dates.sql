
CREATE TABLE IF NOT EXISTS public.confirmed_dates (
    id SERIAL PRIMARY KEY,
    user_name TEXT NOT NULL,
    date_title TEXT NOT NULL,
    date_id TEXT NOT NULL,
    secret_message TEXT,
    confirmed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable row-level security
ALTER TABLE public.confirmed_dates ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations
CREATE POLICY "Enable all operations for all users" ON public.confirmed_dates
    FOR ALL
    TO public
    USING (true)
    WITH CHECK (true);
