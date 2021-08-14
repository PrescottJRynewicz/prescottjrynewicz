import { Db, MongoClient } from 'mongodb';
import {
  DbCollections,
  User,
  VerificationRequest,
} from '/generated/server';

// Connection URL
const url = process.env.MONGO_URI;
export const mongoClient = new MongoClient(url || '');

// Database Names

class MongoConnection {
  Database: Db = undefined as unknown as Db;

  _connectionPromise: Promise<MongoClient> =
    undefined as unknown as Promise<MongoClient>;

  constructor() {
    this._connectionPromise = mongoClient.connect();

    this._connectionPromise
      .then(() => {
        this.Database = mongoClient.db(process.env.DATABASE_NAME);
      })
      .catch((error) => {
        throw error;
      });
  }

  get connectionPromise() {
    return this._connectionPromise;
  }

  getCollection<DocumentType>(collectionName: DbCollections) {
    if (this.Database) {
      return this.Database.collection<DocumentType>(collectionName);
    }
    throw new Error('Mongo connection not initialized');
  }

  get Users() {
    return this.getCollection<User>(DbCollections.Users);
  }

  get VerificationRequests() {
    return this.getCollection<VerificationRequest>(
      DbCollections.VerificationRequests
    );
  }
}

export const Mongo = new MongoConnection();
