import React from 'react';
import { Breadcrumb } from 'antd';

function BreadcrumbComp(props) {
  const map = {
    'admin': 'Home'
  };
  const paths = props.history.location.pathname.split('/');
  const list=paths.filter((item)=> !!item).map((item) => {
    let itemPath= paths.splice(0, paths.indexOf(34)+1).join('/');
    return <Breadcrumb.Item key={itemPath}><a href={itemPath}>{map[item]}</a></Breadcrumb.Item>;
  });
  return   <Breadcrumb>
    {list}
  </Breadcrumb>;
}

export default BreadcrumbComp;