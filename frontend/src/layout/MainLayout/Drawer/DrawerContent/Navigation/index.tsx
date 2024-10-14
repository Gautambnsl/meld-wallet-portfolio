import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Typography, useMediaQuery } from '@mui/material';

// project import
import NavGroup from './NavGroup';

import { store, useSelector } from 'store';
import useConfig from 'hooks/useConfig';
import { HORIZONTAL_MAX_ITEM } from 'config';

// types
import { NavItemType } from 'types/menu';
import { MenuOrientation } from 'types/config';
import SideBarMenu from 'menu-items/sidebar-menu';
import { BorderlessTableOutlined } from '@ant-design/icons';
import { Icon } from 'menu-items/sidebar-icon';

// ==============================|| DRAWER CONTENT - NAVIGATION ||============================== //

const Navigation = () => {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));
  const { menuOrientation } = useConfig();
  const { drawerOpen } = useSelector((state) => state.menu);
  const [selectedItems, setSelectedItems] = useState<string | undefined>('');
  const [selectedLevel, setSelectedLevel] = useState<number>(0);
  const [menuList, setMenuItems] = useState<{ items: NavItemType[] }>({
    items: [],
  });

  const { currentProject } = useSelector((state) => state.auth);

  interface SidebarMenuItem {
    name: string;
    icon: React.ElementType;
  }
  const menuItems: { items: NavItemType[] } = {
    items: [],
  };
  let menu: SidebarMenuItem[] = [];
  const getBranches = async () => {
    const sideBarMenu: any = localStorage.getItem('admin-permission');
    const currentProject: string =
      store.getState()?.auth?.currentProject || 'admin';

    if (sideBarMenu !== null && currentProject !== null) {
      const parsedSideBarMenu = Object.keys(
        JSON.parse(sideBarMenu)[currentProject]
      );
      if (parsedSideBarMenu !== null) {
        parsedSideBarMenu.sort((a, b) => {
          if (a === 'dashboardmanagement') return -1;
          if (b === 'dashboardmanagement') return 1;
          if (a === 'settingmanagement') return 1;
          if (b === 'settingmanagement') return -1;
          return a.localeCompare(b);
        });

        menu = parsedSideBarMenu.map((item: string) => ({
          name: `${item.replace(/management$/, '')}-management`,
          icon:
            Icon[`${item.replace(/management$/, '')}-management`] ||
            BorderlessTableOutlined,
        }));

        menuItems.items = [SideBarMenu({ menu })];
        setMenuItems(menuItems);
      }
    }
  };

  useEffect(() => {
    getBranches();
    // eslint-disable-next-line
  }, [currentProject]);

  const isHorizontal =
    menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

  const lastItem = isHorizontal ? HORIZONTAL_MAX_ITEM : null;
  let lastItemIndex = menuList.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  //  first it checks menu item is more than giving HORIZONTAL_MAX_ITEM after that get lastItemid by giving horizontal max
  // item and it sets horizontal menu by giving horizontal max item lastly slice menuItem from array and set into remItems

  if (lastItem && lastItem < menuList.items.length) {
    lastItemId = menuList.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuList.items
      .slice(lastItem - 1, menuList.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
      }));
  }

  const navGroups = menuList.items.slice(0, lastItemIndex + 1).map((item) => {
    switch (item.type) {
      case 'group':
        return (
          <NavGroup
            key={item.id}
            setSelectedItems={setSelectedItems}
            setSelectedLevel={setSelectedLevel}
            selectedLevel={selectedLevel}
            selectedItems={selectedItems}
            lastItem={lastItem!}
            remItems={remItems}
            lastItemId={lastItemId}
            item={item}
          />
        );
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Fix - Navigation Group
          </Typography>
        );
    }
  });
  return (
    <Box
      sx={{
        pt: drawerOpen ? (isHorizontal ? 0 : 2) : 0,
        '& > ul:first-of-type': { mt: 0 },
        display: isHorizontal ? { xs: 'block', lg: 'flex' } : 'block',
      }}
    >
      {navGroups}
    </Box>
  );
};

export default Navigation;
