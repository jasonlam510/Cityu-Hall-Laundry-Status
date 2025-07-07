# CityU-Hall-Laundry-Status

City University of Hong Kong provides an official app to look up which washing machine or dryer is taken or free in each hall, but it needs a cumbersome authentication procedure including Okta Verify. This website is its convenient alternative; it simply retrieves information from the API that the app internally fetches, and shows it to public. Users can look up laundry status with no authentication.

## Features

- Real-time laundry machine status for all CityU residence halls (Halls 1-17, excluding Hall 13)
- Automatic refresh every 10 seconds
- Visual indicators for machine availability, in-use status, and out-of-service machines
- Responsive design for mobile and desktop
- Hall selection via dropdown menu
- URL parameters for direct hall access

## TODO

- Add dark mode theme
- Add a promotions section (e.g., for hall events, Hall Orientation, etc.)
- Build a recommendation system to suggest off-peak laundry times. Requires collecting usage data over time, since no official historical API is available.

## Disclaimer

This project uses the same laundry status API with the official mobile app. Please respect its intended use and avoid abusive or excessive requests.
