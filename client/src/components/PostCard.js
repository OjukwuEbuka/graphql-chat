import React, {useContext, useState} from 'react';
import moment from 'moment';
import {Button, Card, Icon, Image, Label} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { AuthContext } from '../context/auth';

import LikeButton from './LikeButton';

function PostCard(props){
    // const {loading, data} = useLazyQuery();
    const { user } = useContext(AuthContext);

    const {body, createdAt, id, username, likeCount, commentCount, likes, comments} = props.post;

    function likePost(){
        //
    }

    return (
        <Card fluid>
            <Card.Content>
                <Image floated="right" size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <LikeButton post={{id, likes, likeCount}} />
                <Button as='div' labelPosition='right'>
                    <Button color='green'  basic as={Link} to={`/posts/${id}`}>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='green' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
                {
                    user && user.username === username && (
                        <Button 
                            as='div' 
                            color='red' 
                            basic 
                            floated="right"
                            onClick={() => console.log('Delete post')} 
                        >
                            <Icon name="trash" style={{ margin: 0 }} label='Delete' />
                        </Button>
                    )
                }
            </Card.Content>
        </Card>
    )
}

export default PostCard