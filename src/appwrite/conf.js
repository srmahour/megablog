import config from "../config/config";
import { Client, Databases, Query, Storage, ID } from "appwrite";

export class Services{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(config.appWriteUrl)
        .setProject(config.appWriteProjectID);

        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client)
        
    }

    // create post
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{

            return await this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )

        } catch(error){
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    // update post
    async updatePost(slug, {title, content, featuredImage, status}){

        try{

            return await this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    status,
                    featuredImage
                }
            )

        } catch(error){
            console.log("Appwrite service :: updatePost :: error", error)
        }
        
    }

    // Delete post
    async deletePost(slug){

        try{

            await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
            )

            return true;

        } catch(error){
            console.log("Appwrite service :: deletePost :: error", error);
            return false
        }
        
    }

    //Get post
    async getPost(slug){
        try{
           return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )
        } catch(error){
            console.log("Appwrite service :: getPost :: error", error);
        }
    }


     //List of posts
     async getPosts(queriesVar = [Query.equal("status", "active")]){
        try{

           return await this.databases.listDocuments(config.appWriteDatabaseID,config.appWriteCollectionID, queriesVar)

        } catch(error){
            console.log("Appwrite service :: getPosts :: error", error);
            return false
        }
    }

    //upload file
    async uploadFile(file){
        try{
            
            return await this.bucket.createFile(config.appWriteBucketID, ID.unique(), file)

        }catch(error){

            console.log("Appwrite service :: uploadFile :: error", error);
            return false

        }
    }
   
    //delete file
    async deleteFile(fileId){
        try{
            
            return await this.bucket.deleteFile(config.appWriteBucketID, fileId)

        }catch(error){

            console.log("Appwrite service :: deleteFile :: error", error);
            return false

        }
    }
    
    //delete file
    filePreview(fileId){
        try{
            
            return this.bucket.getFilePreview(config.appWriteBucketID, fileId, 300, 300)

        }catch(error){

            console.log("Appwrite service :: filePreview :: error", error);
            return false

        }
    }


}


const services = new Services();

export default services;