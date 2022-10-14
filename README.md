# Compress app Backend

This project transforms and compresses images to .webp

## Installation

Install my project with yarn

```bash
  yarn install
```
    
## Deployment

To deploy this project run, then check http://localhost:3000

```bash
  yarn dev
```

## API Reference

#### Test

```http
  GET /
```
#### Upload file

```http
  GET /api/file?quality=80&format-filename=true&ajust-image=true
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `quality`      | `number` | **Required**. Quality image from 1 to 100 |
| `format-filename`      | `boolean` | **Required**. Replace blank space from filename with dash |
| `ajust-image`      | `boolean` | **Required**. Set width image to 1920px if it greater than 1920px |

## Authors

- [@alexhuamanyana](https://github.com/biersack0)