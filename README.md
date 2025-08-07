# 🛡️ AegisApp Frontend

A React Native app built with Expo that works on **mobile** and **web**!

## 🚀 Quick Start (5 minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the App
```bash
npm start
```

### 3. Choose How to Test

**📱 On Your Phone (Easiest):**
1. Download "Expo Go" app from App Store/Google Play
2. Scan the QR code that appears in your terminal
3. Your app opens on your phone! 🎉

**💻 On Your Computer:**
- Press `w` → Opens in web browser
- Press `a` → Opens in Android emulator (if installed)
- Press `i` → Opens in iOS simulator (if installed)

---

## 📱 Testing on Mobile

### **Option 1: Real Phone (Recommended)**
```bash
npm start
# Scan QR code with Expo Go app
```

### **Option 2: Build Real App File**
```bash
# Build Android APK (takes 5-10 minutes)
npm run build:android

# Build iOS Simulator (takes 5-10 minutes)
npm run build:ios
```

**What happens:**
- Creates a real `.apk` file for Android
- You can share this APK with others
- iOS version only works on simulator (App Store requires paid account)

---

## 🌐 Testing on Web

### **Option 1: Local Development**
```bash
npm start
# Press 'w' to open in browser
```

### **Option 2: Build for Production**
```bash
npm run build:web
# Creates 'dist' folder with web files
```

---

## 🚀 Deploy to Internet (Free Forever!)

### **Web Deployment (Super Easy)**

**Option 1: Vercel (Recommended)**
```bash
# Install Vercel
npm install -g vercel

# Deploy to internet
npm run deploy:vercel
```
✅ **Result**: Your app is live on the internet! 🌐

**Option 2: Netlify**
```bash
# Install Netlify
npm install -g netlify-cli

# Deploy to internet
npm run deploy:netlify
```

### **Mobile Deployment**

**For Android:**
```bash
# Build APK
npm run build:android

# Download APK from EAS dashboard
# Share APK file with users
```

**For iOS:**
- ❌ Requires paid Apple Developer account ($99/year)
- ✅ Can only test on simulator for free

---

## 🔄 Auto-Deploy (Set Once, Deploy Forever)

### **Connect to GitHub + Vercel (Recommended)**

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "My awesome app"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your `AegisApp_FE` repo
   - Click "Deploy"

3. **Done!** 🎉
   - Every time you push code → Auto-deploys to web
   - Your app is always live at `your-app.vercel.app`

---

## 📋 Common Commands

```bash
# Development
npm start              # Start development server
npm run web            # Start web development
npm run android        # Start Android development
npm run ios            # Start iOS development

# Building
npm run build:web      # Build web version
npm run build:android  # Build Android APK
npm run build:ios      # Build iOS simulator

# Deploying
npm run deploy:vercel  # Deploy web to Vercel
npm run deploy:netlify # Deploy web to Netlify

# Testing
npm run lint           # Check code quality
```

---

## 🛠️ Troubleshooting

### **"Expo Go not working"**
- Make sure your phone and computer are on same WiFi
- Try using tunnel mode: `npm start --tunnel`

### **"Build failed"**
- Make sure you're logged in: `eas login`
- Check your internet connection
- Try again in 5 minutes

### **"Web not loading"**
- Check if port 19006 is free
- Try `npm run build:web` then open `web-build/index.html`

### **"Mobile build taking forever"**
- Normal! First build takes 10-15 minutes
- Subsequent builds are faster

---

## 📁 Project Structure

```
AegisApp_FE/
├── app/                 # Your app screens (routes)
├── components/          # Reusable components
├── assets/             # Images, fonts, etc.
├── constants/          # Colors, configs
├── hooks/              # Custom React hooks
└── package.json        # Dependencies & scripts
```

---

## 🎯 What You Can Do

✅ **Test on your phone** (Expo Go)  
✅ **Test on web browser**  
✅ **Build real Android app** (APK)  
✅ **Deploy web version** (Vercel/Netlify)  
✅ **Auto-deploy on GitHub push**  
❌ **Publish to App Store** (requires $99/year)  

---

## 🆘 Need Help?

1. **Check the logs** in your terminal
2. **Google the error message**
3. **Ask in Expo Discord**: [chat.expo.dev](https://chat.expo.dev)
4. **Check Expo docs**: [docs.expo.dev](https://docs.expo.dev)

---

**🎉 You're all set! Your app works on mobile AND web!**
