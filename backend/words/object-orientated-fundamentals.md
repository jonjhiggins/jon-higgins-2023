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
Image credit: LinkedIn Learning

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

## Use cases and user stories

#### Use cases

Places focus on the user and what they want to achieve. They can be written in different ways, but need to contain:

- **Title** _what_ is the goal?
  - Short phrase that contains an active verb
  - E.g. as an astronaut my goal would be to heat a delicious meal package could be title “Heat meal”
- **Primary actor** _who_ desires it?
  - Someone (e.g. customer, employee or administrator) or something external (e.g. other computer systems) that interacts with or uses the system
- **Success scenario** _how_ is it accomplished?
  - Main part of use case, a single paragraph that details how the goal is accomplished.
  - Short and succinct, using everyday non-technical language so it can be understood by typical users of the system
  - E.g. “The astronaut inserts the meal package, the system identifies the package, heating it up for the correct amount of time, notifies the astronaut that it's ready via space pager, and finally, the astronaut returns to remove the hot meal package.
  - Can also be written as a series of steps
    1. Astronaut inserts the meal package
    2. System identifies the package […]
  - Omit needless words, e.g. “Astronaut inserts the meal package” not "the system is provided with the meal package by the astronaut”.
  - Avoid implementation details, e.g. “system sends pager message” not "the system connects to the external pager system over HTTPS and uses JSON to format the text message […]”
  - Omit UI implementation details, e.g. avoid “User pressed start button” and focus on their intention

Further reading:

- Alistair Cockburn “Writing Effective Use Cases”

#### Identifying the actors

Before writing use cases, it can be useful to brainstorm possible actors - anything that lives outside of your application but interacts with it to accomplish some goal. Sometimes this is straightforward (video game with one actor, the player) and sometimes complex (space microwave with multiple people with different goals). In addition to humans, think about other computer systems that your system needs to interact with.

When thinking about actors, it is their goal in relation to the system that is important. For example you may identify multiple job roles as actors:

![Diagram showing actors Commander, Pilot, Cook](/assets/object-orientated-2.png)
Image credit: LinkedIn Learning

But as the job roles share two distinct goals, we can simplify our actors accordingly:

![Diagram showing actors refined to cook and observer](/assets/object-orientated-3.png)
Image credit: LinkedIn Learning

Use cases have primary and secondary actors, primary being the ones that initiated it (but not necessarily the most important in the scenario).

#### Identifying the scenarios

Describe a **goal** that an actor can accomplish in a single encounter via several steps. Focus on what the user really wants to accomplish.

e.g

- ❌ ”turn on microwave” - an active verb phrase, but the user’s intent or overall goal is not to turn on microwave. This is a step in a scenario.
- ✅ ”cook meal” a user focussed, active verb phrase that describes user’s overall goal
- ✅ ”generate reports”, “change settings”, “order supplies”
- ❌ ”feed entire crew” may be too broad, as it involves multiple encounters and needs breaking into smaller use cases

Identify primary scenarios first, you can eventually move to unhappy paths or extensions but be wary of going over-the-top. This can include what happens when the system fails, or how the system is monitored, which likely involve different actors.

#### Use case diagrams (UML)

A simple overview of the relationships between multiple use cases and actors. Useful to communicate to non-technical users and understand if something is missing.

- List out use cases in centre, draw circles around each of them
- Draw a box around use cases to represent the system
- List out primary actors on left, use stick figures to represent humans and boxes to represent non-human actors
- Draw lines (without arrows) between actors and use cases they will want to interact with
- List out secondary actors on right

#### User stories

Another written format for describing parts of an application - shorter and simpler than a use case. Describes a single small scenario from a user’s perspective, focussing on their goal and why - rather than focussing on the system. Placeholder for a conversation, whereas use case is a record of conversation - different software development methodologies favour one over the other.

- Typically one sentence long
- Follows format:
  - **as a** [type of user or role]
  - **I want** [describe the goal],
  - **so that** [reason or benefit]
- E.g. “As an astronaut, I want to heat up my food so that I can eat a warm meal” → focuses on one specific goal of one specific user for a particular reason.
- Same as use cases, should not include implementation details or UI elements

Further reading:

- Mike Cohn “User Stories Applied for Agile Software Development”

## Domain modelling

#### Identifying objects

Now that we have performed analysis and understand the problem we are trying to solve we can move to the design of the solution. First step is defining the conceptual model, which is just a fancy phrase for identifying the most important objects in the application and the relationship between them.

To identify objects, read through your use cases and underline the nouns, e.g. “The system spawns enemy spaceship in play area. Spaceship flies towards player asteroid and fires missile at it. Player steers asteroid in direction to avoid missile path. Missile flies past player asteroid and disappears offscreen.” Filtering out duplicates and irrelevant nouns you can a list of potential objects / beginning of conceptual model:

- Spaceship
- Area
- Asteroid
- Player
- Path
- Missile
- Direction

#### Identifying class relationships

