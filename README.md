# Backend and Frontend Template

Latest version: [https://git.chalmers.se/courses/dit342/group-00-web](https://git.chalmers.se/courses/dit342/group-00-web)

This template refers to itself as `group-00-web`. In your project, use your group number in place of `00`.

## Project Structure

| File                                              | Purpose                     | What you do?                             |
| ------------------------------------------------- | --------------------------- | ---------------------------------------- |
| `server/`                                       | Backend server code         | All your server code                     |
| [server/README.md](server/README.md)                 | Everything about the server | **READ ME** carefully!             |
| `client/`                                       | Frontend client code        | All your client code                     |
| [client/README.md](client/README.md)                 | Everything about the client | **READ ME** carefully!             |
| [docs/LOCAL_DEPLOYMENT.md](docs/LOCAL_DEPLOYMENT.md) | Local production deployment | Deploy your app local in production mode |

## Requirements

The version numbers in brackets indicate the tested versions but feel free to use more recent versions.
You can also use alternative tools if you know how to configure them (e.g., Firefox instead of Chrome).

* [Git](https://git-scm.com/) (v2) => [installation instructions](https://www.atlassian.com/git/tutorials/install-git)
  * [Add your Git username and set your email](https://docs.gitlab.com/ce/gitlab-basics/start-using-git.html#add-your-git-username-and-set-your-email)
    * `git config --global user.name "YOUR_USERNAME"` => check `git config --global user.name`
    * `git config --global user.email "email@example.com"` => check `git config --global user.email`
  * > **Windows users**: We recommend to use the [Git Bash](https://www.atlassian.com/git/tutorials/git-bash) shell from your Git installation or the Bash shell from the [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10) to run all shell commands for this project.
    >
* [Chalmers GitLab](https://git.chalmers.se/) => Login with your **Chalmers CID** choosing "Sign in with" **Chalmers Login**. (contact [support@chalmers.se](mailto:support@chalmers.se) if you don't have one)
  * DIT342 course group: [https://git.chalmers.se/courses/dit342](https://git.chalmers.se/courses/dit342)
  * [Setup SSH key with Gitlab](https://docs.gitlab.com/ee/ssh/)
    * Create an SSH key pair `ssh-keygen -t ed25519 -C "email@example.com"` (skip if you already have one)
    * Add your public SSH key to your Gitlab profile under [https://git.chalmers.se/profile/keys](https://git.chalmers.se/profile/keys)
    * Make sure the email you use to commit is registered under [https://git.chalmers.se/profile/emails](https://git.chalmers.se/profile/emails)
  * Checkout the [Backend-Frontend](https://git.chalmers.se/courses/dit342/group-00-web) template `git clone git@git.chalmers.se:courses/dit342/group-00-web.git`
* [Server Requirements](./server/README.md#Requirements)
* [Client Requirements](./client/README.md#Requirements)

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

## System Definition

### Purpose

VolunteerConnect is a platform designed to link volunteers with organizations and events that need their support. It serves as a central hub where volunteers can discover opportunities, sign up for events and provide feedback. Similarly, organizations can post volunteer opportunities.

The system aims to facilitate the management of volunteer efforts, ensuring that volunteers can easily find causes to support while organizations can efficiently manage their volunteer workforce.

### Pages

**Volunteers:**

* Home (Public): The starting point for volunteers, showcasing upcoming events and personalized recommendations.
* Opportunity Listing (Public): A list of available volunteering opportunities for users to browse.
* Opportunity Details (Public): Detailed view of a selected opportunity with event-specific information.
* Profile: A volunteer’s personal page for managing their details and viewing history.
* Feedback: Allows volunteers to leave feedback after participating in an event.

**Organizations:**

* Listing  (Public)
* Dashboard: organizations to manage their events and volunteers
* Opportunity Management: Manage events that belongs to this organization.
* Organization Profile (Public): Showcasing organization's mission and events

**Common:**

* Login/Registration: Entry point for users to log in or create a new account.

### Entity-Relationship (ER) Diagram

![ER Diagram](./images/er_diagram.png)

## Teaser (MS3)

![Teaser](./images/teaser.png)
