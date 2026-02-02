/// <reference types="vite/client" />

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.glb' {
  const src: string;
  export default src;
}
declare module '*.gltf' {
  const src: string;
  export default src;
}
declare module '*.glb?url' {
  const src: string;
  export default src;
}
declare module '*.gltf?url' {
  const src: string;
  export default src;
}