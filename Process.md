- There is a database of words
- The words have properties that determine the word
- The words also have a wordlist_id property
- There is a database of wordlists, each with an id
- Words belong to the wordlist that they have the id for

- When you request a wordlist, you use the id to find all the words associated, and place it in a state variable using dispatch, anytime a word is added, the dispatch wordlist id is called
