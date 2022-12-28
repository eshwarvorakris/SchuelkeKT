const { QueryTypes } = require("sequelize");
const sequelize = require("./dbConnection");

const unique = async function(name,value,params){
 const counts=sequelize.query(`select count(*) from ${params[0]} where ${name}='${value}'`,{
    nest: false,
    type: QueryTypes.SELECT
  });   
 console.log(name,value,params);   
 console.log(counts,[]);   
return !counts;
};
module.exports={unique};