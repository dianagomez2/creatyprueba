CREATE TABLE public.mentor_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 40),
  simultaneous_ventures text NOT NULL CHECK (simultaneous_ventures IN ('1-5', '6-10', '11-15', 'Más de 15')),
  mentorship_mode text NOT NULL CHECK (mentorship_mode IN ('Por cuenta propia', 'A través de una incubadora, aceleradora o programa', 'Como parte de una red de mentores', 'Desde una empresa de consultoría o mentoría', 'Otro')),
  professional_role text NOT NULL CHECK (professional_role IN ('Es mi actividad principal', 'Es una actividad complementaria frecuente', 'Mentoreo ocasionalmente')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.mentor_waitlist TO anon, authenticated;
GRANT ALL ON public.mentor_waitlist TO service_role;
ALTER TABLE public.mentor_waitlist ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register for the mentor waitlist"
ON public.mentor_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (true);