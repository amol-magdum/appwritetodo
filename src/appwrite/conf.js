const conf ={
    appwriteurl:String(import.meta.env.VITE_APPWRITE_ENDPOINT_URL),
    appwriteprojectid:String(import.meta.env.VITE_APPWRITE_ACCOUNT_ID),
    appwritedatabaseid:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionid:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
}

export default conf;