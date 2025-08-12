<img width="1321" height="651" alt="image" src="https://github.com/user-attachments/assets/8691120b-2b2f-4e96-b198-fff67563d848" />
# GenAI Tokenizer (Assignment-01)

This is a small React app I made for learning how tokenization works.  
It takes any text, splits it into words, numbers, symbols, and spaces using regex,  
then turns them into tokens. You can also decode the tokens back into the original text.

## How it works

- Uses regex: `\w+|\d+|[^\w\s]|\s+`
- Each unique part of the text gets its own token ID
- Token maps are saved so repeated runs don’t start from scratch

## Tech used

- React
- TailwindCSS
- JavaScript

## Run it

```bash
npm install
npm run dev
```
