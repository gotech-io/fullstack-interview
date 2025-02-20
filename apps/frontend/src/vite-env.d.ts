/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SHOW_DEV_TOOLS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
