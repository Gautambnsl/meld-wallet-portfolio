// material-ui
import { styled } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';

// types
import { GenericCardProps } from 'types/root';

// styles
const IconWrapper = styled('div')({
    position: 'absolute',
    left: '-17px',
    bottom: '-27px',
    color: '#fff',
    transform: 'rotate(25deg)',
    '& svg': {
        width: '100px',
        height: '100px',
        opacity: '0.35'
    }
});

interface UserCountCardProps {
    primary: string;
    secondary: number;
    iconPrimary: GenericCardProps['iconPrimary'];
    color: string;
    onClick?: () => void;
}

// =============================|| USER NUM CARD ||============================= //

const DashboardCard = ({ primary, secondary, iconPrimary, color, onClick }: UserCountCardProps) => {
    const IconPrimary = iconPrimary!;
    const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }} // Initial animation state
            animate={{ opacity: 1, y: 0 }} // Final animation state
            transition={{ duration: 0.5 }} // Animation duration
            whileHover={{ scale: 1.05, boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} // Add animation on hover
            onClick={onClick}
        >
            <Card elevation={0} onClick={onClick} sx={{ background: color, position: 'relative', color: '#fff', cursor: 'pointer' }}>
                <CardContent>
                    <IconWrapper>{primaryIcon}</IconWrapper>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                        <Grid item sm={12}>
                            <Typography variant="h3" align="center" color="inherit">
                                {secondary}
                            </Typography>
                        </Grid>
                        <Grid item sm={12}>
                            <Typography variant="body1" align="center" color="inherit">
                                {primary}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default DashboardCard;
