---
date: 2023-08-28T00:00:00.000Z
title: Building Handu’s mixed reality world in Unity
description: "How we built a multi-user hand-tracked mixed reality experience for the Pico 4 in Unity"
heroImages:
  - alt: Participants with VR headsets in mixed reality experience
    image: /assets/handu-mirroring.jpg
thumbnail:
  - alt: Participants with VR headsets in mixed reality experience
    image: /assets/handu-mirroring.jpg
xrMa: true
hide: false
archive: false
category: words
---

Handu was a prototype we built in answer to a brief to create a narrative-led mixed reality experience that uses Ultraleap hand-tracking for the Pico 4 headset. This article details the technical process we used in order to build the experience. I was responsible for Unity development, interactions and hardware integration, as well as enabling other team members to contribute to the Unity project. As it was a prototype, the approaches described do not all scale to production. [See video of full experience (20min)](/work/handu/).

## Key mechanics

We identified our first end-to-end slice as building a 3D primitive shape to the Pico headset with mixed reality and hand tracking working. This would give us an indication of how difficult it would be to work with these technologies. The individual steps were straight-forward if the documentation was followed methodically.

- Setting up Unity XR and Pico SDK using the [Pico SDK documentation](https://developer-global.pico-interactive.com/document/unity/create-a-developer-account-organization-and-app/).
- Setting up mixed reality was very easy (just added [EnableSeeThrough](https://github.com/uwe-xr-ma-2023/handu/blob/main/Assets/Scripts/EnableSeeThrough.cs) script or see [Pico docs](https://developer-global.pico-interactive.com/document/unity/seethrough/)), otherwise everything is the same as working in VR.
- Setting up hand-tracking with the [Ultraleap Unity documentation](https://docs.ultraleap.com/unity-api/The-Basics/getting-started.html) .

We had to manually calibrate the hands using https://github.com/rorygames/LeapPicoARAlignment.

## Unity scenes

Handu consisted of 8 scenes with different interactions and visuals, which were mapped to 10 different Unity scenes.

#### Main scene

<video muted loop autoplay>
    <source src="/assets/handu-mirroring.mp4" type="video/mp4">
</video>

The first few minutes of the experience has no visuals but is used for the users to get used to mixed reality and encourage them to move, they are guided through a mirroring exercise with real people.

This scene played underneath all the other scenes and contained the XR rig and other common objects. Controllers were disabled as hand tracking was used instead.

It also contained the Ultraleap Service Provider and Interaction Manager. Different hand prefabs were hidden/shown as required by the current scene. [MainSceneManager component](https://github.com/uwe-xr-ma-2023/handu/blob/main/Assets/Scripts/MainSceneManager.cs) could be edited in UI for all team (e.g. scene timings, audio files).

> Update October 2023: At the time I didn't know about Unity's [Timeline feature](https://docs.unity3d.com/Packages/com.unity.timeline@1.8/manual/index.html). Retrospectively this would have worked better for sequencing timings and visualising the experience's timings.

![Main scene Manager screenshot](/assets/handu-mainscenemanager.jpg)

We defined an invisible Play Area object, a 4x2x4m box which we kept all other game objects within. In the physical space we always drew the play area to be at least 4x4 - making sure the user can always reach game objects.

#### Primordial seas

<video muted loop autoplay>
    <source src="/assets/handu-sea.mp4" type="video/mp4">
</video>

Simple scene with 3D object, interaction when user places hands within it it plays a sound and changes colour. 3D object was created in Blender. Originally animated but standalone Pico 4 couldn’t handle it. We utilised spatial sound on 3D object for better immersion. 3D object has Ultraleap [Interaction Behaviour component](https://docs.ultraleap.com/unity-api/The-Basics/interaction-engine.html), with events for [ContactBegin](https://github.com/uwe-xr-ma-2023/handu/blob/main/Assets/Scripts/3%20Primordial%20Sea/HandleSeaTouch.cs#L18) and [ContactEnd](https://github.com/uwe-xr-ma-2023/handu/blob/main/Assets/Scripts/3%20Primordial%20Sea/HandleSeaTouch.cs#L26).

#### Handu Hands

Simple scene with hand prefab changing to a multiple hand version. Nothing in scene file, the hands are in Home scene and are turned on by property `Show 15 fingers` on a HanduScene object on the MainSceneManager component. Retrospectively, it would make more sense to store the hand prefab in this scene as it directly relates to this scene.

#### Particle Play

<video muted loop autoplay>
    <source src="/assets/handu-particles.mp4" type="video/mp4">
</video>

Scene keeps the multiple hand prefab, but now shows lots of small balls suspended in the air. The user can hit or tap them, triggering a sound and them to move through space. Multiple hands are again property set on MainSceneManager. Particles are generated by a [script](https://github.com/uwe-xr-ma-2023/handu/blob/main/Assets/Scripts/4.2%20Particle%20Play/ParticlePlaySceneManager.cs) that spawns instances of Particle prefab at random positions and scales. Min/max scale and position defined in component UI so non technical team members could adjust. Spatial sound placed on the Particle, so you can hear it move.

Interaction on Particle is a Rigidbody and Ultraleap Interaction Behaviour with just Contact interaction enabled. The Interaction Behaviour has an event to trigger the sound and the movement of the Particle comes from the Rigidbody component.

#### Light

<video muted loop autoplay>
    <source src="/assets/handu-light.mp4" type="video/mp4">
</video>

User is instructed by audio to make hand gesture to create light orbs in space, they could place in the scene. Originally had some cool particle FX, which were visible in play mode but they didn’t show up in mixed reality so we removed them.

For the hand gesture we recorded a gesture using [Ultraleap Hand Pose Recorder](https://docs.ultraleap.com/unity-api/The-Examples/XR/pose-recorder.html) (in Unity SDK sample scenes), then used the [Ultraleap Pose Detector](https://docs.ultraleap.com/unity-api/The-Prefabs/pose-detector.html) to listen for that pose being triggered. We attached [methods](https://github.com/uwe-xr-ma-2023/handu/blob/main/Assets/Scripts/5%20Light/LightSceneManager.cs#L44) to the OnPoseDetected / OnPoseLost events.

OnPoseLost was not always triggered, some users reported the orbs stuck to their hands. We tried (https://github.com/uwe-xr-ma-2023/handu/commit/832b2f05e3abdaa49d5ba1240347a29845075db7) to fix this by calling OnPoseLost when the user moved their hands a certain distance away from the orb. When testing, this worked for 2 users but 1 user then found it harder to create the orbs so we reverted it. Shows it takes time to refine interactions.

#### Earth

<video muted loop autoplay>
    <source src="/assets/handu-earth.mp4" type="video/mp4">
</video>

User was guided to move their hands through spheres. Moving hand through sphere triggers a sound and destroys it. When all spheres destroyed, shows an animation thats position is controlled by the users hand position

All elements scene had an [Elements Scene Manager](<https://github.com/uwe-xr-ma-2023/handu/blob/main/Assets/Scripts/6%20Elements%20(shared)/ElementsSceneManager.cs>) object that spawned a Gesture Guide (series of sphere prefabs arranged in a specific shape).

Gesture guides were positioned by interaction designer Rebecca in specific spaces to choreograph where the users moved in the physical space.

Each sphere in Gesture guide has Ultraleap Interaction Behaviour to trigger sound and destroy itself.

It also calls `IncreaseGestureGuideChildCollidedCount` method on Elements Scene Manager to let it know it’s been destroyed, that object keeps track of how many spheres are left. When all are gone, it spawns a hand animation prefab and a new instance of the Gesture Guide.

#### Water, Wind and Fire

<video muted loop autoplay>
    <source src="/assets/handu-water.mp4" type="video/mp4">
</video>

<video muted loop autoplay>
    <source src="/assets/handu-wind.mp4" type="video/mp4">
</video>

These scenes worked the same as per Earth but with different prefabs for Gesture Guide and Hand Animation specified. Using prefabs allowed 3D animator Tosin to confidently update those assets in isolation without affecting other scenes. Using the same Elements Scene Manager across the scenes made it easier to keep them in sync (e.g. when adding the choreographed positions of Gesture Guides).

#### Beings

Objects from previous scene persist, hand prefab changes to a projected hands version. Nothing in Unity scene file, all controlled by property on MainSceneManager that shows a hand prefabs contained in Home Scene. Also used prop on MainSceneManager to control the fading out of visible scene elements. The elements from previous scene had persisted as they were spawned in to the Home scene, so weren’t destroyed when scene 6 was unloaded.

Ideally we wanted to leave the hands in space but we couldn’t figure this out, we did get a [suggested solution for this](https://discord.com/channels/994213697490800670/1077948163454935070/threads/1124376530127167719) after we finished the project.

## Project structure

#### Unity and version control

We chose Unity for our games engine as it there was a good level of available SDKs and documentation for our hardware, and the team had previous experience of using it. We used Git and GitHub (https://github.com/uwe-xr-ma-2023/handu) for version control as we wanted the whole team to be empowered to contribute to the Unity project and build to the headset unassisted. Apart from me the rest of the team was unfamiliar with Git, so there was an initial overhead of learning Git basics. Over the course of the project I feel this was worth it, as every team member went on to make multiple commits and we avoided having a single person dependency on me as the main Unity developer. It also proved to be useful for rolling back bugs when we were unable to fix forward due to time constraints. We followed [trunk-based development](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development) without pull requests, which felt appropriate due to the rapid prototype nature of the project. We managed to avoid conflicts by committing small and often, and trying to keep elements of the Unity project self-contained with few dependencies - for example dividing up assets into different scene folders. We also noted changes to prefabs, as opposed to game objects in the scene, were easier to understand as Git changes, and allowed team members to make changes more predictably and confidently.

#### Testing

We relied solely on manual testing for this project. From our early prototyping we found that things often behaved differently or were broken on the headset when compared to testing in Unity, so we came up with a rule of having to build to the headset for each change - which could add minutes to each change. At times this rule wasn’t followed and code that broke the build was pushed and not picked up until other team members pulled down the changes. It’s easy for people to forget a manual test like this and it leaves the other team members frustrated if they are unable to build, so this would be a good candidate for automation of some kind.

#### Unity project structure

The first prototype project we worked with as a team quickly became disorganised and hard to use as there was no thought behind how to divide up scenes or store assets in a predictable way. Learning from this we restarted with a fresh project that divided up all the Handu scenes in to Unity scenes and agreed on a consistent naming convention for assets.

There were certain assets that were consistent across all the scenes (e.g. XR rig and interaction managers). So these were stored in a Home scene and then on scene change that scene remained while other scenes could be [loaded additively](https://docs.unity3d.com/ScriptReference/SceneManagement.LoadSceneMode.Additive.html) on top, or removed as required. Scene change was triggered by a timer, with the MainSceneManager game object having a serializable list of HanduScene object on which the time to enter the scene could be specified. This allowed non-technical team members to update the timings easily. Set timings were used to keep both users experiences in sync, but the trade-off was the user did not have autonomy to change scene when they wanted to. The scene timings were defined by the audio track, which was played outside of Unity on loudspeakers.

The MainSceneManger game object ended up taking on multiple responsibilities, and could be seen as a [god object](https://en.wikipedia.org/wiki/God_object), which we should avoid in future so changes are less risky and more predictable. With no pull-request or code review stage these issues are more likely to happen but for a prototype this seems like a reasonable trade-off. This could also be avoided by [designing the objects](https://jonhiggins.co.uk/words/object-orientated-fundamentals/) on paper before jumping into code.

#### Audio

As the Pico 4 only has a single USB socket (which was required for the hand-tracking camera) and no headphone jack we used external speakers to play the main audio track. Sound FX was played through the Pico 4’s built-in lower quality headphones. The main audio track dictated the scene timings. Having the audio baked in to one track made iterating on it harder compared to multi-track audio, but we didn’t make many changes to it.

## What did we learn?

- Hand tracking and mixed reality in basic form is fairly quick to set up in Unity
- Pico 4 mixed reality doesn’t work in Unity Play Mode
- VFX in MR can be underwhelming compared to VR (or not show at all)
- Standalone headsets can’t deal with complex graphics
- You need to test built to headset in mixed reality regularly
- We observed mixed reality allowing users to move more freely compared to VR
- Accurate hand calibration (scale and position of virtual hands) was hard and inaccurate with our hardware setup. It is easier with the integrated headsets (Varjo) or LeapMotion 2 with proper Pico mount
- Finessing hand interactions that work for everyone can be hard
