DROP POLICY IF EXISTS "Public read settings" ON public.site_settings;
CREATE POLICY "Admins read settings" ON public.site_settings FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
REVOKE SELECT ON public.site_settings FROM anon;
GRANT ALL ON public.site_settings TO service_role;