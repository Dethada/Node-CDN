# Node CDN

Simple nodejs cdn based on [Formidable](https://github.com/felixge/node-formidable)

## Features

Currently only supports files uploads, no file deletion.

## Usage

Send POST request to the app, with a token header containing the token you set in your environment variable.

> If you want to test using `uploadform.html` remove or comment out `&& req.headers['token'] === process.env.CDN_TOKEN` .

