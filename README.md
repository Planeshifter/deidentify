# deidentify

[![npm version](https://badge.fury.io/js/deidentify.svg)](https://badge.fury.io/js/deidentify)
[![dependencies Status](https://david-dm.org/planeshifter/deidentify/status.svg)](https://david-dm.org/planeshifter/deidentify)
[![devDependencies Status](https://david-dm.org/planeshifter/deidentify/dev-status.svg)](https://david-dm.org/planeshifter/deidentify?type=dev)

#### De-Identification of Free-Text Medical Record Data

| File Processing | Batch Processing |
|:------|:------|
| <img src="https://cdn.rawgit.com/Planeshifter/deidentify/9ad934e6800b979d711dd9626553f2fbe87a0ed6/docs/img/screenshot01.png" width="300px" alt="file"> | <img src="https://cdn.rawgit.com/Planeshifter/deidentify/9ad934e6800b979d711dd9626553f2fbe87a0ed6/docs/img/screenshot02.jpg" width="300px" alt="batch"> |

## Table of Contents

- [About](#about)
- [Features](#features)
- [Made using](#made-using)
- [Install](#install)
- [Documentation](#documentation)
- [License](#license)
- [Copyright](#copyright)

## About

> *deidentify* is a tool to remove personal identifiers from free-text medical record data. Detected identifiers are replaced by randomly generated substitutes. Consistency of the data is preserved as the same name, phone number or location will always be mapped to the same replacement.

## Features

- Facilities to remove all relevant identifiers of individuals from medical record information to comply with the [HIPAA "Safe Harbor" rule](http://www.hhs.gov/ocr/privacy/hipaa/understanding/coveredentities/De-identification/guidance.html)
- Single file and batch processing
- Customizable options
- Persistent data store ensures consistency of mappings and allows re-identification of the de-identified data

## Made using

The *deidentify* tool uses several open-source projects.

The desktop application was created with [nw.js](http://nwjs.io/), formerly called *node-webkit*, and is entirely written in JavaScript.

Our de-identification procedure combines hand-crafted regular expressions with the named entity recognizer (NER) developed by the Stanford Natural Language Processing Group, which provides a Conditional Random Field (CRF) model for detecting the three classes PERSON, ORGANIZATION, LOCATION.

Reference:
> Finkel, J. R., Grenager, T., & Manning, C. (2005). Incorporating non-local information into information extraction systems by gibbs sampling. In Acl, (1995), 363 – 370. doi:10.3115/1219840.1219885

To generate random replacements for detected identifiers, the [chance.js](http://chancejs.com/) library is used. [NeDB](https://github.com/louischatriot/nedb) is used as a data store, keeping track of the mappings from original identifiers to replacements.

Other used libraries include

- [async](https://github.com/caolan/async)
- [bootstrap](http://getbootstrap.com/)
- [jQuery](http://jquery.com/)

## Install

Installers for Windows, MacOS and Linux can be downloaded from the [releases page](https://github.com/Planeshifter/deidentify/releases).

---
## License

This project is licensed under the [GNU General Public License v2.0](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html).

## Copyright

Copyright &copy; 2015-2016. Philipp Burckhardt.
