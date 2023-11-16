import { Link } from "react-router-dom";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { FaEdit, FaGem, FaList } from "react-icons/fa";
import { GiVote, GiTigerHead } from "react-icons/gi";
import { MdCreate } from "react-icons/md";

export default function Sidebar() {
  return (
    <ProSidebar>
      <SidebarHeader>{<GiTigerHead />}</SidebarHeader>
      <SidebarContent>
        <Menu iconShape="square">
          <MenuItem icon={<FaGem />}>
            Dashboard <Link to="/admin" />
          </MenuItem>
          <SubMenu title="Votes" icon={<GiVote />}>
            <MenuItem icon={<MdCreate />}>
              Create
              <Link to="/admin/vote/create" />
            </MenuItem>
            {/* <MenuItem icon={<FaEdit />}>
              Edit
              <Link to="/admin/vote/edit/:voteId" />
            </MenuItem> */}
            <MenuItem icon={<FaList />}>
              List
              <Link to="/admin/vote/list" />
            </MenuItem>
          </SubMenu>
          <SubMenu title="Proposal" icon={<GiVote />}>

            <MenuItem icon={<MdCreate />}>
              Create
              <Link to="/admin/proposal/create" />
            </MenuItem>


          </SubMenu>
          <SubMenu title="Whitepaper" icon={<GiVote />}>

            <MenuItem icon={<MdCreate />}>
              Create
              <Link to="/admin/whitepaper/create" />
            </MenuItem>


          </SubMenu>
          <SubMenu title="General" icon={<GiVote />}>

            <MenuItem icon={<MdCreate />}>
              setting
              <Link to="/admin/setting/" />
            </MenuItem>
          </SubMenu>
          {/* <SubMenu title="Asset" icon={<GiVote />}>
            <MenuItem icon={<MdCreate />}>
              AssetList
              <Link to="/admin/asset/list" />
            </MenuItem>
            <MenuItem icon={<FaEdit />}>
              Search
              <Link to="/" />
            </MenuItem>
            <MenuItem icon={<FaList />}>
            Asset  List
              <Link to="/" />
            </MenuItem>
          </SubMenu> */}
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        Copyright © 2022 <br />
        CHIC CHEETAH CLUB
      </SidebarFooter>
    </ProSidebar>
  );
}
