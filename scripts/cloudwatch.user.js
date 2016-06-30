// ==UserScript==
// @name         AWS CloudWatch Useful View
// @namespace    http://nemikor.com
// @version      0.2
// @description  Improved JSON logs for AWS CloudWatch
// @author       Scott González
// @match        https://console.aws.amazon.com/cloudwatch/*
// @grant        none
// ==/UserScript==

const LOG_CONTAINER_SELECTOR = '.GIYU-ANBK2B'

// Don't let the content overflow the visible portion of the column
const style = document.createElement('style')
style.innerHTML = 'body .GIYU-ANBO3 .json { white-space: pre-wrap !important; }'
document.head.appendChild(style)

// Convert line breaks to actual line breaks to improve readability
function improveLogs (container) {
  const jsonLogs = container.querySelectorAll('.json')
  jsonLogs.forEach((jsonLog) => {
    jsonLog.querySelectorAll('.string').forEach((string) => {
      string.textContent = string.textContent.replace(/\\r\\n/g, '\n')
      string.textContent = string.textContent.replace(/(\\r|\\n)/g, '\n')
    })
  })
}

function waitForLogs () {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const container = document.querySelector(LOG_CONTAINER_SELECTOR)
      if (container) {
        clearInterval(interval)
        resolve(container)
      }
    }, 100)
  })
}

function watchForChanges (container) {
  const observer = new window.MutationObserver(function () {
    improveLogs(container)
  })
  observer.observe(container, { childList: true })
}

waitForLogs().then(watchForChanges)
