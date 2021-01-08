import React, {useState} from 'react';
import moment from 'moment';
import {Button, Card, Icon, Image, Label} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

function PostCard(props){
    const {loading, data} = useLazyQuery();

    const {body, createdAt, id, username, likeCount, commentCount, likes, comments} = props.post;

    function likePost(){
        //
    }
    function makeComment(){
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
                <Button as='div' labelPosition='right'>
                    <Button color='teal'  basic onClick={likePost}>
                        <Icon name='heart' />
                    </Button>
                    <Label as='a' basic color='teal' pointing='left'>
                        {likeCount}
                    </Label>
                </Button>
                <Button as='div' labelPosition='right'>
                    <Button color='green'  basic onClick={makeComment}>
                        <Icon name='comments' />
                    </Button>
                    <Label as='a' basic color='green' pointing='left'>
                        {commentCount}
                    </Label>
                </Button>
            </Card.Content>
        </Card>
    )
}

export default PostCard