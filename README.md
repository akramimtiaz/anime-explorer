
# 🌐 Frontend Development Challenge 
This project was undertaken as part of Kasagi Labo's interview process.

### How to run project

* `npm install`
* `npm start`

### Progress

| Feature / Requirement | Initial Submission | Current State |
|------------------------|--------------------|---------------|
| Fetch data from the Jikan API | ✅ | ✅ |
| Show a list of anime with image, title, and score | ✅ | ✅ |
| Implement pagination (infinite scroll or “Load More”) | ✅ | ✅ |
| Navigate to Anime Detail Screen on tap | ✅ | ✅ |
| Show synopsis, genres, score, and other info | ☑️ | ☑️ |
| Allow users to “favorite” an anime | ✅ | ✅ |
| Store favorites locally (AsyncStorage or MMKV) | ✅ | ✅ |
| Favorites persist on app reload | ✅ | ✅ |
| Favorites tab to view saved items | ✅ | ✅ |
| Add a genre dropdown/filter | ☑️ | ☑️ |
| Use Jikan API genre filtering or client filtering | ✅ | ✅ |
| Responsive design for different screen sizes | ❌ | ❌ |
| Placeholder/loading states | ❌  | ✅ |
| Handle API errors gracefully | ☑️ | ❌ |
| Use TypeScript / React Native / React JS (Bonus) | ✅ | ✅ |
| Add animations (e.g., heart animation) | ❌ | ✅ |
| Use a state manager (Zustand/Redux/Context) | ✅ | ✅ |
| Write unit/integration tests | ❌ | ❌ |
| Implement deep linking or share functionality | ❌ | ❌ |

### Objective

Build a simplified “Anime Explorer” app that lists anime, lets users view details, mark favorites, and filter by genre. This will evaluate your skills in:

* Frontend architecture
* Navigation
* API consumption
* State management
* Component design
* Basic animations or interactions

### Requirements

1. Anime List Screen

    * Fetch data from the [Jikan API](https://docs.api.jikan.moe/#tag/anime) (e.g., https://api.jikan.moe/v4/anime).
    * Show a list of anime with image, title, and score.
    * Implement pagination (infinite scroll or “Load More”).

2. Anime Detail Screen

    * When a user taps an anime, navigate to a detail screen.
    * Show synopsis, genres, score, and other relevant info.

3. Favorites Feature

    * Allow users to “favorite” an anime.
    * Store favorites locally (using AsyncStorage or MMKV).
    * Favorites persist on app reload.
    * Optional: Provide a Favorites tab to view saved items.

4. Filter by Genre

    * Add a dropdown/filter component to filter anime by genre.
    * Use the Jikan API genre filtering if possible, or do client-side filtering.

5. Basic Styling and UX

    * Responsive design for different screen sizes.
    * Use placeholder/loading UI states.
    * Handle API errors gracefully.

### Bonus Points (Optional)
* Use TypeScript / React Native / React JS.
* Add animations (e.g., favoriting with a heart animation).
* Use a state manager (Zustand, Redux Toolkit, or React Context).
* Write basic unit tests (Jest) or integration tests (React Native Testing Library).
* Implement deep linking or share functionality.
* Code-splitting and performance optimization.

### Tools You Can Use
* React Navigation
* Axios or Fetch
* React Native Reanimated or LayoutAnimation (for animations)
* Any component library or styling approach (Tailwind, Styled Components, etc.)