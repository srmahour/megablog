const config = {
    appWriteUrl:String(import.meta.env.VITE_SECURE_APPWRITE_URL),
    appWriteProjectID:String(import.meta.env.VITE_SECURE_APPWRITE_PROJECT_ID),
    appWriteDatabaseID:String(import.meta.env.VITE_SECURE_APPWRITE_DATABASE_ID),
    appWriteCollectionID:String(import.meta.env.VITE_SECURE_APPWRITE_COLLECTION_ID),
    appWriteBucketID:String(import.meta.env.VITE_SECURE_APPWRITE_BUCKET_ID),
}

export default config;