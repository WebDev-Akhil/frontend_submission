import React from "react";
import styled, { css } from "styled-components";
import { NavLink as Link } from "react-router-dom";
import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchIcon from "../../images/search-icon-white.png";
import HumbergerIcon from "../../images/icons8-menu-24.png";
import "./index.scss";
export default class SideNavBar extends React.Component {
  state = {
    isOpen: false,
  };
  /* Write the necessary functions to show and hide the side bar on small devices */

  render() {
    const { isOpen } = this.state;

    return (
      <SideNavBarMain className="sidebar_main_head">
        <HumbergerButton
          className="flex humberger"
          onClick={() => {
            this.setState({
              isOpen: !this.state.isOpen,
            });
          }}
        >
          <img src={HumbergerIcon} alt="humberger-icon" />
          <SubTitle className="Pl-2">Discover</SubTitle>
        </HumbergerButton>
        <SideNavBarCont
          className={`side_nav_cont ${isOpen ? "visible" : "hidden"}`}
        >
          <SideNavMainLink className="menu_nav_link" to="/" exact>
            Wesley
            <NavIcon className="nav_icon">
              <img src={Arrow} alt="down-arrow" />
            </NavIcon>
          </SideNavMainLink>
          <SideNavMainLink
            className="menu_nav_link Pt-2 Pb-2"
            bg={"yellowishBg"}
            to="/discover"
          >
            Discover
            <NavIcon className="nav_icon">
              <img src={SearchIcon} alt="down-arrow" />
            </NavIcon>
          </SideNavMainLink>
          <SideNavHeader className="header_chunk Pt-2">
            <HeaderText>Watched</HeaderText>
            <SideNavLinks className={`flex flex-column Pt-2 sideNav`}>
              <NavLink className="Pt-1 Pb-1 " to="/watched/movies">
                Movies
              </NavLink>
              <NavLink className="Pt-1 Pb-1 " to="/watched/tv-shows">
                Tv Shows
              </NavLink>
            </SideNavLinks>
          </SideNavHeader>

          <SideNavHeader className="header_chunk">
            <HeaderText className="Pt-3 saved-title">Saved</HeaderText>
            <SideNavLinks className={`flex flex-column Pt-2 sideNav`}>
              <NavLink className="Pt-1 Pb-1 " to="/watched/movies">
                Movies
              </NavLink>
              <NavLink className="Pt-1 Pb-1 " to="/watched/tv-shows">
                Tv Shows
              </NavLink>
            </SideNavLinks>
          </SideNavHeader>
        </SideNavBarCont>
      </SideNavBarMain>
    );
  }
}

const SideNavBarMain = styled.div``;
const HumbergerButton = styled.div`
  width: 100%;
  padding: 10px;
`;

const SideNavBarCont = styled.div`
  position: fixed;
  z-index: 9;
  width: 240px;
  height: 100%;
  background-color: ${colors.sideNavBar};
`;

const SideNavMainLink = styled(Link)`
  position: relative;
  display: block;
  padding: 25px 0px;
  font-size: 1.6em;
  font-weight: 700;
  color: white;
  background-color: ${(props) =>
    props.bg === "yellowishBg" ? colors.yellowishBg : "none"};
`;

const NavIcon = styled.div`
  position: absolute;
  right: 10%;
  top: 30%;
`;

const SideNavHeader = styled.div``;

const HeaderText = styled.div`
  font-size: 20px;
  color: #fff;
  font-weight: 100px;
`;

const SideNavLinks = styled.div`
  display: flex;
`;

const NavLink = styled(Link)`
  display: block;
  padding-top: 10px;
  font-size: 18px;
  line-height: 18px;
  color: white;
  font-weight: 100;
`;

const SubTitle = styled.h2`
  margin: 0;
  font-size: 28px;
`;
