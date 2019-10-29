import './header.scss';

import React, {useState} from 'react';

import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler} from 'reactstrap';
import LoadingBar from 'react-redux-loading-bar';

import {Brand} from './header-components';
import {AdminMenu, EntitiesMenu,} from '../menus';

export interface IHeaderProps {
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const Header = (props: IHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (
    <div id="app-header">
      {renderDevRibbon()}
      <LoadingBar className="loading-bar"/>
      <Navbar dark expand="sm" fixed="top" className="jh-navbar">
        <NavbarToggler aria-label="Menu" onClick={toggleMenu}/>
        <Brand/>
        <Collapse isOpen={menuOpen} navbar>
          <Nav id="header-tabs" className="ml-auto" navbar>
            {/* <Home />*/}
            {/* <EntitiesMenu/>
            <AdminMenu showSwagger={props.isSwaggerEnabled} showDatabase={!props.isInProduction}/>*/}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
