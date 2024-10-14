import { TextField } from '@mui/material';
import { useDebouncedEffect } from 'hooks/useDebouncedEffect';
import React, { useEffect, useState } from 'react';
import { debounceTimeInMilliSeconds } from 'utils/constant/Constants';

interface ILabelFieldProps {
  value: string;
  keyValue: string;
  lang: string;
  setFieldValue: (field: string, value: string) => void;
  disabled: boolean;
}

const InputLabelField: React.FC<ILabelFieldProps> = ({
  value,
  keyValue,
  lang,
  setFieldValue,
  disabled,
}) => {
  const [labelValue, setLabelValue] = useState<string>('');

  useEffect(() => {
    setLabelValue(value);
  }, [value]);

  useDebouncedEffect(
    () => {
      if (value !== labelValue) {
        if (lang === 'EN') {
          setFieldValue(`EN.${keyValue}`, labelValue);
        } else {
          setFieldValue(`DE.${keyValue}`, labelValue);
        }
      }
    },
    debounceTimeInMilliSeconds,
    [labelValue]
  );

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setFieldValue('language', lang);
    setLabelValue(e?.target?.value);
  };

  return (
    <TextField
      sx={{ width: '90%' }}
      id={value}
      name={value}
      type="text"
      autoComplete="given-name"
      value={labelValue}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default React.memo(InputLabelField);
