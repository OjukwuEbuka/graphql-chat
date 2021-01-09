import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { AuthContext } from '../context/auth';
import { FETCH_POSTS } from '../util/graphql';

function Home(){
    const { user } = useContext(AuthContext);

    const { loading, data } = useQuery(FETCH_POSTS);
    
    return (
        <Grid columns={3} >
            <Grid.Row className='page-title'>
                <h2 >Recent Posts</h2>
            </Grid.Row>
            <Grid.Row>
                {
                    user && (
                        <Grid.Column>
                            <PostForm />
                        </Grid.Column>
                    )
                }

                {
                    loading ? (
                        <h2>Loading...</h2>
                    ) : (
                        <Transition.Group>
                            {
                                data.getPosts && data.getPosts.map(post => (
                                    <Grid.Column key={post.id} style={{marginBottom: 20}}>
                                        <PostCard post={post} />
                                    </Grid.Column>
                                ))
                            }
                        </Transition.Group>
                    )
                }
                <Grid.Column>

                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}


export default Home;