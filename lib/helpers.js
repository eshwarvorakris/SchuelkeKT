const getPaginate=function(queryData,page=0,limit=15)
{
    const { count: total, rows: data } = queryData;
    const current_page = page ? +page : 1;
    const total_page = Math.ceil(total / limit);
  
    return { data,meta:{total,current_page,total_page,from:((current_page-1)*limit)+1,to:(total<(current_page*limit))?total:(current_page*limit)} };
}
module.exports={getPaginate}