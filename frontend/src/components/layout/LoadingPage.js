import React from 'react';
import { Placeholder, Segment, Container } from 'semantic-ui-react';
import Footer from './Footer'; // Import Footer

const LoadingPage = () => {
    return (
        <>
            <Container style={{ paddingTop: '20px', paddingBottom: '20px', minHeight: '90vh' }}>

                <Container textAlign='center' style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <Segment raised>
                        <Placeholder>
                            <Placeholder.Header>
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='very long' />
                            </Placeholder.Header>
                        </Placeholder>
                    </Segment>
                </Container>

                {/* Main Content Placeholder */}
                <Container>
                    <Segment raised>
                        <Placeholder fluid>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='full' />
                                <Placeholder.Line length='very long' />
                                <Placeholder.Line length='long' />
                                <Placeholder.Line length='medium' />
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                            <Placeholder.Paragraph>
                                <Placeholder.Line length='long' />
                                <Placeholder.Line length='medium' />
                                <Placeholder.Line length='short' />
                            </Placeholder.Paragraph>
                        </Placeholder>
                    </Segment>
                </Container>

            </Container>
            <Footer />
        </>
    );
};

export default LoadingPage;