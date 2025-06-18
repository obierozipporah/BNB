    import { Client, Account, Databases } from 'appwrite';

    // Initialize the Appwrite Client
    const client = new Client();

    client
        .setEndpoint('https://fra.cloud.appwrite.io/v1') // Your API Endpoint from Appwrite console
        .setProject('birnes-bnb');          // Your project ID from Appwrite console

    // Initialize Appwrite services
    export const account = new Account(client);
    export const databases = new Databases(client);

    // You can export the client itself if needed elsewhere
    export default client;
    