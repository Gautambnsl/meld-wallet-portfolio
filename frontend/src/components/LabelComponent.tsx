import { List, ListItem, ListItemText, TextField } from '@mui/material';
import InputLabelField from './InputLabelField';
import React from 'react';

interface ILabelComponentProps {
  setFieldValue: (field: string, value: string) => void;
  values: any;
  valueKey: any;
  key: number;
  disabled: boolean;
}

const LabelComponent: React.FC<ILabelComponentProps> = ({
  setFieldValue,
  values,
  valueKey,
  key,
  disabled,
}) => {
  return (
    <List key={valueKey - key}>
      <ListItem>
        <ListItemText>
          <TextField
            sx={{ width: '90%' }}
            id="key"
            name="key"
            autoComplete="given-name"
            value={valueKey}
            disabled
          />
        </ListItemText>
        <ListItemText>
          <InputLabelField
            setFieldValue={setFieldValue}
            value={values?.EN?.[valueKey]}
            keyValue={valueKey}
            lang="EN"
            disabled={disabled}
          />
        </ListItemText>
        <ListItemText>
          <InputLabelField
            setFieldValue={setFieldValue}
            value={values?.DE?.[valueKey]}
            keyValue={valueKey}
            lang="DE"
            disabled={disabled}
          />
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default React.memo(LabelComponent);
