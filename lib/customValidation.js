const { QueryTypes } = require("sequelize");
const sequelize = require("./dbConnection");

const unique=async function(name,value,params){
const records=await sequelize.query(`select count(*) from ${params[0]} where ${name}='${value}'`,{
    type: QueryTypes.RAW
 });   
 //console.log(name,value,params);   
 console.log(records);   
return false;
};
module.exports={unique};