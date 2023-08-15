import {openDatabase} from 'react-native-sqlite-storage';

let db = openDatabase({name:'ContactDatabase.db'});

export const createTable = () => {
    db.transaction(txn => {
      txn.executeSql(
        'CREATE TABLE IF NOT EXISTS contacts (_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,mobile VARCHAR(10),name VARCHAR(255), landline VARCHAR(10),imagepath VARCHAR(255),favourite integer DEFAULT "0" )',
        [],
        (sqlTxn, res) => {
          console.log('table created successfully');
        },
        error => {
          console.log('error on creating table.... ', error);
        },
      );
    });
  };



export const insertContact=(mobile,name,landline,imagePath)=>
{
    db.transaction(txn=>
    {
      txn.executeSql(
        'INSERT INTO contacts(mobile,name,landline,imagepath,favourite) VALUES (?,?,?,?,?)',
        [mobile,name,landline,imagePath,0],
        (sqlTxn,res)=>{
          console.log('Insert successfully')
        },
        error=>{
            console.log('error on inserting.... ',error)
        }
      ); 
    }) 
}
export const deleteContact=(mobile)=>
{
    db.transaction(txn=>
    {
      txn.executeSql(
        'DELETE FROM contacts WHERE mobile=(?)',
        [mobile],
        (sqlTxn,res)=>{
          console.log('delete successfully')
        },
        error=>{
            console.log('error on inserting.... ',error)
        }
      ); 
    }) 
}

// export const getContactsById=(mobile)=>
// {
//   db.transaction(txn=>
//     {
//       txn.executeSql(
//         'SELECT * FROM contacts WHERE mobile=(?)',
//         [mobile],
//         (sqlTxn,res)=>{
//           console.log('Get successfully')
//         },
//         error=>{
//             console.log('error on inserting.... ',error)
//         }
//       ); 
//     }) 
// }

export const updateContact=(id,mobile,name,landline,imagePath)=>
{
    db.transaction(txn=>
    {
      txn.executeSql(
        'UPDATE contacts SET mobile=(?),name=(?),landline=(?),imagepath=(?) WHERE _id=(?)',
        [mobile,name,landline,imagePath,id],
        (sqlTxn,res)=>{
          console.log('upadte successfully')
        },
        error=>{
            console.log('error on inserting.... ',error)
        }
      ); 
    }) 
}

export const updateFavourite=(id,favourite)=>
{
  db.transaction(txn=>
    {
      txn.executeSql(
        'UPDATE contacts SET favourite=(?) WHERE _id=(?)',
        [favourite,id],
        (sqlTxn,res)=>{
          console.log('upadte successfully')
        },
        error=>{
            console.log('error on inserting.... ',error)
        }
      ); 
    }) 
}
 


