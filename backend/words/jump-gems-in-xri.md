---
date: 2023-09-08T00:00:00.000Z
title: Porting Ultraleap’s Jump Gems hand tracked XR locomotion to XRI using XR Hands
description: "Hand based adventures in Unity XR Interaction Toolkit"
heroImages:
  - alt: Virtual hand pointing jump gem to teleport
    image: /assets/jump-gems.jpg
thumbnail:
  - alt: Virtual hand pointing jump gem to teleport
    image: /assets/jump-gems.jpg
xrMa: false
hide: false
archive: false
category: words
---

[View prototype on GitHub](https://github.com/jonjhiggins/xr-hands-teleport-test).

While there are established conventions for locomotion (moving around) in controller-based XR experiences (e.g. [Meta locomotion guidelines](https://developer.oculus.com/resources/bp-locomotion/)), the XR community is still working to create standards for hand tracked experiences. Hand tracking offers a more natural input mechanism compared to controllers but it can be harder to understand user intent or convert hand movements into a binary on/off. For example, hand tracking can struggle to tell the difference between a user pinching with intent and idly moving their hand across the camera. Additionally a controller button only has two states, while a pinch gesture has many possible positions. As such we may need to use a different approach to locomotion in hand tracked experiences.

## What are Jump Gems?

Ultraleap are currently doing research and development work in relation to [UX of hand tracked locomotion](https://docs.ultraleap.com/xr-guidelines/Interactions/locomotion.html) 👈 this article is a must read if you are interested in this area. One suggested solution is Jump Gems, which uses object manipulation for teleporting.

<video muted loop autoplay>
    <source src="/assets/jump-gems-1.mp4" type="video/mp4">
</video>

> **How it’s used**
>
> 1. **Enable**. Users pinch to grab either micro-handle pulling it off the wrist.
> 2. **Aim**. This enables locomotion mode, displaying an arched ray from the gem which users can use to point at their intended destination. For additional feedback, the ray can change colour or play an audio cue to indicate when a jump can be made or not.
> 3. **Activate**. Users then simply release the pinch pose to teleport, and the ‘gem’ snaps back to the wrist

[https://docs.ultraleap.com/xr-guidelines/Interactions/locomotion.html#teleportation-examples](https://docs.ultraleap.com/xr-guidelines/Interactions/locomotion.html#teleportation-examples)

There’s a Unity-based example of Jump Gems in their [Unity Plugin Tracking Preview](https://github.com/ultraleap/UnityPlugin/tree/develop/Packages/Tracking%20Preview/Examples~/Locomotion/Teleportation), however as the [Locomotion Readme](https://github.com/ultraleap/UnityPlugin/blob/develop/Packages/Tracking%20Preview/Locomotion/README.md) warns it is planned to be rewritten to be integrated with XRI.

## What are Unity XRI and XR Hands?

[Unity XRI (XR Interaction Toolkit)](https://docs.unity3d.com/Packages/com.unity.xr.interaction.toolkit@2.5/manual/index.html) is “high-level, component-based, interaction system for creating VR and AR experiences […] a framework that makes 3D and UI interactions available from Unity input events”. This means you can create XR interactions that are compatible across many headsets (OpenXR, Meta and Microsoft Mixed Reality) using a framework supported by Unity and as its component-based much of it is configured without code. [Unity XR Hands](https://docs.unity3d.com/Packages/com.unity.xr.hands@1.3/manual/index.html) is a similar package for accessing hand tracking data from hand tracking devices, currently only supporting OpenXR target platforms.

## Why port existing functionality to XRI?

Currently Ultraleap has its own Interaction Engine within their Unity Plugin, which provided an alternative to XRI for hand tracking as previously XRI was controller input focussed. Now XR Hands enables hand tracking in XRI we can look at porting functionality over to it, enabling use of existing XRI components such as Locomotion and Teleportation, as well as support for other hand tracking devices.

Here’s a diagram of the flow of data as I understand it, and the new flow that is possible with XR Hands.

![Flowchart of data from camera to headset](/assets/jump-gems-ultraleap-flow.png)

## How

I recently arranged a short work placement at Ultraleap and one of the tasks I worked on was prototyping a version of Jump Gems in XRI. After spending a while getting a Pico 4 Business to play nicely with SteamVR and building a [basic XR Hands scene that worked with a Leap Motion camera](https://docs.ultraleap.com/unity-api/The-Examples/XR/xri-and-xrhands.html), I paired with Bryce from the XR team and we broke the task down into a few steps:

1. Understand how teleport / rays work in XRI
2. Pinch a cube to trigger an action
3. Make cube pinch cast a teleport ray
4. Release pinch to trigger locomotion
5. Replace cube with pointer asset from jump gems. Attach jump gem to hand, unattach while it is being pinched, and reattach when released
6. Make jump gem only appear when palm is visible

Then I set about making it happen.

#### 1. Understand how teleport / rays work in XRI

My first goal was to attach teleport rays to XR Hands and trigger a teleport on pinch. I couldn’t find documentation on how to do this, so I followed [a Teleport tutorial on Fist Full Of Shrimp](https://fistfullofshrimp.com/unity-vr-teleportation/) on adding teleport rays to controllers and tweaked a few things to get it to work with XR Hands. I also used bits from the [Ray Interactions](https://fistfullofshrimp.com/how-to-unity-vr-basics-2023-ray-interactions/) and [XR Hands](https://fistfullofshrimp.com/unity-vr-basics-2023-xr-hands/) tutorial. Adding the XR Ray Interactor is quicker via the right-hand context menu in the Unity Hierarchy (XR > XR Ray Interactor) as it comes pre-configured with everything except for the controller presets. There is a Hands Interaction Demo in the XRI samples which is useful for seeing how rays and direct input can be added to XR Hands. Checkout [this commit](https://github.com/jonjhiggins/xr-hands-teleport-test/commit/28c9fdbed091657157eb416d48abfa88e2a0b760) in my project for that point.

<video muted loop autoplay>
    <source src="/assets/jump-gems-1a.mp4" type="video/mp4">
</video>

Once I knew the process its doesn’t take too long to set this up, particularly as the default settings for the XR Ray Interactor selects with pinch gestures by default, and selecting a teleport area when a ray is pointing to it will teleport the user which is a lot of functionality for not much effort.

The UX of pinching to teleport would be fine if the only interaction was teleporting, but it would likely interfere with other interactions.

#### 2. Pinch a cube to trigger an action

Pinching or grabbing forms part of Direct Interaction (as opposed to Ray or Poke Interaction). Direct Interactors can be added from the Unity Hierarchy context menu (XR > Direct Interactor (Action-based)). The Fist Full of Shrimp [XR Hands](https://fistfullofshrimp.com/unity-vr-basics-2023-xr-hands/) tutorial was useful here. The XR Direct Interactor has various Interactor Events, I used Select Entered and Select Exited. This [commit](https://github.com/jonjhiggins/xr-hands-teleport-test/commit/0bd3535a840500fae2f2764e63c49fb44309799b) shows the grabbable cube.

#### 3. Make cube pinch cast a teleport ray

Next up I tried adding a ray to a cube to achieve the object manipulation method of ray interaction that Jump Gems uses. It turns out if a ray is child of a game object and you disable the XR Controller on the XR Ray Interactor then that works as expected, although Unity will display a warning that the Ray game object should have a XR Controller.

<video muted loop autoplay>
    <source src="/assets/jump-gems-2.mp4" type="video/mp4">
</video>

#### 4. Release pinch to trigger locomotion

I couldn’t find documentation on an approach for this, so my first idea was to programmatically trigger a select event on the Teleportation Area. I couldn’t figure out how to do this but looking at code for the Teleportation Area component I saw method `GenerateTeleportRequest` so I had a go at manually triggering a teleport request when the user unpinches the cube (Select Exited event), I came up with [this implementation](https://github.com/jonjhiggins/xr-hands-teleport-test/commit/1fd9a3f5b8891ed41f90911d717f353a2703ece2#diff-f8384dfa36352b8938cf65d29147f64dd220df10ce16c8ced76fa1a1bd8d8aa6)

```csharp
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.XR.Interaction.Toolkit;

public class TeleportFloor : MonoBehaviour
{
    private TeleportationArea teleportationArea;

    private void Start()
    {
        teleportationArea = GetComponent<TeleportationArea>();
    }
    // Start is called before the first frame update
    public void CheckIfShouldTeleport()
    {
        if (teleportationArea.interactorsHovering.Count > 0)
        {
            Transform interactorTransform = teleportationArea.interactorsHovering[0].transform;
            Teleport(interactorTransform);
        }
    }

    void Teleport(Transform interactorTransform)
    {
        TeleportRequest teleportRequest = new TeleportRequest
        {
            destinationPosition = interactorTransform.position,
            destinationRotation = interactorTransform.rotation,
        };

        teleportationArea.teleportationProvider.QueueTeleportRequest(teleportRequest);
    }
}
```

This teleported the user as seen in the video

<video muted loop autoplay>
    <source src="/assets/jump-gems-3.mp4" type="video/mp4">
</video>

but there was a weird bug with the height increasing each time you teleported. This was because I was teleporting to the position of the XR Ray’s origin, not where it was pointing. I fixed this by teleporting to the RaycastHit in [this commit](https://github.com/jonjhiggins/xr-hands-teleport-test/commit/f5f1bea7d9cfa8bff2e9d9b844294843f8fbfe8f#diff-f8384dfa36352b8938cf65d29147f64dd220df10ce16c8ced76fa1a1bd8d8aa6).

#### 5. Replace cube with pointer asset from Jump Gems. Attach Jump Gem to hand, unattach while it is being pinched, and reattach when released

To get the position of the hand, I changed a few things with the Hand Vizualiser. I added hand prefabs below it in the hierarchy and attached them to the Hand Vizualiser. This meant there were game objects with the transforms of the hand in the scene now. I added a script for the Jump Gem to follow the position of the hand, and stop it following the hand when the user pinched/selected it.

<video muted loop autoplay>
    <source src="/assets/jump-gems-4.mp4" type="video/mp4">
</video>

The rotation of the Jump Gem gets a bit messed up but our core mechanic was achieved at this point.

#### 6. Make Jump Gem only appear when palm is visible

I didn’t get this far, at the time of writing XR Hands doesn’t appear to have gesture support, but the Y rotation of the hand could be checked to hide/show the Jump Gem.

## Result

You can checkout [my prototype on GitHub](https://github.com/jonjhiggins/xr-hands-teleport-test). Although it's much rougher than the Ultraleap example it shows a route for achieving the same thing in XRI. Personally I learnt a lot about XRI and XR Hands and had fun playing with XR locomotion, which still seems like magic to me 🪄.
