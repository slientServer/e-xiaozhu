import React, { Component } from 'react';
import { Layout, Menu, Icon, Row, Col, Avatar, Badge } from 'antd';
import { connect } from 'react-redux';
import * as actions from '../../actions/admin';
import * as authActions from '../../actions/auth';
import BreadcrumbComp from '../common/breadcrumb';
const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class AdminLayout extends Component {
  constructor () {
    super();
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick = (evt) => {
    switch(evt.key){
      case 'log_out':
        this.props.logoutAction(this.props.history);
      break;
      case '/admin':
        this.props.history.push('/admin');
      break;
      case '/admin/users':
        this.props.history.push('/admin/users');
      break;
      default:
        this.props.history.push('/');
    }
  }

  render () {
    const user_photo="http://img5.duitang.com/uploads/item/201406/07/20140607132024_NHEjK.jpeg";
    const menu_list=[
      {'key': '/admin',
       'icon': 'home',
       'name': '首页'
      },
      {'key': '/admin/users',
       'icon': 'user',
       'name': '用户中心'
      }
    ].map((item) => <Menu.Item key={item.key}><Icon type={item.icon} /><span>{item.name}</span></Menu.Item>);

    return <Layout>
      <Sider trigger={null}
        collapsible
        collapsed={this.props.collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[this.props.history.location.pathname]} onClick={this.menuClick}>
          {menu_list}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Row gutter={16} justify="end" align="middle" type="flex">
            <Col span={1}>
              <Icon
                className="trigger"
                type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.props.toggleCollapsedAction}
              />
            </Col>
            <Col span={3} offset={20}>
              <Menu
                mode="horizontal"
                onClick={this.menuClick}
              >
                <SubMenu title={<Badge count="100"><Icon type="notification" /></Badge>}/>
                <SubMenu title={<Avatar src={user_photo} size="default">{this.props.username}</Avatar>}>
                  <MenuItemGroup title="用户中心">
                    <Menu.Item key="user_info">{this.props.username}</Menu.Item>
                    <Menu.Item key="log_out">登出</Menu.Item>
                  </MenuItemGroup>
                  <MenuItemGroup title="系统配置">
                    <Menu.Item key="person_config">个人配置</Menu.Item>
                    <Menu.Item key="system_config">系统配置</Menu.Item>
                  </MenuItemGroup>
                </SubMenu>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content style={{ margin: '24px 16px', padding: 24, background: '#fff'}}>
          <BreadcrumbComp history={this.props.history}/>
          { this.props.children }
        </Content>
      </Layout>      
    </Layout>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    fetching: state.commonReducer.fetching || false,
    collapsed: state.adminReducer.collapsed,
    username: state.authReducer && state.authReducer.auth && state.authReducer.auth.username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    toggleCollapsedAction: () => {
      dispatch(actions.toggleCollapsedAction());
    },
    logoutAction: (history) => {
      dispatch(authActions.logoutAction(history));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);