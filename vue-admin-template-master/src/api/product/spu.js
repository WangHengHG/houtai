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
export const reqTradeMarkList = ()=> request({
    url:'/admin/product/baseTrademark/getTrademarkList',
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