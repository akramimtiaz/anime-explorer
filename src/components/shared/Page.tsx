import type { PropsWithChildren } from 'react';
import styled from 'styled-components/native';

export default function Page(props: PropsWithChildren) {
    return <StyledView>{props.children}</StyledView>;
}

const StyledView = styled.View`
    flex-direction: column;
    flex: 1;
    background: ${({ theme }) => theme.colors.secondary};
`;