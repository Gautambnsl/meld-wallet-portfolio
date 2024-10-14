// material-ui
import { Box, FormControl, InputAdornment, OutlinedInput } from '@mui/material';

// assets
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useDebouncedEffect } from 'hooks/useDebouncedEffect';
import { debounceTimeInMilliSeconds } from 'utils/constant/Constants';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //
interface SearchProps {
  paginationConfig: {
    page: number;
    search: string;
    limit: number;
    filter: null;
  };
  setPaginationConfig: React.Dispatch<React.SetStateAction<{
    page: number;
    search: string;
    limit: number;
    filter: null;
  }>>;
  placeholder: string;
}

const Search = ({ paginationConfig, setPaginationConfig, placeholder }: SearchProps) => {
  const [search, setSearch] = useState<string>('');

  useDebouncedEffect(
    () => {
      if (search || search === '') {
        changeSearchState();
      }
    },
    debounceTimeInMilliSeconds,
    [search]
  );

  const changeSearchState = () => {
    if (paginationConfig && search !== paginationConfig?.search) {
      setPaginationConfig({
        ...paginationConfig,
        page: 1,
        search: search.trim()
      });
    }
  };

  useEffect(() => {
    if (paginationConfig?.search === "") {
      setSearch("");
    }
  }, [paginationConfig]);

  return (
    <Box sx={{ width: '100%', ml: { xs: 0, md: 1 } }}>
      <FormControl sx={{ width: { xs: '100%', md: 224 } }}>
        <OutlinedInput
          size="small"
          id="header-search"
          value={search}
          startAdornment={
            <InputAdornment position="start" sx={{ mr: -0.5 }}>
              <SearchOutlined />
            </InputAdornment>
          }
          aria-describedby="header-search-text"
          inputProps={{
            'aria-label': 'weight',
          }}
          onChange={(e) => {
            if (e.target.value.trim()) {
              setSearch(e.target.value);
            } else {
              setSearch('');
            }
          }}
          placeholder={placeholder}
        />
      </FormControl>
    </Box>
  );
};

export default Search;
