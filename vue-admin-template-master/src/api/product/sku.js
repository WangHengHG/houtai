import request from '@/utils/request';

//sku模块
export const reqSkuList = (page, limit)=> request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
})

//sku上架
export const reqOnSale = (skuId)=> request({
    url:`/admin/product/onSale/${skuId} `,
    method: 'get'
})

//sku下架
export const reqCancelSale = (skuId)=> request({
    url:`/admin/product/cancelSale/${skuId} `,
    method: 'get'
})

//获取sku详情的接口
export const reqSkuById = (skuId)=> request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: 'get'
})