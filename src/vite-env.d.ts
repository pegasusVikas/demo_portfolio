/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_API: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }