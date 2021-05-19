import React from 'react'
import styled from 'styled-components/macro'


const Wrapper = styled.footer`
height: 50px;
background: #b9cdd8;
z-index: 4;
position: relative;
width: 100%;
background: lightgray;
display: flex;
align-items: center;
justify-content: center;
margin-top: 40px;

`

const BgImage = styled.div`
position: absolute;
background-image:  url("https://images.unsplash.com/photo-1547638369-03b0e69b28d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
background-attachment: fixed;
background-size: cover;
top: 0;
bottom: 0;
left: 0;
right: 0;
opacity: 0.3;
z-index: 6;
`

const Text = styled.p`
color: white;
position: relative;
z-index: 6;
`

export const Footer = () => {
    return <Wrapper>
        <BgImage />
        <Text>&copy; Pauline Andersson</Text>
    </Wrapper>
}