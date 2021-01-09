import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { FETCH_POSTS } from '../util/graphql';
import { useForm } from '../util/hooks';

function PostForm(){
    
    const {onSubmit, onChange, values} = useForm(createPostCB, {body: ""});

    const [createPost, {error}] = useMutation(CREATE_POST, {
        update(proxy, result){
            const data = proxy.readQuery({
                query: FETCH_POSTS
            });
            const newData = {...data};
            newData.getPosts = [result.data.createPost, ...data.getPosts];
            console.log('3', newData)
            proxy.writeQuery({ query: FETCH_POSTS, data: newData });
            values.body = '';
        },
        onError(err){
            console.log(err);
        },
        variables: values
    });

    function createPostCB(){
        createPost();
    }
    
    return(
        <>
            <Form onSubmit={onSubmit}>
                <h2>Create a Post:</h2>
                <Form.Field>
                    <Form.Input
                        placeholder="Hi"
                        name="body"
                        onChange={onChange}
                        value={values.body}
                        error={error ? true : false}
                    />
                    <Button type="submit" color="teal" basic>
                        SUBMIT
                    </Button>
                </Form.Field>
            </Form>
            {
                error && (
                    <div className="ui error message" style={{marginBottom: 20}}>
                        <ul className='list'>
                            <li>{error.graphQLErrors[0].message}</li>
                        </ul>
                    </div>
                )
            }    
        </>
    )
}

const CREATE_POST = gql`
    mutation createPost(
            $body: String!
        ){
            createPost(body: $body){
                id
                body
                username
                createdAt
                likeCount
                commentCount
                likes{
                    username
                    createdAt
                }
                comments{
                    id
                    body
                    username
                    createdAt
                }
            }
        }

    
`

export default PostForm