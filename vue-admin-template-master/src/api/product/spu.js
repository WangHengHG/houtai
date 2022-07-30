import request from '@/utils/request';


//获取spu列表数据的接口
export const reqSpuList = (page, limit, category3Id) => request({
    url: `/admin/product/${page}/${limit}`,
    method: 'get',
    params: {category3Id}
});

//获取spu信息的接口
export const reqSpuInfo = (spuId) => request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get',
})

//获取到品牌的信息进行展示
export const reqTradeMarkList = (category3Id)=> request({
    url:`/admin/product/baseCategoryTrademark/findCurrentTrademarkList/${category3Id}`,
    method: 'get',
})

//获取spu图片的接口
export const reqSpuImageList = (spuId)=> request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get',
})

//获取平台的全部的销售属性 一共三个
export const reqBaseSaleAttrList = ()=> request({
    url: '/admin/product/baseSaleAttrList',
    method: 'get',
})

//修改spu或者添加spu  对于修改或者是添加, 携带给服务器的参数大致是一样的, 区别是携带的参数是否携带ID
export const reqAddOrUpdataSpu = (spuInfo)=> {
    //如果携带的参数带有id----修改spu
    if(spuInfo.id){
        return request({
            url: '/admin/product/updateSpuInfo',
            method:'post',
            data: spuInfo
        })
    } else{
        //携带参数不带ID
        return request({
            url: '/admin/product/saveSpuInfo',
            method:'post',
            data: spuInfo
        })
    }
}

//删除spu
export const reqDeleteSpu = (spuId)=> request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: 'delete'
})
