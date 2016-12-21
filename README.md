# geosourcer
[Demo](http://geosourcer.herokuapp.com/)
[DevPost Submission](https://devpost.com/software/geosourcer);

![Geosourcer: Analyze smart, not hard.](/client/assets/images/screenshot1.png?raw=true "Optional Title")

## Classify satellite images with crowdsourcing
Advancements in deep learning and other machine learning image analysis techniques has revolutionized the way we analyze geospatial data. But you know what's still incredibly difficult? Getting labeled training data.

Geosourcer crowdsources image analysis to a large population of volunteers or trained assistants. By distributing this analysis, you can receive labeled data much faster than from a small handful of analysts.

Once this data is received, you can easily upload it into analysis tools to review and build a scalable model. Not only are you increasing your human power by 10x, you can then extend it 1000x with machine learning.

Analyze smart, not hard.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node >= 4.x.x, npm >= 2.x.x
- [Gulp](http://gulpjs.com/) (`npm install --global gulp`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

3. Run `gulp serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `gulp build` for building and `gulp serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
