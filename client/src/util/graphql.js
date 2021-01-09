import {gql} from '@apollo/client'

export const FETCH_POSTS = gql`
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