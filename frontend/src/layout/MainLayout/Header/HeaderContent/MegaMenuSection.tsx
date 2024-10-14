import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  CardMedia,
  ClickAwayListener,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Stack,
  Typography,
} from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import Dot from 'components/@extended/Dot';
import IconButton from 'components/@extended/IconButton';
import Transitions from 'components/@extended/Transitions';
import { DRAWER_WIDTH } from 'config';

// assets
import { WindowsOutlined } from '@ant-design/icons';
import backgroundVector from 'assets/images/mega-menu/back.svg';
import imageChart from 'assets/images/mega-menu/chart.svg';

// types
import { ThemeMode } from 'types/config';
import { store } from 'store';
import { useDispatch } from 'react-redux';
import { LOGIN } from 'store/reducers/actions';
import { project } from 'utils/constant/Constants';

// ==============================|| HEADER CONTENT - MEGA MENU SECTION ||============================== //

const MegaMenuSection = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const anchorRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  const handleItemClick = (item: string) => {
    dispatch({
      type: LOGIN,
      payload: {
        currentProject: item,
      },
    });
    sessionStorage.setItem('menu-key', item);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const sideBarMenu: any = localStorage?.getItem('admin-permission');

  const parsedsideBarMenu = Object?.keys(JSON?.parse(sideBarMenu));

  const iconBackColorOpen =
    theme.palette.mode === ThemeMode.DARK ? 'grey.200' : 'grey.300';
  const iconBackColor =
    theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';
  type Management = {
    [key: string]: { [perm: string]: boolean };
  };
  type SidebarMenu = {
    [key: string]: Management;
  };

  const parsedMenu: SidebarMenu = JSON.parse(sideBarMenu) as SidebarMenu;

  const getAllViewPermissions = (item: any) => {
    const permission = parsedMenu[item];

    const hasViewPermission = Object.keys(permission).some(
      (key) => permission[key].view
    );
    return hasViewPermission;
  };

  const getPermissions = (role: string) => {
    return Object.keys(parsedMenu[role]);
  };

  const firstPairs: {
    [key: string]: { key: string; value: { [perm: string]: boolean } };
  } = Object.fromEntries(
    Object.entries(parsedMenu).map(([key, value]) => {
      const [firstKey, firstValue] = Object.entries(value)[0];
      return [key, { key: firstKey, value: firstValue }];
    })
  );

  const handleRedirect = (item: any) => {
    const finalVar: any = Object.entries(firstPairs[item])[0];
    const permission = getPermissions(item);
    if (permission.includes('dashboardmanagement')) {
      return `/${item}/dashboard-management`;
    } else {
      return `/${item}/${finalVar[1].replace(/management$/, '-management')}`;
    }
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <IconButton
        color="secondary"
        variant="light"
        sx={{
          color: 'text.primary',
          bgcolor: open ? iconBackColorOpen : iconBackColor,
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <WindowsOutlined />
      </IconButton>
      <Popper
        placement="bottom"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [-180, 9],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions
            type="grow"
            position="top"
            in={open}
            {...TransitionProps}
          >
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                minWidth: 750,
                width: {
                  md: `calc(100vw - 100px)`,
                  lg: `calc(100vw - ${DRAWER_WIDTH + 100}px)`,
                  xl: `calc(100vw - ${DRAWER_WIDTH + 140}px)`,
                },
                maxWidth: 1024,
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <Grid container>
                    <Grid
                      item
                      md={4}
                      sx={{
                        background: `url(${backgroundVector}), linear-gradient(183.77deg, ${theme.palette.primary.main} 11.46%, ${theme.palette.primary[700]} 100.33%)`,
                      }}
                    >
                      <Box sx={{ p: 4.5, pb: 3 }}>
                        <Stack sx={{ color: 'background.paper' }}>
                          <Typography
                            variant="h2"
                            sx={{ fontSize: '1.875rem', mb: 1 }}
                          >
                            Explore edeXa Applications
                          </Typography>
                          <Typography variant="h6">
                            edeXa Business Blockchain, private and public
                            ecosystem built to enable scalable and business-
                            oriented dApps for the world.
                          </Typography>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="flex-end"
                            sx={{ mt: -1 }}
                          >
                            <CardMedia
                              component="img"
                              src={imageChart}
                              alt="Chart"
                              sx={{ mr: -2.5, mb: -2.5, width: 124 }}
                            />
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid>
                    <Grid item md={8}>
                      <Box
                        sx={{
                          p: 4,
                          '& .MuiList-root': {
                            pb: 0,
                          },
                          '& .MuiListSubheader-root': {
                            p: 0,
                            pb: 1.5,
                          },
                          '& .MuiListItemButton-root': {
                            p: 0.5,
                            '&:hover': {
                              background: 'transparent',
                              '& .MuiTypography-root': {
                                color: 'primary.main',
                              },
                            },
                          },
                        }}
                      >
                        <Grid container spacing={6}>
                          <Grid item xs={4}>
                            <List
                              component="nav"
                              aria-labelledby="nested-list-user"
                              sx={{
                                display: 'grid',
                                gridTemplateColumns: 'auto auto',
                                width: '25rem',
                              }}
                            >
                              {parsedsideBarMenu.map((item) => (
                                <ListItemButton
                                  key={item}
                                  disableRipple
                                  component={Link}
                                  target="_self"
                                  to={handleRedirect(item)}
                                  disabled={!getAllViewPermissions(item)}
                                  onClick={() => {
                                    handleItemClick(item);
                                    handleToggle();
                                  }}
                                  sx={{
                                    color: (theme) =>
                                      store.getState()?.auth?.currentProject ===
                                      item
                                        ? theme.palette.primary.main
                                        : '',
                                  }}
                                >
                                  <ListItemIcon>
                                    <Dot
                                      size={7}
                                      color="secondary"
                                      variant="outlined"
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={(() => {
                                      switch (item) {
                                        case project.admin:
                                          return 'Admin';
                                        case project.bmessage:
                                          return 'bMessage';
                                        case project.btrack:
                                          return 'bTrack';
                                        case project.nft:
                                          return 'bNFT';
                                        case project.bstamp:
                                          return 'bStamp';
                                        case project.byou:
                                          return 'bYou';
                                        case project.universe:
                                          return 'Universe';
                                        case project.bvote:
                                          return 'bVote';
                                        case project.edexanetwork:
                                          return 'edeXa Network';
                                        case project.bsign:
                                          return 'bSign';
                                        default:
                                          return item;
                                      }
                                    })()}
                                  />
                                </ListItemButton>
                              ))}
                            </List>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
};

export default MegaMenuSection;
