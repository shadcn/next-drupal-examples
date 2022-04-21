# Example CRUD

An example showing how you can implement authentication and CRUD with next-drupal and next-auth.

We're using Password Grant for authentication.

## Documentation

1. `/pages/api/auth/[...nextauth].ts` and `/pages/_app.tsx` for next-auth implementation.
2. `/pages/index.tsx` for handling sign in, redirects and session.
3. `/pages/api/articles` for an API route for handling POST requests.

See https://next-drupal.org
