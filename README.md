# 🛡️ AegisApp Frontend

A React Native app built with Expo that works on **mobile** and **web**!

## 🏃‍♂️ **How to Run Our Project**

### **Prerequisites (One-time setup)**
```bash
# Make sure you have Node.js installed (version 18 or higher)
node --version

# Install Expo CLI globally
npm install -g @expo/cli

# Install EAS CLI for mobile builds
npm install -g eas-cli
```

### **🚀 Quick Start (5 minutes)**

#### **Step 1: Install Project Dependencies**
```bash
# Navigate to project folder
cd AegisApp_FE

# Install all required packages
npm install
```

#### **Step 2: Start Development Server**
```bash
# Start the Expo development server
npm start
```

**What happens:**
- Terminal shows a QR code
- Metro bundler starts (React Native's build tool)
- Your app is ready to test!

#### **Step 3: Choose How to Test**

**📱 On Your Phone (Easiest & Recommended):**
1. Download "Expo Go" app from App Store/Google Play
2. Make sure your phone and computer are on the same WiFi
3. Scan the QR code with Expo Go app
4. Your app opens on your phone! 🎉

**💻 On Your Computer:**
- Press `w` → Opens in web browser
- Press `a` → Opens in Android emulator (if installed)
- Press `i` → Opens in iOS simulator (if installed)

---

## 🔧 **Development Workflow**

### **Making Changes**
1. **Edit your code** in any file (e.g., `app/home/home.tsx`)
2. **Save the file** - changes auto-reload on your phone/browser
3. **See changes instantly** - no need to restart!

### **Hot Reload Features**
- ✅ **Code changes** → Auto-reload
- ✅ **Style changes** → Instant update
- ✅ **New screens** → Auto-add to navigation
- ✅ **Asset changes** → Refresh to see

---

## 📱 **Testing on Mobile**

### **Option 1: Real Phone with Expo Go (Recommended)**
```bash
npm start
# Scan QR code with Expo Go app
```

**Benefits:**
- Real device testing
- Camera, GPS, sensors work
- Performance is accurate
- Easy to test with others

### **Option 2: Build Real App File (APK)**
```bash
# Login to your Expo account first
eas login

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

## 🌐 **Testing on Web**

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

**Web Features:**
- ✅ Works in all modern browsers
- ✅ Responsive design
- ✅ Touch gestures work
- ✅ Keyboard navigation

---

## 🚀 **Deploy to Internet (Free Forever!)**

### **Web Deployment (Super Easy)**

**Vercel Deployment**
```bash
# Install Vercel
npm install -g vercel

# Deploy to internet
npm run deploy:vercel
```
✅ **Result**: Your app is live on the internet! 🌐

**Manual Deployment:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your `AegisApp_FE` repo
4. Click "Deploy"

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

## 🔄 **Auto-Deploy (Set Once, Deploy Forever)**

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
   - Every time you push code → Auto-builds web version
   - Your app is always live at `your-app.vercel.app`
   - Manual deployment: `npm run deploy:vercel`

---

## 📋 **Common Commands**

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

# Testing
npm run lint           # Check code quality
```

---

## 🛠️ **Troubleshooting**

### **"Expo Go not working"**
- Make sure your phone and computer are on same WiFi
- Try using tunnel mode: `npm start --tunnel`
- Check firewall settings

### **"Build failed"**
- Make sure you're logged in: `eas login`
- Check your internet connection
- Try again in 5 minutes
- Clear cache: `expo r -c`

### **"Web not loading"**
- Check if port 19006 is free
- Try `npm run build:web` then open `dist/index.html`
- Clear browser cache

### **"Mobile build taking forever"**
- Normal! First build takes 10-15 minutes
- Subsequent builds are faster
- Check EAS dashboard for progress

### **"npm install failed"**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

---


## 🎯 **What You Can Do**

✅ **Test on your phone** (Expo Go)  
✅ **Test on web browser**  
✅ **Build real Android app** (APK)  
✅ **Deploy web version** (Vercel)  
✅ **Auto-build on GitHub push**  
❌ **Publish to App Store** (requires $99/year)  



## 🎬 **Quick Demo**

```bash
# 1. Get the project running
git clone <your-repo>
cd AegisApp_FE
npm install
npm start

# 2. Test on phone
# Scan QR code with Expo Go

# 3. Test on web
# Press 'w' in terminal

# 4. Deploy to internet
npm run deploy:vercel
```

**🎉 You're all set! Your app works on mobile AND web!**
