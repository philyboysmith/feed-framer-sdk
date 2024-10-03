# Feed Framer SDK

Embedding your instagram feed should be free and easy. That's why we created feed framer. Once you're set up on feed-framer.com you can use this SDK to embed your Instagram Business or Creator feed into your website.

## Getting Started

Create an account on [Feed Framer](https://feedframer.com/) and add your Instagram account. Take note of your accountId and create an API token at [https://feedframer.com/user/api-tokens](https://feedframer.com/user/api-tokens)

## Installation

There are 2 ways to include Feed Framer in your project

* Including it from a <script> tag
* Importing it as a module

Either is perfectly valid. It all depends on the project's needs and the developer's taste.

### From a script tag

This is by far the simplest way to get started with Feed Framer. Include the following <script> tag in your HTML page.

<script defer src="https://unpkg.com/feed-framer-sdk@1.x.x/dist/index.umd.js"></script>

### Add a module

If you prefer the more robust approach, you can install Feed Framer via NPM and import it into a bundle.

Run the following command to install it.

```
npm install feed-framer-sdk
```


## Initialize the SDK

```
 const feedFramer = new FeedFramer({apiToken: 'YOUR_API_TOKEN'});
```

### Run the init function to render the widget

```
feedFramer.init({
    accountId: 'YOUR_ACCOUNT_ID',
    // add configuration options here
});
```

For a full list of configurable options, visit (documentation)[https://feedframer.com/documentation]
