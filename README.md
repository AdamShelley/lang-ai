# Lang-AI (Working Title)

## Description
LangAI is an AI-driven language learning application built for those who are eager to learn a new language at their own pace. This app leverages AI technologies to provide stories generated by AI, allowing a great quantity of material to practice with. 


## Installation
Download the WIP .apk from my website [adamshelley.com/projects/wip/Langai](https://adamshelley.com/projects/wip/Langai) and install it on your android device. You may need to enable installation from unknown sources in your settings.

## Features
- Stories and Pictures generated by AI.
- Pressed words show translation in English.
- Stories can be filtered by genre and level.
- Stories can be voted on by users if voting is enabled.
- Dark mode and Light mode.

## Tech Stack
- React Native
- Node.js
- Express
- Supabase
- OpenAI GPT
- DALL-E

## Known Issues
- Styling issues on very small/very large phones
- Some punctuation issues depending on AI model. Calibration needed.
- Light mode needs testing. 
- Icons are WIP.

## Versions


**0.1.0** (17/08/2023)
- Added Onboarding for the story page.

**0.0.7** (16/08/2023)
- Added intro overlay.
- Fixed some android styling/animation issues.

**0.0.6** (15/08/2023)
- Fixed a problem with dictionary not loading all words (WIP)
- Added more padding on android devices.
- Translation is now more readable.
- New icon
- When showing pinyin at different font sizes, it should jump less.
- Last week stories now show up on the home page (properly filtered).
- Story page styling improvements.


**0.0.5** (11/08/2023)
- Fixed heading border issue on stories page.
- Non-styling improvements to all pages.
- When the device is offline, the stories should now load correctly from cache.
- Data fetching optimized / Cleaned up. 
- On the backend - votes automatically calculated after duration has been reached. 
- Punctuation improvements on the backend. 


**0.0.4** (03/08/2023)
- Fixed haptics for android.
- Added loading skeleton for the home page.
- Internal code cleanup.

**0.0.3** (26/07/2023)
- Initial Public .apk release.




