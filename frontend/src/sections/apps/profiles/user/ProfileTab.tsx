import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { LockOutlined, UserOutlined } from '@ant-design/icons';

function getPathIndex(pathname: string) {
    let selectedTab = 0;
    switch (pathname) {
        case '/profile/password':
            selectedTab = 1;
            break;
        case '/profile/personal':
        default:
            selectedTab = 0;
    }
    return selectedTab;
}

// ==============================|| USER PROFILE - TAB ||============================== //

const ProfileTab = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
    const handleListItemClick = (index: number, route: string) => {
        setSelectedIndex(index);
        navigate(route);
    };

    useEffect(() => {
        setSelectedIndex(getPathIndex(pathname));
    }, [pathname]);

    return (
        <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: theme.palette.grey[500] } }}>
            <ListItemButton selected={selectedIndex === 0} onClick={() => handleListItemClick(0, '/profile/personal')}>
                <ListItemIcon>
                    <UserOutlined />
                </ListItemIcon>
                <ListItemText primary="Personal Information" />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === 1} onClick={() => handleListItemClick(1, '/profile/password')}>
                <ListItemIcon>
                    <LockOutlined />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
            </ListItemButton>
        </List>
    );
};

export default ProfileTab;
