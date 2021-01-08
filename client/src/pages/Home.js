import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home(){
    const { loading, data } = useQuery(FETCH_POSTS);
    
    return (
        <Grid columns={3} >
            <Grid.Row className='page-title'>
                <h2 >Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        data.getPosts && data.getPosts.map(post => (
                            <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                <PostCard post={post} />
                            </Grid.Column>
                        ))
                    )
                }
                <Grid.Column>

                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const FETCH_POSTS = gql`
    {
        getPosts{
            id
            body
            username
            createdAt
            likeCount
            commentCount
            likes{
                username
            }
            comments{
                id
                username
                body
                createdAt
            }
        }
    }
`;

export default Home;