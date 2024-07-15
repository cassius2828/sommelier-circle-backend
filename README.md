# Sommelier Circle (Wine App)

## Overview

This app is a MERN stack application for an online wine community. It features the ability to create, edit, read, and delete blog posts, follow friends, and learn from a wine encyclopedia. Users can also see a list of different wines constructed through a custom API. The content, including images, design patterns, and descriptions, is inspired by wine-searcher.com. Note that all content is for demonstration purposes only and not owned by the app creators. The data generated for this app should not be valued over authenticated wine APIs.

## Features

- **Blog Posts**: Create, edit, read, and delete blog posts using a rich text editor (Quill).
- **Follow Friends**: Connect with other users and follow their activities.
- **Wine Encyclopedia**: Learn about different wines through an extensive wine encyclopedia.
- **Custom API**: View a list of wines generated through a custom API.

## Stretch Goals

- Upvoting blogs
- Commenting on blogs
- Viewing available tasting rooms and events via Google Places API
- Autocomplete search functionality
- In-depth critic details
- Adding rooms, wines, critics, and more to your favorites

## Development Challenges

### Quill Integration
Blog posts are created using Quill, a rich text editor. The development process for Quill was challenging, and some new functionalities could not be added due to a lack of support for Quill v2.

## Routing

Routing is managed via React Router. The routes are organized in a `routerConfig` folder and then consolidated in an index file. The Context API is used for state management when state needed to be outside the local scope.

## Styling

This application is styled using TailwindCSS, providing a modern and responsive design.

## Additional Packages

### Frontend Packages
- **Quill**: Rich text editor
- **TailwindCSS**: Utility-first CSS framework
- **GSAP**: Animation library
- **Axios**: Promise-based HTTP client
- **Iconscout**: Icon library
- **DOMPurify**: Library to sanitize HTML

### Backend Packages
- **Date-fns**: Date utility library
- **Multer**: Middleware for handling `multipart/form-data`, used for file uploads
- **Diacritics**: Library to remove diacritics from strings
- **Sanitize-html**: Library to sanitize HTML input



## Acknowledgements

Special thanks to wine-searcher.com for the inspiration and content used for demonstration purposes.

---

Feel free to explore the app and become part of an engaging and rewarding wine community. Cheers!