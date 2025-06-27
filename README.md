# Bit-roadmap-app
A MERN stack website for a roadmap website.

# How to start
- First clone the repository
- Setup server: 
- Terminal: cd server -> ```npm i``` - 
- create .env file and paste the contents and add required data
- run via postman routes to check apis
- Setup frontend:
- Terminal: cd.. -> cd client -> ```npm i``` ->npx vite

### the .env file contents for server
- SERVER_PORT
- SERVER_DATABASE_URL
- SERVER_SALT_ROUND
- SERVER_JWT_KEY
- SERVER_JWT_EXPIRY_TIME
- SERVER_TOKEN_HTTP
- SERVER_NODE_ENV

## Backend live base link (Restful API): https://bit-roadmap-app.vercel.app/
### Backend Links:
- For authentication:
    - Sign up page [click here](https://bit-roadmap-app.vercel.app/api/v1/users/signup)
    - Login page [click here](https://bit-roadmap-app.vercel.app/api/v1/users/login)
    - Logout page [click here](https://bit-roadmap-app.vercel.app/api/v1/users/logout)
- For posts (Not Secured):
    - Get all the posts Api [click here](https://bit-roadmap-app.vercel.app/api/v1/posts/get/all/posts)
    - Get all the posts by category* filter [click here](https://bit-roadmap-app.vercel.app/api/v1/posts/get/by/category/:categoryId)
    - Get single posts Api [click here](https://bit-roadmap-app.vercel.app/api/v1/posts/roadmap/:postId)
    - Get single post's up-votes count Api [click here](https://bit-roadmap-app.vercel.app/api/v1/posts/get/all/upvote/of/post/:postId)
- For comments (Secured):
    - To comment on a post Api [click here](https://bit-roadmap-app.vercel.app/api/v1/post/comment/c/create/:postId)
    - To delete a comment on a post Api [click here](https://bit-roadmap-app.vercel.app/api/v1/post/comment/c/delete/:postId)
- For upvotes (Secured):
    - To toggle a like on a post Api [click here](https://bit-roadmap-app.vercel.app/api/v1/post/upvote/toggle/:postId)
- For upvotes (Secured):
    - To reply to a comment on a post Api [click here](https://bit-roadmap-app.vercel.app/api/v1/post/comment/reply/r/:commentId)

## API routes documentation: https://documenter.getpostman.com/view/28040830/2sB2xCipq6
* Post category must be within these three. (Beginner/Intermediate/Advanced and Popularity)
