import React, { useState, useContext, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';
import {Link} from 'react-router-dom';

import { AuthContext } from '../context/auth';
// import { FETCH_POSTS } from '../util/graphql';

function LikeButton({post}){
    const { user } = useContext(AuthContext);
    const initialState = user && post.likes.filter(({username}) => username === user.username).length > 0;
    const [liked, setLiked] = useState(initialState);

    const [likePost, {error}] = useMutation(LIKE_MUTATION, {
        update(proxy, result){
            // const data = proxy.readQuery({ query: FETCH_POSTS });
            // const newData = { ...data };
            // let postIndex = newData.getPosts.findIndex(({id}) => id === post.id);
            // newData.getPosts[postIndex].likeCount = result.data.likePost.likeCount;
            // console.log(newData.getPosts[postIndex]);

            // proxy.writeQuery({ query: FETCH_POSTS, data: newData });
            setLiked(!liked);
        },
        onError(err){
            console.log(err)
        },
        variables: {postId: post.id}
    });

    // Alternative update for setLiked
    // useEffect(() => {
    //     if(user && post.likes.find(({username}) => username === user.username)){
    //         setLiked(true);
    //     } else setLiked(false);
    // }, [user, post.likes]);

    const TheButton = !user ? (
            <Button color='teal'  basic as={Link} to='/login'>
                <Icon name='heart' />
            </Button>
        ) : (
            <Button color='teal'  basic={!liked} onClick={likePost}>
                <Icon name='heart' />
            </Button>
        );

    return (
        <Popup
            content={liked ? "Like Post" : "Unlike"}
            trigger={
                <Button as='div' labelPosition='right'>
                    {TheButton}
                    <Label as='a' basic color='teal' pointing='left'>
                        {post.likeCount}
                    </Label>
                </Button>
            }
        />
    )
}

const LIKE_MUTATION = gql`
    mutation likePost(
        $postId: ID!
    ){
        likePost(postId: $postId){
            id
            body
            username
            createdAt
            likeCount
            commentCount
        }
    }
`;

export default LikeButton;