# Admin Dashboard Setup Guide

## Overview
This guide will help you set up the complete admin dashboard system for managing wedding invitation templates and hantaran items using Supabase as the backend.

## Prerequisites
- Node.js 18+ installed
- Supabase account
- Next.js project already initialized

## 1. Environment Configuration

### Create `.env.local` file
Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Authentication
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
JWT_SECRET=your-super-secret-jwt-key-here

# NextAuth Configuration (Optional)
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

### Get Supabase Credentials
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project or select existing one
3. Go to Settings > API
4. Copy the Project URL and anon/public key
5. Copy the service_role key (keep this secret!)

## 2. Database Setup

### Run the SQL Schema
Execute the SQL commands in `supabase-schema.sql` in your Supabase SQL Editor:

1. Go to Supabase Dashboard > SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Click "Run" to execute the schema

This will create:
- `templates` table for wedding invitation templates
- `hantaran` table for wedding hantaran items
- `admin_users` table for admin authentication
- Row Level Security policies
- Sample data

### Create Admin User
The schema includes a default admin user:
- **Email**: admin@example.com
- **Password**: admin123

To create additional admin users, use the Supabase dashboard or run:

```sql
INSERT INTO admin_users (email, password_hash, name, role, is_active)
VALUES (
  'your-email@example.com',
  '$2a$10$example_hashed_password',
  'Your Name',
  'admin',
  true
);
```

## 3. Install Dependencies

Install required packages:

```bash
npm install @supabase/supabase-js bcryptjs jsonwebtoken
npm install -D @types/bcryptjs @types/jsonwebtoken
```

## 4. Project Structure

The admin system includes these key files:

```
src/
├── app/
│   ├── admin/
│   │   ├── page.tsx              # Main dashboard
│   │   ├── login/
│   │   │   └── page.tsx          # Admin login
│   │   ├── templates/
│   │   │   └── page.tsx          # Templates management
│   │   └── hantaran/
│   │       └── page.tsx          # Hantaran management
│   └── api/
│       ├── auth/
│       │   └── admin/
│       │       └── route.ts      # Admin authentication
│       ├── templates/
│       │   ├── route.ts          # Templates CRUD API
│       │   └── [id]/
│       │       └── route.ts      # Single template API
│       └── hantaran/
│           ├── route.ts          # Hantaran CRUD API
│           └── [id]/
│               └── route.ts      # Single hantaran API
├── lib/
│   └── supabase.ts               # Supabase client configuration
└── middleware.ts                 # Route protection
```

## 5. Features

### Admin Dashboard
- **Statistics Overview**: Total templates, hantaran, and active items
- **Quick Actions**: Direct links to manage templates and hantaran
- **System Overview**: Recent activity and status

### Templates Management
- **CRUD Operations**: Create, read, update, delete templates
- **Search & Filter**: By title, category, and status
- **Status Toggle**: Activate/deactivate templates
- **Rich Form**: Title, category, price, description, features, image URL

### Hantaran Management
- **CRUD Operations**: Create, read, update, delete hantaran items
- **Search & Filter**: By name, category, and availability
- **Availability Toggle**: Mark items as available/unavailable
- **Rich Form**: Name, category, price, description, ingredients, image URL

### Authentication
- **Secure Login**: JWT-based authentication with HTTP-only cookies
- **Route Protection**: Middleware protects all admin routes
- **Auto Redirect**: Redirects authenticated users from login page

## 6. API Endpoints

### Authentication
- `POST /api/auth/admin` - Admin login
- `DELETE /api/auth/admin` - Admin logout

### Templates
- `GET /api/templates` - Get all templates (with pagination & filters)
- `POST /api/templates` - Create new template
- `GET /api/templates/[id]` - Get single template
- `PUT /api/templates/[id]` - Update template
- `DELETE /api/templates/[id]` - Delete template

### Hantaran
- `GET /api/hantaran` - Get all hantaran (with pagination & filters)
- `POST /api/hantaran` - Create new hantaran
- `GET /api/hantaran/[id]` - Get single hantaran
- `PUT /api/hantaran/[id]` - Update hantaran
- `DELETE /api/hantaran/[id]` - Delete hantaran

## 7. Usage

### Access Admin Dashboard
1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/admin/login`
3. Login with default credentials:
   - Email: admin@example.com
   - Password: admin123
4. You'll be redirected to the admin dashboard

### Managing Templates
1. From dashboard, click "Manage Templates"
2. Use the "Add Template" button to create new templates
3. Use search and filters to find specific templates
4. Click edit/delete icons to modify templates
5. Toggle status to activate/deactivate templates

### Managing Hantaran
1. From dashboard, click "Manage Hantaran"
2. Use the "Add Hantaran" button to create new items
3. Use search and filters to find specific items
4. Click edit/delete icons to modify items
5. Toggle availability to mark items as available/unavailable

## 8. Security Features

- **JWT Authentication**: Secure token-based authentication
- **HTTP-Only Cookies**: Tokens stored in secure cookies
- **Route Protection**: Middleware protects admin routes
- **Password Hashing**: Bcrypt for secure password storage
- **Row Level Security**: Supabase RLS policies
- **Input Validation**: Server-side validation for all inputs

## 9. Customization

### Adding New Fields
1. Update the database schema in Supabase
2. Update the TypeScript interfaces in `src/lib/supabase.ts`
3. Update the API routes to handle new fields
4. Update the frontend forms and displays

### Styling
The admin interface uses Tailwind CSS. Customize the styling by:
1. Modifying the Tailwind classes in components
2. Adding custom CSS if needed
3. Updating the color scheme in `tailwind.config.js`

### Adding New Admin Users
1. Hash the password using bcrypt
2. Insert into `admin_users` table via Supabase dashboard
3. Or create an admin user management interface

## 10. Deployment

### Environment Variables
Ensure all environment variables are set in your production environment:
- Supabase credentials
- JWT secret (use a strong, unique secret)
- Admin credentials

### Build and Deploy
```bash
npm run build
npm start
```

### Security Checklist
- [ ] Change default admin credentials
- [ ] Use strong JWT secret
- [ ] Enable HTTPS in production
- [ ] Set secure cookie flags
- [ ] Enable Supabase RLS policies
- [ ] Regularly update dependencies

## 11. Troubleshooting

### Common Issues

**Login not working**
- Check Supabase credentials in `.env.local`
- Verify admin user exists in database
- Check password hash is correct

**API errors**
- Check Supabase service role key
- Verify database tables exist
- Check RLS policies are configured

**Middleware issues**
- Verify JWT secret matches between auth and middleware
- Check cookie settings
- Ensure middleware.ts is in correct location

**Build errors**
- Install all required dependencies
- Check TypeScript types
- Verify import paths

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review Supabase documentation
3. Check Next.js documentation
4. Review the code comments for implementation details

---

**Note**: This is a development setup. For production, ensure you follow security best practices, use strong passwords, enable HTTPS, and regularly update dependencies.