import React, {useState} from 'react';
import axios from "axios";

const PostCreate = () => {
    const [title, setTitle] = useState('');
    const submitTitle = async event => {
        event.preventDefault();
        await axios.post('http://localhost:4000/posts', {
            title
        });
        setTitle('');
    }
    return (
        <div>
            <form onSubmit={submitTitle}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text"
                           className="form-control"
                           value={title}
                           onChange={(event) => setTitle(event.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;
