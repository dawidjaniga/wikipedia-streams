# Wikipedia Streams

[![Netlify Status](https://api.netlify.com/api/v1/badges/e554302f-c035-48d3-a595-4daae4915491/deploy-status)](https://app.netlify.com/sites/wikipedia-streams/deploys)

## Live demo

https://wikipedia-streams.netlify.app

## Showcase

![Wikipedia Streams showcase](showcase.gif)

## Rationale

I've created this project as programming excercise. I wanted to practice usage of Factory Method pattern in React world.

The idea is to show list of recent changes made on Wikipedia in Real Time. Wikipedia provides messages stream with _type_ (edit, new, categorize, log). Every type can have different data and we might want to add different behaviour for them (like onNotificationClick, onUserClick etc). _NotificationsFactory_ is used to achive the above, via creation of _Notification_ components, based on _type_.

Messages are sent from Wikipedia in one-way stream, called _Server-sent event_. It operates on HTTP and use _EventSource_ in the browser for receiving data.

## More info

https://en.wikipedia.org/wiki/Factory_method_pattern  
https://sourcemaking.com/design_patterns/factory_method   
https://en.wikipedia.org/wiki/Server-sent_events  
https://developer.mozilla.org/en-US/docs/Web/API/EventSource  
https://wikitech.wikimedia.org/wiki/Event_Platform/EventStreams 
