---
name: paperclip-create-plugin
title: Paperclip Create Plugin
category: meta
creator: paperclip
organization: Paperclip
description: Create new Paperclip plugins with alpha SDK
tags:
  - plugins
  - sdk
  - development
source: paperclip
---

Paperclip Create Plugin scaffolds and guides the development of new plugins for the Paperclip platform using the alpha SDK. It generates the plugin boilerplate including manifest configuration, capability declarations, hook registrations, and test harnesses. The skill understands the plugin lifecycle and ensures your plugin integrates correctly with the Paperclip control plane, skill registry, and agent runtime.

Use Paperclip Create Plugin when you want to extend Paperclip's functionality with custom integrations, when you need to connect a third-party service as a tool available to agents, or when building internal tooling that should be accessible through the Paperclip ecosystem. It accelerates plugin development by handling the scaffolding so you can focus on business logic.

Example: Run Paperclip Create Plugin to create a "Slack Notifier" plugin that sends task completion notifications to a Slack channel. The skill generates the plugin manifest, a handler function for the task.completed event hook, configuration schema for the Slack webhook URL, and a test suite that simulates task completion events against your handler.
