
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3832fe86590a49acb2200e102086d417',
  appName: 'auto-club-gestore',
  webDir: 'dist',
  server: {
    url: 'https://3832fe86-590a-49ac-b220-0e102086d417.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    buildOptions: {
      releaseType: 'APK'
    }
  }
};

export default config;
