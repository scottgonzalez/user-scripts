// ==UserScript==
// @name         AWS CloudWatch Useful View
// @namespace    http://nemikor.com
// @version      0.1
// @description  Enable wrapping for logs so you can actually see the data!
// @author       Scott González
// @match        https://console.aws.amazon.com/cloudwatch/*
// @grant        none
// ==/UserScript==

(function() {

var style = document.createElement('style')
style.innerHTML = 'body .GIYU-ANBO3 .json { white-space: pre-wrap !important; }'
document.head.appendChild(style)

})()
