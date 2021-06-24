import React from 'react';
import styled from 'styled-components/macro';
import {  Link } from 'react-router-dom';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const ExitLink = styled(Link)`
position: relative;`

export const ExitButton = () => {
    return <ExitLink to='/' > <CancelOutlinedIcon /> </ExitLink>
}