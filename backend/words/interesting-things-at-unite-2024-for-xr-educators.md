---
date: 2024-10-02T00:00:00.000Z
title: Interesting things at Unite 2024 for XR educators
description: "Highlights from my trip to Unity's annual conference in Barcelona"
heroImages:
  - alt: "Speaker on stage at Unity's Unite 2024 conference in front of screen displaying Unity 6 text"
    image: /assets/interesting-things-at-unite-2024-for-XR-educators.jpg
thumbnail:
  - alt: "Speaker on stage at Unity's Unite 2024 conference in front of screen displaying Unity 6 text"
    image: /assets/interesting-things-at-unite-2024-for-XR-educators.jpg
xrMa: false
hide: false
archive: false
category: words
---

In September, I headed over to Barcelona for Unity 2024, the Unity conference. Taking over the huge Palau de Congressos de Catalunya it was a slick, heavily branded event that delivered lots of useful talks, opportunities to try new products and chat with interesting people who work both with and for Unity. I took advantage of the free tickets available for educators and students.

## Contents

- **[Unity 6](#unity-6)** - Adds support for multi-player and mixed reality experiences
- **[New developer features for Meta Quest devices](#new-developer-features-for-meta-quest-devices)**
- **[SpeedTree](#speedtree)** - Creates impressive 3D models of vegetation
- **[Reactional Music](#reactional-music)** - Make your in-game soundtrack in react to events in gameplay
- **[UModeler X](#umodeler-x)** - Model, rig, paint and texture seamlessly in Unity
- **[Mindshow](#mindshow)** - Position and animate 3D models from within your VR headset

Disclaimer: At the time of writing I had not personally used SpeedTree, Reactional Music, UModeler X or Mindshow. I just spoke to them at the sponsor stands and watched their product demonstrations.

## Unity 6

Exciting new **multiplayer** and **mixed-reality** features

- A major new version of Unity will launch on 17 October 2024 (beta available now)
- It largely looks and functions the same (from a user/editor perspective) but there are a number of stability and performance improvements, as well as some additional features.
- Graphics rendering improvements and more control over lighting.
- Multiplayer support
  - **Multiplayer Play Mode** “simulate up to four Players (the Main Editor Player plus three Virtual Players) simultaneously on the same development device”.
  - **[VR Multiplayer Template](https://discussions.unity.com/t/new-vr-multiplayer-template-available/1488824)** “dive straight into creating immersive multiplayer VR games without the hassle of building and maintaining [social VR] systems”. Uses Unity Cloud Services to host your multiplayer experience including authentication/login and voice chat.
  ![Unity 6 VR Multiplayer Template screenshot showing avatars in 3D space](/assets/interesting-things-at-unite-2024-1.jpg)
- Mixed reality using AR foundation new features
  - **Bounding boxes** (Meta Quest only) “detect and track 3D bounding boxes around real world objects in a physical environment” - could be used for placing virtual elements on physical ones, or understanding a user’s physical environment
  - **Persistent Anchors -** anchors allow you to place virtual objects at specific locations in the physical world. Persistent anchors allow you to save these positions so they remain there between opening and closing the experience.
  ![Unity 6 screenshot of mixed reality persistant anchors](/assets/interesting-things-at-unite-2024-2.jpg)
  - Quest Link works with AR Foundation
- **Composition Layers** - a component that can improve the visual quality of 2D textures like UI and text which often don’t render well in XR
- A new **[Mixed Reality template](https://docs.unity3d.com/Packages/com.unity.template.mixed-reality@2.0/manual/index.html)** to instantly create an MR project with no setup that you can adapt to your needs

## New developer features for Meta Quest devices

- Meta Store is becoming **Meta Horizon Store.** This will combine the existing store with App Lab into one unified store. App Lab has much less stringent requirements when submitting apps, so it should make it easier for experimental and indie titles to reach a wider audience in the standard store.
- While you can build mixed reality experiences to Meta Quest devices with Unity and AR Foundation, if you are just targeting Meta Quest devices you will likely find a richer feature-set with the Meta Quest All-in-one SDK.
- New features in the Meta Quest All-in-one Unity SDK
    - Improved **Meta XR Simulator -** work on your PC or Mac without a headset, but still use controllers. Provides a synthetic environment for mixed reality (e.g. try your experience in a bright living room or something different). Supports multiplayer experiences.
    ![Meta XR simulator scenes showing virtual environments of a modern lounge room](/assets/interesting-things-at-unite-2024-3.jpg)
    - **Multiplayer building blocks -** drop in components to enable multiplayer experiences, using either Unity Netcode or Photon Fusion for the server.
    - **Immersive debugger -** debug or change values from within the APK you push to your headset, saving time going back and forth to Unity
    - **Graphics optimisations** - including Dynamic Resolution which increases resolution when hardware isn’t under load.

## SpeedTree

[SpeedTree – 3D Vegetation Modeling and Middleware](https://store.speedtree.com/)

![Speaker from SpeedTree on stage at Unite conference](/assets/interesting-things-at-unite-2024-4.jpg)


SpeedTree is a paid add-on for games engines, like Unity, that creates impressive 3D models of vegetation including trees, plants and grasses. It procedurally generates vegetation models based on constraints you control, or you can manually model the vegetation. While it can be used for realistic vegetation, I’m interested in its creative potential to create stylised, weird and wonderful creations. 

Pricing: from $19/month

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/YRJoqN825oM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>

## Reactional Music

[Reactional Music | Rule-based music engine for games | Interactive music technology](https://reactionalmusic.com/)

Change elements of your in-game soundtrack in reaction to what happens in the gameplay. For example:

- Make music become more suspenseful in relation to how close the player gets to an enemy.
- Allow players to compose the music - their hand position changes the key of the music, while the velocity of movement controls the speed of music.

Either import your own Reaper audio project in Reactional Composer or use music from their library, then add to your Unity project via their Unity plugin.

Pricing: from $50/month or $500 per game title

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/YEFbo3cKaIA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>

## UModeler X

[UModeler X for Unity | Realtime 3D Asset Creation Service](https://www.unity.umodeler.com/)

“Model, rig, paint and texture seamlessly in Unity”

This looks like a neat tool for users who find tools like Maya and Blender complicated and bloated, or value being able to quickly iterate on 3D models within Unity.

Pricing: free - $219/year

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/cTDeJwvmpHE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></p>

## Mindshow

[Mindshow](https://www.mindshow.com/)

A platform for designing/choreographing 3D animated content and associated cinematography that happens with a VR headset. Similar to ShapesXR but with control of animations on 3D models and camera shots. While the final output was designed to be 2D video, apparently it saves any changes you make in the VR headset app to a Unity scene, so perhaps it could be adapted as a spatial design tool for animated 360 video. It feels more natural using a spatial design tool for this than traditional 2D computer-based tools - you get a much better idea of positioning, colour/lighting and scale, as well as being able to work intuitively to pick up objects and position them as required. 

They are still working directly with companies like Mattel but hope to have a public version of their product next year.
