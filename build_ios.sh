#!/bin/bash

# Update dependencies
npm install

# Run ionic build
ionic build

# Copy the build to the iOS project
ionic cap copy ios

# Open the iOS project in Xcode
ionic cap open ios