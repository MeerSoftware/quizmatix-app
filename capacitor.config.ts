import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.meersoftware.quizmatix',
    appName: 'Quizmatix',
    webDir: 'out',
    server: {
        androidScheme: 'https'
    }
};

export default config;
