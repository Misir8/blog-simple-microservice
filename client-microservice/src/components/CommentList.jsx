import React from 'react';

const CommentList = ({comments}) => {
    console.log(comments)

    const renderedComments = comments?.map(comment => (
        <li key={comment.id}>{comment.content}</li>
    ))

    return (
        <div>
            <ul>
                {renderedComments}
            </ul>
        </div>
    );
};

export default CommentList;
