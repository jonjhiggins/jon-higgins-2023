---
date: 2023-08-07T00:00:00.000Z
title: Object-orientated fundamentals
description: "Re-visiting the fundamentals of object-orientated programming as part of improving my C# knowledge"
heroImages:
  - alt: Abstract photo of a swimming pool
    image: /assets/object-orientated.jpg
thumbnail:
  - alt: Abstract photo of a swimming pool
    image: /assets/object-orientated.jpg
xrMa: false
hide: false
archive: false
category: words
---

I revisited object-orientated principles via the LinkedIn Learning course [Programming Foundations: Object-orientated design](https://www.linkedin.com/learning/programming-foundations-object-oriented-design-3). While I have previously used basic OO features of Javascript, most teams I’ve been on favoured a functional style. The course also suggests a formalised, holistic approach to technical planning that is easy to follow and I am interested to try out. I do have concerns that it does not mention product engineering responsibilities, for example asking which bet are we testing with this work and what is the cheapest way to test that bet. The risk being otherwise we may plan an impressive, but possibly pointless object-orientated system if it is not something that users want.

## Basic concepts

#### Objects

An object is something with properties or attributes that describe its current state. E.g. a mug can be half full of water. It is independent of other instances of the object, e.g. if one mug is half full it does not mean a similar empty mug is also half full of water.

Test to decide if something should be an object:

- Is it a noun, e.g. could you put the word “the” in front of it?
  - The bank account, the mug etc
  - Verbs are behaviours not objects, e.g. heating could be something an object can do, but is not an object itself
- Does it have properties or attributes?

#### Classes

Classes are code templates that are used to create specific objects. A real world example could be a cookie-cutter:

- A cookie-cutter is required first before you can make cookies; a class must be created first in order to create objects
- Different shaped cookie-cutters create different cookies; different classes create different objects
- Only one cookie-cutter is required to make multiple cookies; one class creates one or many objects

A class consists of:

- **Name:** what is it? e.g. RoundCookie
- **Attributes:** what describes it? e.g. weight, colour, icing
- **Behaviour:** what can it do? e.g. decorate(), consume()

Class behaviours are expressed in **methods,** which are functions that have access to the attributes of the object instance they are called on.

#### Fundamental ideas to keep in mind when creating classes: APIE 🥧

- **Abstraction** extract the essential qualities of something that are not unique to specific instances. E.g. a person has a name, a height and gender. Only include attributes relevant to your application.
- **Encapsulation** control access to attributes, only allow access to what is needed but other parts of the application. E.g. create a specific method on the Person class to allow the name to be updated. This reduces the risk of other parts of the application making incorrect changes to that object’s attributes and the internal code of the Person class can be changed without affecting other areas of the application.
- **Inheritance** if classes share common attributes, it can useful to create a parent class that has those attributes instead of adding them to multiple classes manually. A class that inherits from a parent class inherits all its attributes and behaviours. E.g. if there are two classes Customer and Employee that share attributes such as name, phone and address, there could be a parent class Person with those attributes that Customer and Employee inherit from.
- **Polymorphism** means “having many forms”.
  - **Dynamic polymorphism** uses the same interface for methods on different types of objects. E.g. a different classes FilterCoffee and FrenchPress may both implement a Brew method that takes the same inputs and returns the same object type, but different attributes. Brew requires both coffee and water parameters, both classes return a Coffee object, but FrenchPress returns Coffee with a higher taste attribute. This can be achieve with Inheritance, abstract classes or interfaces.
  - **Static polymorphism** method overloading - implements multiple methods with the same name, but different parameters. E.g. the FrenchPress class may implement Brew multiple ways: with parameters coffee and water to return Coffee and parameters teaLeaves and water to return Tea.

## Object-orientated analysis, design and programming

_There are many approaches to building software, this describes one approach_.

To develop any piece of software you need to do three things:

1. **Analysis** understand your problem - what to you need to do?
2. **Design** plan your solution - how are you going to do it?
3. **Programming** build it

Analysis and design take place together ahead of programming. These can consist of conceptual diagrams and written descriptions, but not code. Take a 5-step approach:

1. **Gather requirements** - what is the problem you are trying to solve
2. **Describe the application** - in plain language what is the application and how will people use it
3. **Identify the main objects** - the starting point for defining classes
4. **Describe the interactions** - formally describe interactions between objects, understanding responsibilities and behaviours they may have
5. **Create a class diagram** - the main output: visualise the classes and object-orientated systems they exist in

#### Visualising object-orientated systems

UML is a standard notation for visualising object-orientated systems, which can be useful when needing to communicate things that are not clear in the technical design. Be wary of over-using or making complicated UML diagrams - they should be a quick communication tool. There are many elements of UML, including structural and behavioural diagrams, here is its approach to a class diagram:

![Example of UML class diagram.jpg](/assets/object-orientated-1.jpg)

This allows sketching out a class in a format that will work regardless of programming language choice.

Further reading:

- [https://en.wikipedia.org/wiki/List_of_Unified_Modeling_Language_tools](https://en.wikipedia.org/wiki/List_of_Unified_Modeling_Language_tools)
- [Martin Fowler - UML Distilled](https://martinfowler.com/books/uml.html)

## Gather requirements

- What is the problem you are trying to solve?
- What does it need to do?
- Functional requirements
  - What must it do? Necessary features and capabilities
  - Begin with “the system/application must do…”
  - E.g. “notify the user when the food is ready”
- Non-functional requirements:
  - How should it do it?
  - E.g. comply with legal or performance standards, be available 24/7

##### FURPS requirements

FURPS can be used to classify and think of requirements:

- **Functionality:** the core of what the customer wants; capability, reusability, security
- **Usability:** affects the user using the app; human factors, aesthetics, consistency, documentation
- **Reliability:** how come downtime is acceptable? Availability, failure rate and duration, predictability
- **Performance:** speed, efficiency, resource consumption, scalability
- **Supportability**: make sure it can be tested, extended, services and configured; testability, extensibility, serviceability, configurability

FURPS+ extends this with

- **Design:** places constraints if the app must be built on-top of certain things such as a relational database
- **Implementation:** does it have to be written in a certain language? Standards or methodologies that need to be followed
- **Interface:** does it need to interface with third-party services?
- **Physical:** hardware constraints, e.g. what will the app run on

Further reading:

- Software Requirements by Karl Wiegers
- Mastering the requirements process by Suzanne and James Robertson
