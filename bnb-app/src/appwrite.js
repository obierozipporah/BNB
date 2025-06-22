import { Client, Account, Databases, ID } from 'appwrite';

// This is the Appwrite SDK client object
export const client = new Client();

client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('birnes-bnb');                      // Your Project ID

// We create and export the services we need as named constants
export const account = new Account(client);
export const databases = new Databases(client);
export const AppwriteID = ID; 