![NOMAD BNB Logo](https://res.cloudinary.com/dthxhulp6/image/upload/v1714687868/nomad-og-1800_copy_e2disu.png)

## NOMAD BNB

Nomad BNB is a simple Airbnb clone built with Next.js, server actions, Prisma, and MongoDB.

**Features:**

- User authentication and authorization
- Listing creation and management
- Booking functionality
- Search and filtering capabilities
- User profiles and reviews

**Tech Stack:**

- **Frontend:** Next.js
- **Backend:** Next.js server actions
- **Database:** MongoDB
- **ORM:** Prisma
- **Additional Dependencies:** (e.g., NextAuth.js for authentication, Shadcn UI & Tailwind CSS for styling)

**Getting Started:**

1. **Prerequisites:** Ensure you have Node.js and npm (or yarn) installed on your system.
2. **Clone the Repository:**
   ```bash
   git clone https://github.com/ookino/nomad.git
   cd nomad-bnb
   ```
3. **Install Dependencies:**
   ```bash
   bun install # or npm  install
   ```
4. **Set Environment Variables:**
   - Create a `.env.local` file in the root directory and add the following variables:

- `DATABASE_URL`: Your MongoDB connection string
- `AUTH_SECRET`: Secret key for authentication
- `AUTH_RESEND_KEY`: Key for resending authentication emails
- `AUTH_GOOGLE_ID`: Google OAuth client ID
- `AUTH_GOOGLE_SECRET`: Google OAuth client secret
  - Any additional environment variables required by your chosen dependencies

5. **Run the Development Server:**
   ```bash
   bun run dev # or npm run dev
   ```
   Open `http://localhost:3000` in your browser to access the application.

**Further Development:**

- Explore the codebase to understand the implementation of various features.
- Refer to the documentation of Next.js, Prisma, and other dependencies for detailed information and usage guides.
- Customize the application according to your specific requirements and design preferences.

**Deployment:**

- You can deploy Nomad BNB to various platforms like Vercel, Netlify, or Heroku.
- Refer to the deployment documentation of your chosen platform for specific instructions.
