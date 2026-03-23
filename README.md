# HydroGate (Automated Floodgate and Monitoring System)

**HydroGate** is a modern, minimal, and premium mobile/web application for real-time flood monitoring and automated gate control.

## ✨ Key Features
- **Premium UX/UI**: High-end minimal design with dark mode and vibrant accent colors.
- **Modern Navigation**: Full-screen **Swipe Gestures** to move between Alerts, Monitoring, and Weather.
- **Fluid Transitions**: Smooth **Slide-and-Fade** animations for all screen transitions.
- **Startup Resilience**: Robust initialization system with branded loading and error handling (no more black screens).
- **Smart Monitoring**: Color-coded gauge and real-time status indicators (CRITICAL, CAUTION, SAFE).
- **AI Integration**: Built-in HydroGate Chatbot for real-time data analysis and weather insights.

## 🛠️ Project Structure
- `lib/`: Dart source code (Clean Architecture patterns).
- `assets/`: Branded HydroGate assets and icons.
- `android/`, `ios/`, `web/`: Platform-specific configurations.

## 🚀 Getting Started

### Setup
1. Clone the repository.
2. Run `flutter pub get` and `flutter pub run flutter_launcher_icons`.
3. Configure Firebase (Mandatory for teammates):
   ```powershell
   flutterfire configure --project=afwms-d3141
   ```
4. Create a `.env` file in the root with your API keys (OpenWeatherMap & Gemini).

### Running & Building
- **Debug (Web/Desktop):** `flutter run`
- **Production (Android APK):**
  1. Ensure you have the `upload-keystore.jks` and `key.properties` configured.
  2. Run the production build command:
     ```powershell
     flutter build apk --release
     ```

## 🔒 Firebase Security
Ensure your **SHA-1** and **SHA-256** fingerprints are registered in the Firebase Console to enable production authentication and Google Sign-In features.

---

## 👥 Group Members
- **Abrazado**, King Albuen C.
- **Catapang**, Sean Rikcel
- **Day**, Isaac J.
- **Francisco**, Lian Yeorgi
- **Malonzo**, Jed Gabriel G.
