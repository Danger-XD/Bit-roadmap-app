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
### Backend Links (Restful API):
- For authentication:
    - https://bit-roadmap-app.vercel.app/api/v1/users/signup
    - https://bit-roadmap-app.vercel.app/api/v1/users/login
- For posts (Not Secured):
    - https://bit-roadmap-app.vercel.app/api/v1/posts/get/all/posts
    - https://bit-roadmap-app.vercel.app/api/v1/posts/get/by/category/:categoryId
    - https://bit-roadmap-app.vercel.app/api/v1/posts/roadmap/:postId
    - https://bit-roadmap-app.vercel.app/api/v1/posts/get/all/upvote/of/post/:postId
- For comments (Secured):
    - https://bit-roadmap-app.vercel.app/api/v1/post/comment/c/create/:postId
    - https://bit-roadmap-app.vercel.app/api/v1/post/comment/c/delete/:postId
- For upvotes (Secured):
    - https://bit-roadmap-app.vercel.app/api/v1/post/upvote/toggle/:postId
- For upvotes (Secured):
    - https://bit-roadmap-app.vercel.app/api/v1/post/comment/reply/r/:commentId

## API routes documentation: https://documenter.getpostman.com/view/28040830/2sB2xCipq6
* Post category must be within these three. (Beginner/Intermediate/Advanced and Popularity)
