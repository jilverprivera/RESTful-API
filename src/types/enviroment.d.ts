export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URL: string;
      MONGODB_URL_TEST: string;
      ACCESS_TOKEN_SECRET_SEED: string;
      REFRESH_TOKEN_SECRET_SEED: string;
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_CLOUD_API_KEY: number;
      CLOUDINARY_CLOUD_API_SECRET: string;
      ENV: "test" | "dev" | "prod";
    }
  }
}
