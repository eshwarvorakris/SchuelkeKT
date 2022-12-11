const getPaginate=function(queryData,page=0,limit=15)
{
    const { count: total, rows: data } = queryData;
    const current_page = page ? +page : 1;
    const total_page = Math.ceil(total / limit);
  
    return { data,meta:{total,current_page,total_page,from:current_page*limit,to:(current_page*limit)+limit} };
}
module.exports={getPaginate}