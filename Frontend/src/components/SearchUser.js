import React from 'react'
import styled from 'styled-components/macro'

import { Search } from './Reusable/Search'

const SearchContainer = styled.div`
    position: absolute;
    z-index: 6;
    top: 5px;
    right: 150px;`

export const SearchUser = () => {
    return (
    <SearchContainer>
        <Search mode='user' />
    </SearchContainer>
    )
}