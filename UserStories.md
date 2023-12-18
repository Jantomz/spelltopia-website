# General User Stories

1. [ ] As a user, I want to view a home dashboard that allows me to browse global wordlists so that I can see all the possible resources
2. [ ] As a user, I want to view a home dashboard that allows me to search for other spelltopia users so that I can see the community

# Admin User Stories

1. [ ] As an admin, I want to be able to see the global list

# Speller User Stories

1. [ ] As a speller, I want to be able to login or sign up with an account so that I can have a personal track of my wordlists
2. [ ] As a speller, I want to be able to see a list of only my wordlists so that I can keep track of what I am studying
3. [ ] As a speller, I want to be able to pick a wordlist from my list of wordlists and preview the words so that I can study the wordlist
4. [ ] As a speller, I want to be able to go into practice mode for my wordlist and be prompted with the info for the word to test myself so that I can test myself on the wordlist
5. [ ] As a speller, I want to be able to see a list of the global wordlists so that I can choose which ones to add to my own list
6. [ ] As a speller, I want to be able to have a profile with a biography and wordlists I use so that I can be in the spelltopia community

# Contributor User Stories

1. [ ] As a contributor, I want to be able to see the global list of wordlists so that I can know what is available to spellers
2. [ ] As a contributor, I want to be able to see the list of wordlists that I have created so that I can keep track of my work
3. [ ] As a contributor, I want to be able to create a wordlist and fill in the information for my words so that I can provide wordlists to spellers
4. [ ] As a contributor, I want to be able to prevent publishing of my wordlists until they are done so that I can publish when the wordlist is ready
5. [ ] As a contributor, I want to be able to edit my published wordlists by putting them into editing mode so that I can make changes to the wordlist if needed
6. [ ] As a contributor, I want to have a profile with a biography and wordlists I have created so that I can be in the spelltopia community

# To Do:

1. Make the admin able to add wordlists
2. Make the contributor be able to edit wordlists
3. Make the user be able to view and practice wordlists and add to their list of wordlists that they use
4. Assign users to a wordlist

# Where I ended off:

1. [x] I am trying to show the wordlist details on the wordlist dashboard, I can maybe just make one api call instead of nested ones
2. [x] Make the wordlist details a one time fetch call and then make a wordlists context to have the array of objects of the wordlists
3. Make sure a user can only be placed as one type of user on a wordlist
4. [x] Make the self-test
5. Make it so that everytime they leave a wordlist, the global context gets reset
6. Make an upload feature for the wordlist so that it can be uploaded
7. Make validation for backend, so you can't put multiple users as different roles on a wordlist or put a user more than once
8. Make validation for viewing wordlists, must be a user added as a contributor user or owner to view or practice
9. [x] Add honeypot
10. Make it so that contributor can be assigned or contribute to a wordlist, but a user cannot be added as a contributor
