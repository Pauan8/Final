import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const ExitLink = styled(Link)`
position: relative;`

export const ExitButton = () => {
    return <ExitLink to='/' > <CancelOutlinedIcon /> </ExitLink>
}