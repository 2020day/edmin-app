// 渲染商品表格数据
import axios from '../axios';

export default {
  goodsDate(params) {
    return axios.get('/products/all', { params });
  },
  remove(id) {
    return axios.delete(`/products/${id}`);
  },
  // edit(){
  //   return axios.
  // }
};
