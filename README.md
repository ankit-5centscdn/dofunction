# Node

## Introduction

This repository contains a node function written in Node.js. You can deploy it on DigitalOcean's App Platform as a Serverless Function component.

### Requirements

* You need a DigitalOcean account. If you don't already have one, you can sign up at [https://cloud.digitalocean.com/registrations/new](https://cloud.digitalocean.com/registrations/new).

## Deploying the Function
$ doctl auth unit (login by secret key)
$ doctl serverless connect Namespaces-Name
$ doctl serverless deploy node
or
$ doctl serverless watch node


### Learn More

You can learn more about App Platform and how to manage and update your application in [the official App Platform Documentation](https://www.digitalocean.com/docs/app-platform/).
