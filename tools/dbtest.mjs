import Sqlcipher from '@journeyapps/sqlcipher';
import fs from 'fs';
import {decrypt} from './encrypt.mjs';
const sqlcipher = Sqlcipher.verbose();

// class DataBase {
//   constructor({key,path}){
//     this.key = key;
        
//     this.db = new sqlcipher.Database(path);
//     this.initialized = this.init();
//   }
  
//   async init(){
//     const db = this.db();
//     return new Promise((resolve,reject)=>{
//       db.serialize(()=>{
//         // Required to open a database created with SQLCipher 3.x
//         db.run("PRAGMA cipher_compatibility = 3");
//         db.run(`PRAGMA key = "x'${key}'"`);
//         db.run();

//      });
//     });
//   }

//   close(){
//     this.db.close();
//   }
// }


(async()=>{
  const passtxt = await fs.promises.readFile('../keys/sql/pass-phrase.txt','utf-8');
  const key = decrypt(passtxt);
  const db = new sqlcipher.Database('test.db');

  await new Promise((resolve,reject)=>{
    db.serialize(()=> {
      // Required to open a database created with SQLCipher 3.x
      db.run("PRAGMA cipher_compatibility = 3");
      db.run(`PRAGMA key = "x'${key}'"`);
      db.run(`drop table if exists user;`)
      db.run("CREATE TABLE user (info TEXT)");
    
      var stmt = db.prepare("INSERT INTO user VALUES (?)");
      for (var i = 0; i < 10; i++) {
          stmt.run("Ipsum " + i);
      }
      stmt.finalize();
    
      db.each("SELECT rowid AS id, info FROM user", function(err, row) {
          console.log(row.id + ": " + row.info);
      });
   },()=>resolve());
   db.close();
  });
  console.log('db.close');
})();
