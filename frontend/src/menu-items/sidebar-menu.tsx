import { FormattedMessage } from 'react-intl';
import { store } from 'store';
import { Icon } from './sidebar-icon';

interface SidebarMenuItem {
  name: string;
  icon: React.ElementType;
}

interface SidebarMenuProps {
  menu: SidebarMenuItem[];
}
// ==============================|| MENU ITEMS - APPLICATIONS ||============================== //

const getName = (name: string) => {
  switch (name) {
    case 'network-management':
      return () => ['domain-management', 'region-management'];
    case 'channel-management':
      return () => ['channel-management', 'invitation-management'];
    case 'contract-management':
      return () => ['contract-management', 'installations-management'];
    case 'blog-management':
      return () => ['blog-management', 'news-management'];
    default:
      return () => [name];
  }
};
const generateMap = (name: string) => {
  const nameFunction = getName(name);
  const values = nameFunction();
  return values;
};

const getMenuItemTitle = (name: string) => {
  switch (name) {
    case 'network-management':
      return 'Domains & Regions';
    case 'channel-management':
      return 'Channel Management';
    case 'contract-management':
      return 'Contract Management';
    case 'blog-management':
      return 'News Management';
    default:
      return name;
  }
};

const childrenMenu = [
  'network-management',
  'channel-management',
  'contract-management',
  'blog-management',
];

const SideBarMenu = ({ menu }: SidebarMenuProps) => {
  const currentProject = store.getState()?.auth?.currentProject || 'admin';
  const applications: any = {
    id: 'group-applications',
    type: 'group',
    breadcrumbs: true,
    children: menu.map((item) => {
      if (childrenMenu.includes(item.name)) {
        return {
          id: item.name,
          title: getMenuItemTitle(item?.name),
          type: 'collapse',
          icon: item.icon,
          children: generateMap(item.name).map((items) => ({
            id: items,
            title: <FormattedMessage id={items} />,
            type: 'item',
            icon: Icon[items],
            url: `/${currentProject}/${items
              .toLowerCase()
              .replace(/\s+/g, '-')}`,
          })),
        };
      } else {
        return {
          id: item.name,
          title: <FormattedMessage id={item.name} />,
          type: 'item',
          icon: item.icon,
          url: `/${currentProject}/${item.name
            .toLowerCase()
            .replace(/\s+/g, '-')}`,
        };
      }
    }),
  };

  return applications;
};

export default SideBarMenu;
