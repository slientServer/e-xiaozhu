import React from 'react';
import CurdComp from '../common/curdcomp';

function Projects(){
  const columns = [
    { title: '用户名', width: 200, dataIndex: 'username', key: 'username', fixed: 'left', sorter: true, editable: true },
    { title: '性别', dataIndex: 'gender', key: 'gender', sorter: true, filters: [
        { text: '男', value: 'male' },
        { text: '女', value: 'female' }
      ],
      render: text => text === 'male' ? '男' : '女'
    },
    { title: '手机', dataIndex: 'phone', sorter: true, editable: true},
    { title: '权限', dataIndex: 'role', sorter: true},
    { title: '邮箱', dataIndex: 'email', key: 'email'}
  ];
  const configuration={
    searchKey: 'username',
    tooltip: '请输入用户名...', 
    actions: ['add', 'delete'],
    url: '/api/v1/projects'
  };
  return <CurdComp columns={columns} configuration={configuration} />;
}

export default Projects;