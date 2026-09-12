SUDIPSTORE SECURE BUILD

WHAT IS INCLUDED
- SudipStore storefront
- Your Diamond prices, Membership prices, Evo Access, and Level of pass
- Email/password Supabase authentication
- Customer account + My Orders page
- Orders saved as Pending
- Secure admin role
- Admin can see customer name/email, product, amount, payment reference and order time
- Admin can Approve or Decline orders
- Supabase Row Level Security (RLS) enforces database access; the admin page alone is not trusted

SETUP
1. Create a Supabase project.
2. Run supabase_schema.sql in the Supabase SQL Editor.
3. Enable Email/Password in Supabase Authentication.
4. Copy your project URL and PUBLIC publishable/anon key into config.js.
5. Create your own account on SudipStore.
6. In Supabase Authentication > Users, copy your user UUID.
7. Run the final UPDATE command shown at the bottom of supabase_schema.sql to give YOUR account the admin role.
8. Deploy the files to a static host with HTTPS.

IMPORTANT SECURITY
- Never place a service_role/secret key in config.js or any browser file.
- Do not use a hard-coded JavaScript password for admin access.
- The public frontend key is used with RLS policies.
- This build cannot verify whether a user-entered payment reference actually represents a real payment. For real automatic payment approval, connect a legitimate payment provider and verify payments server-side using its official webhook/API.
