import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Icon, Confirm, Popup } from 'semantic-ui-react';
import { FETCH_POSTS } from '../util/graphql';

function DeleteButton(props){
    const [confirmOpen, setConfirmOpen] = useState(false);

    const mutation = props.commentId ? DELETE_COMMENT : DELETE_POST;

    const [deletePostOrComment, {error}] = useMutation(mutation, {
        update(proxy){
            setConfirmOpen(false);
            if(!props.commentId){
                const data = proxy.readQuery({ query: FETCH_POSTS });
                const newData = {...data}
                newData.getPosts = newData.getPosts.filter(p => p.id !== props.postId)
    
                proxy.writeQuery({ query: FETCH_POSTS, data: newData});
            }
            
            if(props.callback){props.callback()}
        },
        variables: {postId: props.postId, commentId: props.commentId}
    })
    
    return (
        <>
            <Popup
                content='Delete'
                trigger={
                    <Button 
                        as='div' 
                        color='red' 
                        basic 
                        floated="right"
                        onClick={() => setConfirmOpen(true)} 
                    >
                        <Icon name="trash" style={{ margin: 0 }} label='Delete' />
                    </Button>
                }
            />
            <Confirm
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                onConfirm={deletePostOrComment}
            />
        </>
    )
}

const DELETE_POST = gql`
    mutation deletePost($postId: ID!){
        deletePost(postId: $postId)
    }
`;

const DELETE_COMMENT = gql`
    mutation deleteComment($postId: ID!, $commentId: ID!){
        deleteComment(postid: $postId commentId: $commentId){
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
                body
                username
                createdAt
            }
        }
    }
`;

export default DeleteButton;