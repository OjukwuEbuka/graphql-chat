import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useContext, useRef, useState } from 'react';
import { Button, Card, Form, Grid, Icon, Image, Label, Popup } from 'semantic-ui-react';
import moment from 'moment';

import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import DeleteButton from '../components/DeleteButton';

function SinglePost(props){
    const {user} = useContext(AuthContext);
    const postId = props.match.params.postId;
    const commentInputRef = useRef(null);
    const [comment, setComment] = useState('');

    const { loading, data } = useQuery(FETCH_POST, { variables: { postId } });
    const [createComment] = useMutation(CREATE_COMMENT, {
        update(){
            setComment('');
            commentInputRef.current.blur();
        },
        onError(err){
            //
        },
        variables: {postId, body: comment}
    })

    function deletePostCallback(){
        props.history.push('/');
    }

    let postMarkup;
    if(loading){
        postMarkup = <p>Loading...</p>
    }
    else if(!data.getPost){
        postMarkup = <p>Loading...</p>
    } else {
        const {id, username, body, createdAt, likeCount, likes, commentCount, comments} = data.getPost;

        postMarkup = (
            <Grid>
                <Grid.Row>
                    <Grid.Column width={2}>
                        <Image
                            src='https://react.semantic-ui.com/images/avatar/large/molly.png'
                            size='small'
                            float='right'
                        />
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Card fluid>
                            <Card.Content>
                                <Card.Header>{username}</Card.Header>
                                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                                <Card.Description>{body}</Card.Description>
                            </Card.Content>
                            <br />
                            <Card.Content extra>
                                <LikeButton user={user} post={{id, likeCount, likes}} />
                                <Popup
                                    content='Make a comment'
                                    trigger={
                                        <Button as='div' labelPosition='right' onClick={()=>console.log('Comment')}>
                                            <Button basic color="blue">
                                                <Icon name='comments' />
                                            </Button>
                                            <Label basic color='blue' pointing='left'>
                                                {commentCount}
                                            </Label>
                                        </Button>
                                    }
                                />
                                {user && user.username === username && <DeleteButton postId={id} callback={deletePostCallback} /> }
                            </Card.Content>
                        </Card>
                        {
                            user && 
                            <Card fluid>
                                <Card.Content>
                                    <p>Post a comment</p>
                                    <Form>
                                        <div className="ui action input fluid">
                                            <input
                                                type='text'
                                                placeholder='Comment...'
                                                name="comment"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                ref={commentInputRef}
                                            />
                                            <button type='submit' 
                                                className="ui button teal"
                                                disabled={comment.trim() === ''}
                                                onClick={createComment}
                                            >
                                                SUBMIT
                                            </button>
                                        </div>
                                    </Form>
                                </Card.Content>
                            </Card>
                        }
                        {
                            comments.map(comment => (
                                <Card fluid key={comment.id}>
                                    <Card.Content>
                                        {user && user.username === comment.username && (
                                            <DeleteButton postId={id} commentId={comment.id} />
                                        )}
                                        <Card.Header>{comment.username}</Card.Header>
                                        <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                                        <Card.Description>{comment.body}</Card.Description>
                                    </Card.Content>
                                </Card>
                            ))
                        }
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }

    return postMarkup;

}

const FETCH_POST = gql`
    query($postId: ID!){
        getPost(postId: $postId){
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
                createdAt
                body
            }
        }
    }
`;

const CREATE_COMMENT = gql`
    mutation($postId: ID!, $body: String!){
        createComment(postId: $postId body: $body){
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
                createdAt
                username
            }
        }
    }
`;


export default SinglePost;