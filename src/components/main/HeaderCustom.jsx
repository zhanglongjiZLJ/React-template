import React, { Component } from 'react';
import '../../App.css';
import { Menu, Icon , Badge } from 'antd';
import avater from '../../b1.jpg';
import screenfull from 'screenfull';
// const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class HeaderCustom extends Component {
  screenFull = () => {
        if (screenfull.enabled) {
            screenfull.request();
        }
  };
  render() {
    return (
            <div>
              <Icon
              className="trigger"
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggle}
            />
            <Menu
                mode="horizontal"
                style={{ lineHeight: '64px', float: 'right' }}
                onClick={this.menuClick}
            >
                <Menu.Item key="full" onClick={this.screenFull} >
                    <Icon type="arrows-alt" onClick={this.screenFull} />
                </Menu.Item>
                <Menu.Item key="1">
                    <Badge count={25} overflowCount={10} style={{marginLeft: 10}}>
                        <Icon type="notification" />
                    </Badge>
                </Menu.Item>
                <SubMenu key="2" title={<span className="avatar"><img src={avater} alt="头像" /><i className="on bottom b-white" /></span>}>
                    <MenuItemGroup title="用户中心">
                        <Menu.Item key="2-1">你好 - zlj</Menu.Item>
                        <Menu.Item key="2-2">个人信息</Menu.Item>
                        <Menu.Item key="2-3"><span >退出登录</span></Menu.Item>
                    </MenuItemGroup>
                    <MenuItemGroup title="设置中心">
                        <Menu.Item key="2-4">个人设置</Menu.Item>
                        <Menu.Item key="2-5">系统设置</Menu.Item>
                    </MenuItemGroup>
                </SubMenu>
            </Menu>
            <style>{`
                .ant-menu-submenu-horizontal > .ant-menu {
                    width: 120px;
                    left: -40px;
                }
            `}</style>
            </div>
    );
  }
}

export default HeaderCustom;
