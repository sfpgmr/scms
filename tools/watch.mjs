import watcher from 'node-watch';
import {exec} from 'child_process';

watcher('./src',{recursive:true},()=>{
  console.log('make');
  exec('make',(error,stdout,stderr)=>{
    if(error){
      throw error;
    } else {
      console.log(stdout);
    }
  });
})