Draw out all your identified objects and draw any relationships between them. E.g. Asteroid exists within an Area, so draw a line between them. You can add text above the line explaining the relationship, e.g. Area “contains” Asteroid. You can add UML multiplicity notations, e.g. a 1 by Area (there is only one Area) and 1\* by the Asteroid (an Area contains many Asteroids). Only add this if its interesting or important enough to include.

![Diagram showing class relationships](/assets/object-orientated-4.jpg)
Image credit: LinkedIn Learning

#### Identifying class responsibilities

To identify responsibilities, repeat the task of underlining words from your use cases, this time looking for verbs and verb phrases. E.g. “The system spawns enemy spaceship in play area. Spaceship flies towards player asteroid and fires missile at it. Player steers asteroid in direction to avoid missile path. Missile flies past player asteroid and disappears offscreen.” Filtering out duplicates and irrelevant verbs you can a list of potential responsibilities:

- Spawns enemy spaceship
- Flies towards player
- Fires missle
- Steers Asteroid
- Avoid missile
- Flies past player
- Disappears offscreen

The next step is deciding which objects should have these responsibilities. Use cases are written from the perspective of the object that initiates the responsibility/action, but it shouldn’t necessarily be the owner of it. For example, Player steers Asteroid - Player initiates the action, but **an object should be responsible for itself**. Therefore, the Asteroid should be responsible for steering itself (changing its inner state), but should allow a method for the Player to tell the Asteroid where it should go. The responsibilities from the use cases will likely need to be renamed and shortened when defined as class responsibilities. Both these steps can be done by drawing out the objects and trying to assign your potential responsibilities to them:

![Diagram of class responsbilities](/assets/object-orientated-5.jpg)

In this example:

- “Spawns enemy spaceship” has been simplified to “Spawn” and assigned to Spaceship
- “Flies towards player” simplified to “Move”, assigned to Spaceship
- “Fires missile” simplified to “Spawn”, assigned to Missile

Note Player has no responsibilities, but will likely initiate many of the actions. Avoid assigning too many responsibilities to one object (known as a God Object), which will make maintaining and updating the application in the future easier. Sometimes this happens by creating a System object e.g. “system spawns spaceship”, where this should really be “some part of the system spawns spaceship”

#### CRC cards

CRC stands for Class, Responsibility, Collaboration. The same information as a Conceptual Object Diagram, in a different format; drawn on index cards and are simple, easy to create, hand around and discuss. Each card represents one class:

- C is the name of the class at the top, underlined
- R is the responsibilities of the class
- Second C is for collaborators - other classes it interacts with

<table>
<thead>
<tr>
<th colspan="2">Class name</th>
</tr>
</thead>
<tbody>
<tr>
<td>Responsibilities</td>
<td>Collaborators</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
<tr>
<td>&nbsp;</td>
<td>&nbsp;</td>
</tr>
</tbody>
</table>

For example

<table>
<thead>
<tr>
<th colspan="2">Missile</th>
</tr>
</thead>
<tbody>
<tr>
<td>Fly through space</td>
<td>Spaceship</td>
</tr>
<tr>
<td>Destroy asteroid</td>
<td>Area</td>
</tr>
<tr>
<td>Disappear offscreen</td>
<td>Asteroids</td>
</tr>
</tbody>
</table>

The responsibilities don’t have to be the official method names, just what describes the behaviour. Collaborators don’t have to directly relate to the responsibility that is on the same line, its just a list of other objects that interact with it, e.g. Missile is fired by Spaceship, it exists in Area and destroys Asteroids”. The idea of using physical index cards is that if you run out of room for responsibilities then you probably need to break that object down to distribute the responsibilities.

## Class diagrams

Now you have a conceptual model, it’s possible to design the classes. This is where specific object-orientated principles like inheritance and polymorphism come into play. The most common format is UML, which can be used to detail basic information or be very complex. Here we are using just the basics

| Class Name |
| ---------- |
| Attributes |
| Behaviours |

For example:

| Spaceship                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| - callSign: String = “Excelsior” <br/> - shieldActive: Boolean <br/>- shieldStrength: Integer <br/>- position: Coordinate <br/>+ getShieldStrength(): Integer |
| + reduceShield(Integer) <br/> + getPosition(): Coordin<br/> + move(Direction) <br/> - setPosition(Coordinate)                                                 |

For attributes, the text after the colon indicates their type. You don’t need to define the types specific to your language implementation, e.g. just specify String rather than String32. The text after the equals sign indicates a default value.

For behaviours use short verb phrases. It’s common practice to name methods that retrieve and modify attributes as “get” and “set” methods - some languages will automatically create getter and setter methods for you. Parameter types are specified in the parenthesis and return types are specified after the colon.

Plus and minus signs at start indicate public (+) and private (-). Classes may have a lot of internal complexity, but the focus is on public visibility - what are the attributes and responsibilities other classes need to know about? Leave as many things private as possible, in line with principle of encapsulation. E.g. attribute position is kept private so other classes can’t modify it directly, but its value is exposed by getPosition.

The idea behind drawing these diagrams before jumping into code is to focus on the behaviours, as when coding we often start with the attributes, which can end up with classes with few or no behaviours.

After this point we are ready to start implementing the classes in code.
