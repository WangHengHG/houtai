import request from '@/utils/request';

//sku模块
export const reqSkuList = (page, limit)=> request({
    url: `/admin/product/list/${page}/${limit}`,
    method: 'get'
})

//sku上架
export const reqOnSale = ()=> request({
    url:`/admin/product/onSale/${skuId} `,
    method: 'get'
})

//sku下架
export const reqCancelSale = ()=> request({
    url:`/admin/product/cancelSale/${skuId} `,
    method: 'get'
})