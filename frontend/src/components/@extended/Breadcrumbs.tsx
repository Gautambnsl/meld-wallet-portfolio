import { CSSProperties, ReactElement, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Typography } from '@mui/material';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
// project import
import MainCard from 'components/MainCard';

// assets
import { ApartmentOutlined, HomeOutlined, HomeFilled } from '@ant-design/icons';

// types
import { OverrideIcon } from 'types/root';
import { NavItemType } from 'types/menu';
import { FormattedMessage } from 'react-intl';
import { store } from 'store';

// ==============================|| BREADCRUMBS ||============================== //

export interface BreadCrumbSxProps extends CSSProperties {
  mb?: string;
  bgcolor?: string;
}

interface Props {
  card?: boolean;
  divider?: boolean;
  icon?: boolean;
  icons?: boolean;
  maxItems?: number;
  navigation?: { items: NavItemType[] };
  rightAlign?: boolean;
  separator?: OverrideIcon;
  title?: boolean;
  titleBottom?: boolean;
  sx?: BreadCrumbSxProps;
}

const Breadcrumbs = ({
  card,
  divider = true,
  icon,
  icons,
  maxItems,
  navigation,
  rightAlign,
  separator,
  title,
  titleBottom,
  sx,
  ...others
}: Props) => {
  const theme = useTheme();
  const location = useLocation();
  const [main, setMain] = useState<NavItemType | undefined>();
  const [item, setItem] = useState<any>();
  const currentProject = store.getState().auth.currentProject;

  const iconSX = {
    marginRight: theme.spacing(0.75),
    marginTop: `-${theme.spacing(0.25)}`,
    width: '1rem',
    height: '1rem',
    color: theme.palette.secondary.main,
  };

  useEffect(() => {
    navigation?.items?.map((menu: NavItemType, index: number) => {
      if (menu.type && menu.type === 'group') {
        getCollapse(menu as { children: NavItemType[]; type?: string });
      }
      return false;
    });
  });

  let customLocation = location.pathname;

  // only used for component demo breadcrumbs
  if (customLocation.includes('/components-overview/breadcrumbs')) {
    customLocation = '/apps/kanban/board';
  }

  if (customLocation.includes('/apps/kanban/backlogs')) {
    customLocation = '/apps/kanban/board';
  }

  useEffect(() => {
    if (customLocation.includes('/apps/profiles/user/payment')) {
      setItem(undefined);
    }
  }, [item, customLocation]);

  // set active item state
  const getCollapse = (menu: NavItemType) => {
    if (menu.children) {
      menu.children.filter((collapse: NavItemType) => {
        if (collapse.type && collapse.type === 'collapse') {
          getCollapse(collapse as { children: NavItemType[]; type?: string });
          if (collapse.url === customLocation) {
            setMain(collapse);
            setItem(collapse);
          }
        } else if (collapse.type && collapse.type === 'item') {
          if (customLocation === collapse.url) {
            setMain(menu);
            setItem(collapse);
          }
        }
        return false;
      });
    }
  };

  // item separator
  const SeparatorIcon = separator!;
  const separatorIcon = separator ? (
    <SeparatorIcon style={{ fontSize: '0.75rem', marginTop: 2 }} />
  ) : (
    '/'
  );

  let mainContent;
  let breadcrumbContent: ReactElement = <Typography />;
  let CollapseIcon;

  // for get navigation name
  const path =
    location.pathname.split('/')?.[location.pathname.split('/').length - 1];

  const displayName = location.pathname.split('/');
  // collapse item
  if (main && main.type === 'group') {
    CollapseIcon = main.icon ? main.icon : ApartmentOutlined;
    mainContent = (
      <Typography
        component={Link}
        to={document.location.pathname}
        variant="h6"
        sx={{ textDecoration: 'none' }}
        color="textSecondary"
      >
        {icons && <CollapseIcon style={iconSX} />}
        {main.title}
      </Typography>
    );
    breadcrumbContent = (
      <MainCard
        border={card}
        sx={
          card === false
            ? { mb: 3, bgcolor: 'transparent', ...sx }
            : { mb: 3, ...sx }
        }
        {...others}
        content={card}
        shadow="none"
      >
        <Grid
          container
          direction={rightAlign ? 'row' : 'column'}
          justifyContent={rightAlign ? 'space-between' : 'flex-start'}
          alignItems={rightAlign ? 'center' : 'flex-start'}
          spacing={1}
        >
          <Grid item>
            <MuiBreadcrumbs
              aria-label="breadcrumb"
              maxItems={maxItems || 8}
              separator={separatorIcon}
            >
              <Typography
                component={Link}
                to="/"
                color="textSecondary"
                variant="h6"
                sx={{ textDecoration: 'none' }}
              >
                {icons && <HomeOutlined style={iconSX} />}
                {icon && !icons && (
                  <HomeFilled style={{ ...iconSX, marginRight: 0 }} />
                )}
                {(!icon || icons) && 'Home'}
              </Typography>
              {mainContent} Admin data
            </MuiBreadcrumbs>
          </Grid>
          {title && titleBottom && (
            <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
              <Typography variant="h2">{main.title}</Typography>
            </Grid>
          )}
        </Grid>
        {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
      </MainCard>
    );
  }

  // items
  breadcrumbContent = (
    <MainCard
      border={card}
      sx={
        card === false
          ? { mb: 3, bgcolor: 'transparent', ...sx }
          : { mb: 3, ...sx }
      }
      {...others}
      content={card}
      shadow="none"
    >
      <Grid
        container
        direction={rightAlign ? 'row' : 'column'}
        justifyContent={rightAlign ? 'space-between' : 'flex-start'}
        alignItems={rightAlign ? 'center' : 'flex-start'}
        spacing={1}
      >
        {title && !titleBottom && (
          <Grid item>
            <Typography variant="h2">{item.title}</Typography>
          </Grid>
        )}

        <>
          {/* breadcrums */}
          <MuiBreadcrumbs
            aria-label="breadcrumb"
            maxItems={maxItems || 8}
            separator={separatorIcon}
            sx={{ mt: 2, ml: 2 }}
          >
            {!location.pathname.includes('dashboard') && (
              <Typography
                component={Link}
                to={
                  currentProject === 'edexanetwork'
                    ? `/${location.pathname.split('/')?.[1]}/contactus-management`
                    : location?.pathname.includes('notification') || location?.pathname.includes('profile')
                      ? `/${currentProject}/dashboard-management`
                      : `/${location.pathname.split('/')?.[1]}/dashboard-management`
                }
                color="textSecondary"
                variant="h6"
                sx={{ textDecoration: 'none' }}
              >
                {icons && <HomeOutlined style={iconSX} />}
                {icon && !icons && (
                  <HomeFilled style={{ ...iconSX, marginRight: 0 }} />
                )}
                {(!icon || icons) && 'Home'}
              </Typography>
            )}
            {/* module navigation  */}
            {(location.pathname.includes('edit') ||
              location.pathname.includes('view') ||
              location.pathname.includes('manage') ||
              location.pathname.includes('create')) && (
                <Typography
                  component={Link}
                  to={`/${location.pathname.split('/')?.[1]}/${location.pathname.split('/')?.[2]
                    }`}
                  color="textSecondary"
                  variant="h6"
                  sx={{ textDecoration: 'none' }}
                >
                  {icons && <HomeOutlined style={iconSX} />}
                  {icon && !icons && (
                    <HomeFilled style={{ ...iconSX, marginRight: 0 }} />
                  )}
                  <FormattedMessage id={displayName?.[2]} />
                </Typography>
              )}
          </MuiBreadcrumbs>
          {/* Module Name */}
          <Grid item sx={{ mt: card === false ? 0.25 : 1 }}>
            <Typography variant="h2" sx={{ textTransform: 'capitalize' }}>
              <FormattedMessage id={path} /> {location?.state?.api ? location?.state?.api : ''}
            </Typography>{' '}
          </Grid>
        </>
      </Grid>
      {card === false && divider !== false && <Divider sx={{ mt: 2 }} />}
    </MainCard>
  );

  return breadcrumbContent;
};

export default Breadcrumbs;
