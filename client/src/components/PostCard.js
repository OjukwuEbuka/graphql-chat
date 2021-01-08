import React from 'react';
import moment from 'moment';
import {Card, Image, Label} from 'semantic-ui-react';

function PostCard(props){
    const {body, createdAt, id, username, likeCount, commentCount, likes, comments} = props.post;

    return (
        <Card>
            <Card.Content>
                <Image floated="right" size='mini' src='https://react.semantic-ui.com/images/avatar/large/molly.png' />
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <p>buttons</p>
            </Card.Content>
        </Card>
    )
}

export default PostCard