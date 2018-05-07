import React from 'react';
import { Breadcrumb } from 'antd';

function BreadcrumbComp(props) {
  const map = {
    'admin': '首页',
    'users': '用户中心',
    'projects': '项目管理'
  };
  const paths = props.history.location.pathname.split('/');
  const list=paths.filter((item)=> !!item).map((item) => {
    let itemPath= paths.slice(0, paths.indexOf(item)+1).join('/');
    return <Breadcrumb.Item key={itemPath}><a href={itemPath}>{map[item]}</a></Breadcrumb.Item>;
  });
  return   <Breadcrumb>
    {list}
  </Breadcrumb>;
}

export default BreadcrumbComp;