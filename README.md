# Improved-Steamgifts

Improves [steamgifts.com](https://www.steamgifts.com/) user experience making navigation more fluid and decreasing steps necessary to accomplish the participation in a giveaway.

It's inspirated in [Extended Steamgifts](https://github.com/nandee95/Extended_Steamgifts) and [Steamgifts Auto Entry Enhanced](https://greasyfork.org/en/scripts/29140-steamgifts-auto-entry-enhanced), but a much simpler, lightweight and faster alternative.

## Usage

1. Download Tampermonkey:
    - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
    - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=pt-BR)
2. Access Tampermonkey Dashboard
3. Access Utilities Tab
4. Import URL: `https://raw.githubusercontent.com/guilima/Improved-Steamgifts/master/improved-sg.js`


## Features

- At list pages
  - Entry button.
  - Infinite scroller.
  - Remove entered giveaways.
  - Hidden button giveaway without popout confirmation
- Support fixed header.


## Why?

Some similar projects required several extra steps to work, external plugins/add-on or are outdated. For example, nowadays isn't necessary to call an `iframe` and mount the html from a xhr on it.

I wanted an organized code and good performance. I checked some popular options but failed to comprehend its authoring workflow. So now decided to create a new snippet which is both flexible and straightforward.


## Q & A

- Can i help to maintain the code by opening PR?
    - Yes. Bugfix are welcomed. New features too, but first see the **Todo** section.
- What you suggest when opening PRs ?
    - Some organization, clean code and human friendly namings. 
- What's the main differences between Improved Steamgifts and similar projects?
    - Simpler, lightweight and faster.

## Todo

- Code refactoring
- Automated giveaways entry
  - Filtered by name (probably going to use _Steamgifts Auto Entry Enhanced_ structure)
  - Ignoring entered giveaways
  - Calculating points
