import React, { useEffect } from 'react';

import Container from './Container';

function Page(props) {
    useEffect(()=> {
        // set the current page title
        document.title = `${props.title} | Translate App`;
        // reset the page to the top
        window.scrollTo(0,0);
      }, []);

    return (
        <Container wide={props.wide}>
            {props.children}
        </Container>
    );
}

export default Page;