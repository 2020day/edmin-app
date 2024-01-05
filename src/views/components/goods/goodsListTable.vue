<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="pagination"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text, scope">
      <a-button @click="editGoods(scope)">编辑</a-button>
      <a-button type="danger" @click="removeGoods(scope)">删除</a-button>
    </div>
  </a-table>
</template>
<script>
import api from '@/api/getGoodsDate';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc ',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryNmae',
    key: 'category',
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: '限制购买量',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: '200px',
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
      goodsList: [],
      searchForm: {},
      // 分页配置
      pagination: {
        current: 1,
        pageSize: 5,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        showQuickJumper: true,
        total: 0,
      },
      // 从类目页面得到的数据
      categoryObj: {},
    };
  },
  created() {
    this.getTableDate();
  },
  methods: {
    // 渲染商品列表页面
    async getTableDate() {
      const data = await api.goodsDate({
        page: this.pagination.current,
        size: this.pagination.pageSize,
        ...this.searchForm,
      });
      this.pagination.total = data.data.data.total;
      this.goodsList = data.data.data.data.map((item) => ({
        ...item,
        categoryNmae: this.categoryObj[item.category].name,
      }));
    },
    // 页码改变时调用函数
    changePage(pagination) {
      this.pagination = pagination;
      this.getTableDate();
    },
    // 修改商品按钮事件
    editGoods(scope) {
      this.$router.push({
        name: 'editGoods',
        params: {
          id: scope.id,
        },
      });
    },
    // 删除商品按钮事件
    removeGoods(scope) {
      this.$confirm({
        title: `确定删除${scope.title}吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk: async () => {
          const data = await api.remove(scope.id);
          if (data.status !== 200) {
            return this.$message.error('删除失败');
          }
          this.$message.success('删除成功');
          this.getTableDate();
          return true;
        },
        onCancel() {
          console.log(scope.id);
        },
      });
    },
  },
  mounted() {
    // 监听搜索页面激发的事件
    this.bus.$on('getSearchForm', (form) => {
      this.searchForm = form;
      this.getTableDate();
    });
    // 从类目页面得到categoryObj
    this.bus.$on('getCategoryObj', (categoryObj) => {
      this.categoryObj = categoryObj;
    });
  },
  computed: {
    // 处理数据，因为数据本身没有key值，会报错
    tableData() {
      return this.goodsList.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
};
</script>
