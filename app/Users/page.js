"use client"
import React from 'react';
import axios from 'axios';
import "../globals.css";
import Comment from '../Comments/page';

const Users = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
  .then(usersResponse =>{
    const users = usersResponse.data;
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(postsResponse => {
        const posts = postsResponse.data;
        const usersContainer = document.getElementById('usersContainer');
        users.forEach(user => {
          const userPosts = posts.filter(post => post.userId === user.id);
          console.log(userPosts);
          const userDiv = document.createElement('div');
          userDiv.innerHTML = `
          <div class="card">
            <h1 class="text-2xl text-blue-300 mb-4 font-bold">${user.name}</h1>
            <a class="link" href="Details/${user.id}">@${user.username}</a>
            <h3>Posts:</h3>
          `;
          usersContainer.appendChild(userDiv);
          <Comment />
        });
        //usersContainer.innerHTML = "" ;
      })
      
      .catch(postsError => console.error('Error fetching posts', postsError));
  })
  .catch(usersError => console.error('Error fetching users', usersError));
  return (
      <>
        <Comment />
      </>
  )
}

export default Users
