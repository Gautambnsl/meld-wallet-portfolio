import { Typography, TableCell } from '@mui/material';

const NoDataFound = () => {
  return (
    <TableCell colSpan={6} height={350}>
      <Typography align="center" color="secondary">
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img
            src="https://account-files-bucket.s3.ap-south-1.amazonaws.com/central-admin/images/no_data.png"
            alt="no data"
            height={100}
          />
          <span>No Data Found</span>
        </div>
      </Typography>
    </TableCell>
  );
};

export default NoDataFound;
