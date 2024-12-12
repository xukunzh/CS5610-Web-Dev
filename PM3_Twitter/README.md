# CS5610 Project3

### Collaborators: Lingyun Xiao & Xukun Zhang

## Project Overview

The goal of **CS5610 Project3** was to build a full-stack web application that enables users to create, view, and interact with posts. The application supports secure user authentication, image handling, and a dynamic user interface. The project was implemented using React, Node.js, Express, and MongoDB.

### Key Features

1. **User Authentication**  
   We implemented secure user registration and login using **JWT** (JSON Web Tokens) and **bcrypt** for password hashing. Users can create an account, log in securely, and maintain their session throughout their interactions with the app.

2. **Post Creation & Management**  
   Users can create posts with images and text. The application allows users to edit and delete their posts. We implemented a **base64 encoding** approach for storing images, which simplifies integration and improves UI display by directly embedding the images into the posts.

3. **Image Handling**  
   The project handles image uploads effectively by encoding images as **base64**, ensuring quick processing and simplified management. We optimized the UI for efficient image display while ensuring the images are properly handled in the backend.

4. **Dynamic Content with React**  
   The frontend of the application is built with **React**, leveraging **React Context** for managing state such as user authentication status. This approach ensures that the user’s session is tracked, and protected routes are maintained throughout the application.

5. **RESTful API Integration**  
   A RESTful API was developed to handle data requests between the frontend and the backend. The API supports user management, post creation, and retrieving user-specific posts, such as `localhost:5001/api/posts/:username`.

6. **Deployment on Render**  
   After completing development, the application was deployed on **Render**, a cloud platform for web app hosting. The deployment process involved configuring environment variables securely and ensuring that the app runs smoothly in the cloud environment.

## Challenges Overcome

- **Secure Password Storage**: Ensuring passwords were stored securely was a top priority. By using bcrypt, we ensured user credentials were properly hashed and protected.
- **Image Handling**: Initial difficulties with file uploads and image size led to the adoption of base64 encoding, which made the process more efficient.
- **User Authentication Flow**: Implementing secure authentication with JWT and maintaining user sessions required careful planning and integration of React’s context management.
- **API Design**: Designing APIs to efficiently fetch posts and handle user data was essential for smooth user experience and app functionality.

## Achievements

1. **Fully Functional Web Application**  
   We successfully built a **full-stack web app** that allows users to register, log in, create, and manage posts. The integration of secure user authentication and image handling was a major accomplishment.
   
2. **Optimized Image Management**  
   By switching to **base64 encoding** for images, we reduced complexity in the backend and improved the UI display, allowing for faster and more efficient image handling.

3. **Seamless Authentication & State Management**  
   The **React Context** and **JWT** authentication system provide a smooth user experience, ensuring secure login, session management, and protected routes.

4. **Scalable and Maintainable Code**  
   The app is built with **scalability** in mind. The RESTful API design and React’s component structure allow for easy future updates and feature additions, such as likes, comments, and post categorization.

5. **Successful Deployment**  
   The application is live and fully operational on **Render**, demonstrating the effectiveness of cloud deployment and environment configuration.

## Potential Improvements

While the project is fully functional, there are several areas for potential enhancement:

- **Advanced Image Handling**: Implement image compression before storage to optimize performance, and support for multiple images per post.
- **Real-time Features**: Add **real-time updates** for posts, such as comments, likes, and notifications.
- **Enhanced User Experience**: Introduce **pagination** or **infinite scrolling** for better navigation and to handle large amounts of posts efficiently.
- **Additional Social Features**: Implement a **user following system**, **post likes**, **comments**, and **hashtags** for post categorization.

## Conclusion

This project successfully demonstrates the use of modern web development techniques, including React for the frontend, Node.js and Express for the backend, and MongoDB for data storage. The application meets the requirements of creating and managing user posts with secure authentication and optimized image handling. Moving forward, additional features and optimizations will be introduced to further enhance the user experience.
