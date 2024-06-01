import {Client, Account, Databases} from 'appwrite'
import conf from './conf'
import { v4 as uuid } from "uuid";

const client = new Client();
client.setEndpoint(conf.appwriteurl)
.setProject(conf.appwriteprojectid)

export const account = new Account(client);


/// database
export const database = new Databases(client, conf.appwritedatabaseid)

///create document