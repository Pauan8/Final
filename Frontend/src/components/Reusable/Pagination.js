import React from 'react';
import styled from 'styled-components/macro';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import FirstPageIcon from '@material-ui/icons/FirstPage';

const Page = styled.div`
  display: flex;
  width: 100%;
  max-width: 300px;
  justify-content: space-evenly;
  align-items: center;
  padding-right: 40px;
`;

const Paging = styled.button`
  cursor: pointer;
  background: transparent;
  height: 30px;
  border-radius: 5px;
`;

const PageNumber = styled.p``;

export const Pagination = ({ arr, page, setPage }) => {
  const handleClick = (direction) => {
    if (direction === 'forward') {
      setPage(page + 1);
    } else if (direction === 'back') {
      setPage(page - 1);
    } else {
      setPage(1);
    }
  };

  return (
    <Page>
      <Paging onClick={() => handleClick('start')} disabled={page === 1}>
        <FirstPageIcon />
      </Paging>
      <Paging onClick={() => handleClick('back')} disabled={page === 1}>
        <KeyboardArrowLeftIcon />
      </Paging>
      <PageNumber>Page: {page}</PageNumber>
      <Paging
        onClick={() => handleClick('forward')}
        disabled={arr ? arr.length === 0 : false}
      >
        <KeyboardArrowRightIcon />
      </Paging>
    </Page>
  );
};
