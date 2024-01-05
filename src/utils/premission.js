// 存储角色权限
const roleToRoule = {
  coustomer: [
    { name: 'goods' },
    { name: 'goodsList' },
    { name: 'goodsAdd' },
    { name: 'editGoods' },
  ],
  admin: [
    { name: 'goods' },
    { name: 'goodsList' },
    { name: 'goodsAdd' },
    { name: 'editGoods' },
    { name: 'goodsCategrey' },
  ],
};

export default function getMenuRoute(role, routes) {
  const allowRoutesName = roleToRoule[role].map((item) => item.name);
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRoutesName.indexOf(r.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRoutesName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  // 返回所有有权限的数据
  return resultRoutes;
}
