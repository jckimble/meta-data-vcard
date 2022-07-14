meta-data-vcard
=====

[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release) ![build status](https://github.com/jckimble/meta-data-vcard/actions/workflows/release.yml/badge.svg?branch=master) ![license](https://img.shields.io/npm/l/meta-data-vcard) [![npm version](https://img.shields.io/npm/v/meta-data-vcard)](https://www.npmjs.com/package/meta-data-vcard)

Create vCards to import contacts into Outlook, iOS, Mac OS, and Android devices from your website using data properties.

## Install

```sh
npm install meta-data-vcard --save
```

## Usage

Below is a simple example of how to use. An working example is on [jckimble.com](https://jckimble.com)

### Basic vCard

```js
import vCard from 'meta-data-vcard';

//create a new vCard
var vcard = new vCard();

//get string
console.log(vcard.String())

//get data url
console.log(vcard.toDataURL())

```

## Testing

You can run the vCard unit tests via `npm`:

```sh
npm test
```

## Contributions

Contributions are always welcome!

## Donations

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/jckimble)

## License
Copyright (c) 2022 James C Kimble