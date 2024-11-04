## Getting started

```bash
# Clone repository
git clone git@git.chalmers.se:courses/dit342/group-00-web.git

# Change into the directory
cd group-00-web

# Setup backend
cd server && npm install
npm run dev

# Setup frontend
cd client && npm install
npm run serve
```

> Check out the detailed instructions for [backend](./server/README.md) and [frontend](./client/README.md).

## Visual Studio Code (VSCode)

Open the `server` and `client` in separate VSCode workspaces or open the combined [backend-frontend.code-workspace](./backend-frontend.code-workspace). Otherwise, workspace-specific settings don't work properly.

### Purpose

VolunteerConnect is a platform designed to link volunteers with organizations and events that need their support. It serves as a central hub where volunteers can discover opportunities, sign up for events and provide feedback. Similarly, organizations can post volunteer opportunities.

The system aims to facilitate the management of volunteer efforts, ensuring that volunteers can easily find causes to support while organizations can efficiently manage their volunteer workforce.

### Pages

**Volunteers:**

* Home (Public): The starting point for volunteers, showcasing upcoming events and personalized recommendations.
* Opportunity Listing (Public): A list of available volunteering opportunities for users to browse.
* Opportunity Details (Public): Detailed view of a selected opportunity with event-specific information.
* Profile: A volunteer’s personal page for managing their details and viewing history.

**Organizations:**

* Listing  (Public)
* Create Opportunity: Create a new opportunity.
* Organization Profile (Public): Showcasing organization's mission and events

**Common:**

* Login/Registration: Entry point for users to log in or create a new account.

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
