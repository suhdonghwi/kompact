/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly FIREBASE_API_KEY: string;
  readonly FIREBASE_PROJECT_ID: string;
  readonly FIREBASE_STORAGE_BUCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
