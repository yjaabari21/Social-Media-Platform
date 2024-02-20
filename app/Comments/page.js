"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const UsersPostsComments = () => {
  const [usersPostsComments, setUsersPostsComments] = useState([]);

  useEffect(() => {
    const fetchUsersPostsComments = async () => {
      try {
        const usersResponse = await axios.get('https://jsonplaceholder.typicode.com/users');
        const users = usersResponse.data;

        const postsResponse = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = postsResponse.data;

        const commentsResponse = await axios.get('https://jsonplaceholder.typicode.com/comments');
        const comments = commentsResponse.data;

        const usersPostsCommentsData = users.map(user => {
          const userPosts = posts.filter(post => post.userId === user.id);
          const userPostsWithComments = userPosts.map(post => {
            const postComments = comments.filter(comment => comment.postId === post.id);
            return { ...post, comments: postComments };
          });
          return { user, posts: userPostsWithComments };
        });

        setUsersPostsComments(usersPostsCommentsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUsersPostsComments();
  }, []);

  return (
    <div class="main">
      {usersPostsComments.map(userPostsComments => (
        <div class="card" key={userPostsComments.user.id}>
          <h2 class="text-2xl text-blue-300 mb-4 font-bold">{userPostsComments.user.name}</h2>
          <a class="link" href="Details/">@{userPostsComments.user.username}</a>
          <h3>Posts : </h3>
          {userPostsComments.posts.map(post => (
            <div id='comContainer' className='bg-white p-6 rounded-lg shadow-lg' key={post.id}>
              <p className='posts font-bold mb-2 text-gray-800'>{post.title} {post.body}</p>
              <h3>Comments:</h3>
              <ul>
                {post.comments.map(comment => (
                  <li className='comment' key={comment.id}>
                    <FontAwesomeIcon icon={faUser} className='icon'/> {comment.name}<br />
                     {comment.body}
                    <hr/>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default UsersPostsComments;