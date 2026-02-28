# 🔗 URL Shortener App

Hey there! 👋 This is a cool little app that lets you shorten those long, ugly URLs into short, shareable links. Think bit.ly but built by you!

Not only that, but you can see exactly how many times people clicked your links, where they came from (IP addresses), and when they clicked - all in a nice analytics dashboard.

## 🎯 What Can You Do?

- **Shorten URLs** - Turn `https://www.example.com/some/really/long/path` into something like `abc123`
- **Track Clicks** - See exactly how many people clicked your short link
- **View Analytics** - Know when people clicked and from where (their IP)
- **Create an Account** - Keep all your links safe with login/password
- **Don't Get Spammed** - We limit how many links you can create to prevent abuse (5 per minute)

## 💻 What's Under the Hood?

**Backend**

- Node.js + Express (the server stuff)
- MongoDB (where we save all the data)
- JWT (keeps you logged in securely)

**Frontend**

- React (the pretty interface)
- Tailwind CSS (makes it look nice)
- Vite (super fast development)

## 📂 How It's Organized

```
url_shortener_app/
├── backend/               ← The brain of the operation
│   ├── controllers/      ← Logic for logins & URL stuff
│   ├── models/           ← How data is shaped
│   ├── routes/           ← The endpoints
│   └── middleware/       ← Security & limits
└── frontend/             ← The pretty face
    └── src/
        ├── pages/        ← Login, Dashboard, Analytics
        ├── components/   ← Reusable parts
        └── context/      ← Shared state
```

## 🚀 Let's Get Started

### Stuff You Need First

- Node.js (grab it from nodejs.org if you don't have it)
- MongoDB (either local or use MongoDB Atlas cloud - it's free!)
- A text editor (VS Code is great)

### Setting Up the Backend

1. Pop open your terminal and run:

```bash
cd backend
npm install
```

2. Create a file called `.env` in the `backend` folder with these details:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/url_shortener
BASE_URL=http://localhost:5000
JWT_SECRET=pick_any_random_secret_here_like_abc123xyz
BCRYPT_SALT_ROUNDS=10
```

**New to MongoDB?**

- Just install it locally, or
- Sign up at mongodb.com/cloud/atlas for free cloud database

3. Start the server:

```bash
npm run dev
```

You should see something like "Server running on port 5000" ✅

### Setting Up the Frontend

1. In a new terminal:

```bash
cd frontend
npm install
```

2. Create a `.env.local` file:

```env
VITE_BASE_URL=http://localhost:5000/api
```

3. Start it up:

```bash
npm run dev
```

Boom! 🎉 Visit `http://localhost:5173` in your browser

## 🎮 How to Use It

### First Time?

1. **Sign Up** - Create an account with your email and password
2. **Log In** - Enter those credentials
3. **Dashboard** - You'll see a form to shorten URLs

### Creating a Short Link

1. Paste your long URL (like `https://www.google.com` - must start with `http://` or `https://`)
2. Click "Shorten"
3. Boom! Get your short link
4. Share it anywhere!

### Checking Who Clicked

1. Click "Analytics" in the top menu
2. Enter the short code (the part after the last `/`)
3. See how many times it was clicked + all the details

## 📊 The API (For Developers)

Not interested? Skip this part! 😄

### Making an Account

**Sign Up**

```
POST /api/auth/register
Body: { email, password, name }
```

**Log In**

```
POST /api/auth/login
Body: { email, password }
Returns: { token: "your-jwt-token" }
```

### Doing Stuff with URLs

**Create Short Link**

```
POST /api/url/shorten
Headers: Authorization: Bearer YOUR_TOKEN
Body: { originalUrl: "https://example.com" }
```

**View Analytics**

```
GET /api/url/analytics/abc123
Headers: Authorization: Bearer YOUR_TOKEN
Returns: { totalClicks: 42, clickHistory: [...] }
```

**Use a Short Link** (anyone can do this)

```
GET /api/url/abc123
→ Redirects you to the original URL
→ Records the click automatically
```

## ⏱️ Rate Limiting (The Speed Bumps)

We don't let people spam our system, so there's a rule:

- **Max 5 shortened URLs per minute per person**
- If you hit the limit, just wait a bit and try again

## 🔓 Security Stuff

Your login info is protected with:

- **Password hashing** - Your passwords are scrambled, not stored plain text
- **JWT tokens** - Like a temporary badge that proves you're logged in
- **Token expiration** - Your badge expires after 1 day for safety

So don't worry - your data is safe with us! 🔒

## 🐛 Something Broken?

### Backend won't start?

**"Can't connect to MongoDB"**

- Make sure MongoDB is running: `mongod`
- Check your `MONGO_URI` is correct
- Using MongoDB Atlas? Whitelist your IP address

**"PORT 5000 already in use"**

- Change the PORT in `.env` to something like 5001
- Or close whatever app is using it

### Frontend looks weird?

**"Invalid token error"**

- Try logging out and back in
- Or clear your browser cache (Ctrl+Shift+Delete)

**"Can't reach the API"**

- Make sure the backend is running
- Check `VITE_BASE_URL` matches your backend URL

**"Pages won't load"**

- Developer tools (F12) → Console tab
- See what error it says
- Google it! Probably just a small config thing

## 💡 Cool Things You Can Do

- Share your short links on social media
- Track viral content with real-time click analytics
- See where your traffic comes from (by IP)
- Create unlimited links (well, up to 5 per minute!)

## 🎓 What You'll Learn

If you work with this code, you'll see:

- How to build a REST API
- Database + data models
- Authentication & security
- Frontend-backend communication
- Routing & middleware
- Error handling

Perfect for learning full-stack development! 📚

## 📝 Quick Command Reference

```bash
# Backend
cd backend && npm install
npm run dev                    # Start server

# Frontend
cd frontend && npm install
npm run dev                    # Start development server
npm run build                  # Build for production
```

## ❓ FAQ

**Q: Can I use custom short codes?**
A: Not in this version - they're auto-generated. Future feature, maybe! 😄

**Q: Is there a limit on how many links I can create?**
A: No daily limit! Just 5 per minute to prevent spam.

**Q: Can others access my links' analytics?**
A: Nope! Only you (when logged in) can see your own analytics.

**Q: My IP shows as `::1` - is that normal?**
A: Yep! That's the localhost IP when you're testing locally. Real IPs show in production.

## 🤝 Found a Bug?

Feel free to:

1. Check if it's already listed above
2. Clear your browser cache and try again
3. Restart both servers
4. If still broken, check the browser console (F12) for details

## 📧 Questions?

Built with ❤️ as a full-stack learning project.

---

**Happy shortening!** 🎉

_Last updated: February 28, 2026_
