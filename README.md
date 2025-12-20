# Vidtube 
Video streaming and tweeting platform 

## tech stack

- React
- Shadcn UI library
- Redux (state management)
- tailwindcss
- axios 
- typescript

## project structure

```bash
├── components.json 
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── public
├── README.md
├── src
│   ├── api
│   │   ├── axiosInstance.ts
│   │   ├── comment
│   │   │   ├── commentApi.ts
│   │   │   └── commentApi.types.ts
│   │   ├── like
│   │   │   ├── likeApi.ts
│   │   │   └── likeApi.types.ts
│   │   ├── susbscriptionApi.ts
│   │   ├── susbscriptonApi.types.ts
│   │   ├── tweet
│   │   │   ├── tweetApi.ts
│   │   │   └── tweetApi.types.ts
│   │   ├── userApi.ts
│   │   ├── userApi.types.ts
│   │   ├── videoApi.ts
│   │   └── videoApi.types.ts
│   ├── app
│   │   ├── hooks.ts
│   │   └── store.ts
│   ├── App.tsx
│   ├── assets
│   ├── components
│   │   ├── common
│   │   │   ├── EmptyState.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── Loader.tsx
│   │   ├── layout
│   │   │   ├── Layout.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── VideoCard.tsx
│   │   ├── ui
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── skeleton.tsx
│   │   │   └── textarea.tsx
│   │   └── video
│   │       └── videoList.tsx
│   ├── conf
│   │   └── conf.ts
│   ├── features
│   │   ├── comment
│   │   │   ├── commentSlice.ts
│   │   │   ├── commentThunks.ts
│   │   │   └── types.ts
│   │   ├── like
│   │   │   ├── likeSlice.ts
│   │   │   ├── likeThunks.ts
│   │   │   └── types.ts
│   │   ├── subscription
│   │   │   ├── subscriptionThunks.ts
│   │   │   ├── susbcriptionSlice.ts
│   │   │   └── types.ts
│   │   ├── tweet
│   │   │   ├── tweetSlice.ts
│   │   │   ├── tweetThunks.ts
│   │   │   └── types.ts
│   │   ├── ui
│   │   │   └── uiSlice.ts
│   │   ├── user
│   │   │   ├── types.ts
│   │   │   ├── userSlice.ts
│   │   │   └── userThunks.ts
│   │   └── video
│   │       ├── types.ts
│   │       ├── videoSlice.ts
│   │       └── videoThunks.ts
│   ├── hooks
│   │   ├── useAuth.ts
│   │   ├── useDebouncedCallback.ts
│   │   ├── useDebounce.ts
│   │   ├── useFetch.ts
│   │   └── useToast.ts
│   ├── index.css
│   ├── lib
│   │   └── utils.ts
│   ├── main.tsx
│   ├── pages
│   │   ├── auth
│   │   │   ├── ForgotPassword.tsx
│   │   │   └── ResetPassword.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   ├── subscription
│   │   │   ├── ChannelPage.tsx
│   │   │   └── SubscriptionsPage.tsx
│   │   ├── tweet
│   │   │   └── TweetPage.tsx
│   │   ├── Upload.tsx
│   │   ├── video
│   │   │   ├── UserVideos.tsx
│   │   │   └── VideoPage.tsx
│   │   └── VideoDetail.tsx
│   ├── routes
│   │   ├── AppRoutes.tsx
│   │   ├── PrivateRoute.tsx
│   │   ├── PublicRoute.tsx
│   │   └── RouteConfig.jsx
│   ├── types
│   │   └── global.d.ts
│   └── utls
│       ├── contants.ts
│       ├── helpers.ts
│       └── logger.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Installation & setup

```bash
 git clone https://github.com/Mayank9056-MM/vidtube-frontend
 cd vidtube-frontend
 npm install
 npm run dev
```