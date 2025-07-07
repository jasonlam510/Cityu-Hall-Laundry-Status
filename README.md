# CityU Hall Laundry Status Dashboard

A simple web dashboard that displays real-time laundry machine status for City University of Hong Kong residence halls, providing an alternative to the official mobile app.

## Motivation

We built this web laundry dashboard because the official way to look up the laundry status is very inefficient. Users often get stuck in a cycle of app updates, SMS verification, and repeated logins just to see the laundry status. This is very inconvenient and the stupid app was the only way to check the status. CityU hall residents need a better way to check the status without using the app.

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