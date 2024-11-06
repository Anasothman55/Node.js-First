import mongodb from 'mongodb'
import { MongoClient } from 'mongodb'

let _db;
const uri = "mongodb://localhost:27017/shop";
//const uri = "mongodb+srv://AnasAS:pandoraherts@node-compleate.x0dxl.mongodb.net/shop?retryWrites=true&w=majority&appName=node-compleate";
const mongoConnect  = (callback)=>{
  MongoClient.connect(uri)
    .then((connections)=>{
      console.log('connections')
      _db = connections.db()
      callback()
    })
    .catch(err=>{
      console.log(err)
      throw err
    })
}

const getDB=() =>{
  if(_db){
    return _db
  }
  throw 'No database found!'
}

export {getDB, mongoConnect }

