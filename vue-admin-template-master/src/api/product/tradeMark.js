// 这个模块主要获取的是品牌管理数据的模块
import request from '@/utils/request'
//获取品牌列表的接口
////admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: 'get'
})

//处理添加品牌的操作 /admin/product/baseTrademark/save post 携带品牌名称和logo
//切记, 对于新增的品牌, 给服务器传递的数据, 不需要传递ID, ID是由服务器生成的


//修改品牌的操作 /admin/product/baseTrademark/update put 携带id, 名称, logo
//切记: 对于修改某一个品牌的操作, 前端携带的参数需要带上id, 你需要告诉服务器你要修改的是哪一个品牌

export const reqAddOrUpdateTradeMark = (tradeMark)=> {
    //带给服务器的数据携带id--修改
    if(tradeMark.id){
        return request({
            url: '/admin/product/baseTrademark/update',
            method: 'put',
            data: tradeMark
        })
    }else{
        //新增品牌
        return request({
            url: '/admin/product/baseTrademark/save',
            method: 'post',
            data: tradeMark
        })
    }
}

//删除品牌的接口
export const reqDeleteTradeMark = (id)=> request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: 'delete'
});
