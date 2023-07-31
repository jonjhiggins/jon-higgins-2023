---
date: 2023-07-26T00:00:00.000Z
title: How can hand-tracked mixed reality experiences use gestural control to encourage expressive movement?
description: "Paper written as part of the second module on XR Masters course about mixed reality experience we created"
heroImages:
  - alt: Collage of a women performing a hand gesture representing water
    image: /assets/how-can-hand-tracked.jpg
thumbnail:
  - alt: Collage of a women performing a hand gesture representing water
    image: /assets/how-can-hand-tracked.jpg
xrMa: true
hide: false
archive: false
category: words
---

­­­­Mixed reality headsets offer enormous possibilities for their ability to combine virtual and real worlds. Upcoming devices featuring the technology such as the _Apple Vision Pro_ and _Oculus Quest 3_ show that big tech is betting on its widespread adoption. Hand-tracking compliments mixed reality as a form of gestural control in that it offers natural, embodied control that works in both virtual and real worlds, with gestures being as simple or complex as required. Gestures can be mapped to control elements of mixed reality experiences, such as visuals and audio. The combination of mixed reality and hand-tracking has existed in commercially available products for several years but is not something that has achieved widespread adoption or attention until recently, so provides a suitable area for exploration.

Expressive movement is a universal human activity – we communicate and express ourselves through the way we move. It can be applied to various disciplines such as performing arts (e.g., to communicate emotions, ideas, or narratives), dance therapy (e.g., using movement as a therapeutic tool for self-expression, emotional processing, and personal growth), and physical education (e.g., encouraging students to explore and express themselves through movement, allowing them to enhance their motor skills, creativity, and self-confidence).

The title of this paper was explored as part of a project brief set by hand-tracking hardware manufacturer Ultraleap to design a narrative-led mixed reality experience that explores new possibilities for hand-tracking. While researching and prototyping the project we found that gestural control in mixed reality hand-tracked experiences could be expressive. This appeared to represent a new possibility for hand-tracking, as research and commercially available products in mixed reality and hand-tracking have largely focussed on functional applications. A precedent has been set by a small number of musical performers to use the body as an expressive instrument, which suggests a hand-tracked mixed reality experience could work as a setting for expressive movement.

In response to Ultraleap's brief, we created _Handu_, a narrative-led multiuser experience in mixed reality that uses hand-tracked movement for world-building. While many definitions for mixed reality and hand-tracking exist, this project specifically used _Pico 4_ headsets in see-through mode[^1] in combination with _Ultraleap SR170_ hand-tracking cameras and was built in _Unity_.

![Pico 4 VR headset with Ultraleap SR170 camera](/assets/pico-headset.jpg)
Figure 1. _Pico 4_ with _Ultraleap SR170_

## Context

Mixed reality headsets are currently marketed as workplace productivity tools with functional applications[^2],[^3] and have achieved a variety of successes in improving efficiency and productivity in these settings[^4]. Few examples of mixed reality being used for more expressive uses exist. Virtual reality is regularly used for artistic, narrative, and expressive experiences[^5], often due to the ability to fully immerse the participant. Mixed reality provides a different kind of immersion that is blended with the real world, offering different opportunities and weaknesses. Embodiment differs from virtual reality: the participant may be able to see parts of their own body, while virtual body parts are combined with the real world. Being able to see the physical space reduces the ability to control the participant's environment, but also allows seamless movement between the virtual and real, and the magic of bringing virtual elements to their current physical space.

Hand-tracking is also marketed for its enterprise applications[^6]. Research focuses on functional applications[^7] and technical precision of hand gestures. While a small creative maker community has developed around the _Leap Motion_ controller its potential for expressive applications has not yet been fulfilled. The announcement of Apple's _Vision Pro_, a mixed reality headset controlled by eye and hand-tracking, has brought mixed reality hand-tracking to the public's attention, and perhaps signals this form of human-computer interaction may soon become prevalent. Hand-tracking allows more natural, embodied control than other input devices[^8]. While there are no current standards for the design of hand gestures, we will use Ultraleap's (2023) Automotive HMI guidelines for evaluating gestures:

> **Usability** refers to how easy it is to learn, understand and remember the required form and movement of the gesture in order to perform it correctly. A gesture with high usability is considered easy to use relative to other gestures.
>
> **Reliability** refers to the likeliness of the hand-tracking device correctly interpreting the gesture. A gesture with high reliability can be expected to be recognised the vast majority of the time.
>
> **Comfort** refers to how physically difficult a gesture is to perform, and how much discomfort is experienced whilst performing the gesture. A gesture with high comfort can be performed easily with minimal effort.

Taking an embodied cognition viewpoint, which sees our reality as being shaped by the interactions of our mind, body, and environment (van der Schaaf et al., 2019), the bodily experience of expressive gestural control in a mixed reality environment could allow for mental exploration and development. For this to happen it is necessary for the participant to feel embodiment, which is commonly seen as consisting of:

> _Ownership_. The self-attribution of a body;
>
> _Self-Location_. The spatial experience of being inside a body; and
>
> _Agency_. The sense of having motor control."

(Rosa et al., 2019)

Musical performers have utilised hands and the human body as expressive instruments through NIMEs (New Instruments for Music Expression). Michel Waisvisz's _The Hands_ signalled the body could be used as an expressive instrument for electronic music (Bellona, 2017). Waisvisz created them after seeing available musical instruments as a "poor translation of the rich information generated by hand/arm gestures and finger movements/pressures" (Bellona, 2017). _The Hands_ enabled him to perform highly expressive, athletic performances that would not be possible with traditional instruments. More recently, musicians such as Imogen Heap have used _MiMu Gloves_ to use their hands as musical instruments, again allowing the hands and body to provide expressive movement to enhance their performances (Brown et al., 2018).

Mixed reality hand-tracked experiences face challenges in working as a tool for encouraging expressive movement. In terms of mixed reality, embodiment can be affected by latency, visual fidelity, and perspective (Zhou et al., 2022). While hand-tracking issues include gesture recognition being technically hard to implement, accuracy of tracking and limitations of the tracking camera's field-of-view (Sluÿters et al., 2022). Bringing the two technologies together poses unsolved questions about how to position virtual hands against the participant's real hands.

## User research and testing

To answer our initial questions we performed user testing with 8 participants, consisting of students and staff from the Virtual and Extended Realities course. We wanted to assess participants' hand-tracked mixed reality experiences in terms of embodiment, ease-of-use, and movement. Participants were given a headset with a simple hand-tracked mixed reality scene where the only virtual elements were multiple outline hands that were tracked to the participant's hand positions. Like Rosa et al. (2019) we observed that participants quickly established ownership, agency, and co-location of virtual hands. Controlling virtual hands was easy and intuitive. Participants began to move without encouragement as soon as they wore the headset, enjoyed the movement, and moved much less when the headset was removed. It was felt the simple visuals in mixed reality were acceptable to participants due to the "magic" of virtual elements overlaid over real, whereas in virtual reality embodiment requires higher visual fidelity. Some participants expressed a desire to "warm up", encouraging movement if they felt self-conscious. In response, we used our professional movement experience to design an introductory _mirroring_ sequence to encourage expressive movement.

![Collage of two people, one with VR headset, performing mirroring excercise](/assets/mirroring.jpg)
Figure 2. The facilitator (left) guides the participant (right) through the _mirroring_ exercise.

We employed elicitation to assess participants' movement with audio FX and vocal prompts (e.g., "wind") for designing expressive movements representing narrative elements, using a performance art approach. Vocal prompts were clearer to participants and similar patterns of expressive movement emerged. Therefore, we were able to encourage expressive gestural movements with the desired meaning to the participants, like the metaphors Brown et al. (2018) observed NIME musicians making between expressive gestures and what they control: "RELEASING A FEATHER IS RELEASING A NOTE".

![Collage of hand gestures relating to water](/assets/ellicitation.jpg)
Figure 3. Participants during the _elicitation process_ responding to the vocal prompt "water" with hand gestures.

We tested our final prototype, now a two-person experience, with 12 participants who were either students, IT, or creative industry professionals with strong extended reality experience. It featured four gestural controls that triggered specific actions:

1. Move hands through an object.
2. Tap spheres with hands.
3. Place hands together.
4. Move hands through multiple objects.

![Collage of screenshots from VR experience showing various hand gestures](/assets/handu-gestures.jpg)
Figure 4. Gestures in the final prototype

We observed that mixed reality with multiple participants can assist with understanding gestural control (e.g., if one participant was struggling to perform a gesture, they could look to learn from the other participant's movements). Sometimes embodiment of the virtual world was such that participants could forget the real world, (e.g., jumping and hitting the physical ceiling with their hand as they reached for a virtual object), while this is positive for embodiment it raises safety issues. We observed participants sometimes moved expressively with the other participant in mind (e.g., carefully, or aggressively hitting virtual spheres towards the other participant). Highlighting the multiplayer aspect could be a rich area to explore moving forwards. Due to technical limitations, the participant's real hand was always visible. Rosa et al. (2019)notes that "seeing the real hand disrupts the illusion", so a higher level of embodiment may be possible if this is achieved.

We tested a limited range of participants, who understood they were testing a student prototype – they may have experienced it differently if they had higher expectations. Rosa et al. (2019)suggest that embodiment may require "passing a barrier of belief that is emphasized by the dissonance between reality and virtuality, which is in turn possibly determined by _a priori_ willingness to accept virtual limbs", as such individual qualities of the participant may have a large role to play in the extent of embodiment they perceive.

The four forms of gestural control in our experience were simple, but the mixed reality space allowed for and encouraged participants to embellish with expressive movements, similar to NIME musicians in Brown et al. (2018)"Primarily, the musicians focus on creating simple mappings that reduce the possibility of performer error, focussing on developing expressive, performative ancillary movement, with the underlying aim of these factors being the desire to provide engaging performances for their audiences". A musician in Brown et al. (2018) sees gestural control and mapping as very personal[^9], whereas our experience did not allow personalisation of gestural controls and their mappings.

## Prototyping gestural control

Following the initial design of the project, we planned to recognise a specific gesture designed to express _water_, as it would be featured in a scene allowing world-building using the four elements[^10], and be a pleasant, flowing movement.

![Mulitple images of a woman demonstrating water hand gesture](/assets/mr-essay-1.jpg)
Figure 5 - Demonstration of _water_ gesture

As we did not have a known approach for this, we planned and prototyped different approaches, which formed _Prototype 1 (P1)_. Taking a _walking skeleton_ approach to software development[^11] we saw gestural control as being central to building a basic end-to-end version of the experience, hence prioritising this prototype. We also borrowed from _Lean Startup_(Rees, 2011), working in an iterative cycle of _build-measure-learn_ of small slices of the prototype, where "build" represented building an APK of the experience to the _Pico 4_, "measure" was internal user testing performed by our team in mixed reality and "learn" was informal qualitative feedback from testing.

Technical research consisted of reading Ultraleap documentation and academic approaches[^12] to gesture recognition. This informed technical planning that outlined three possible approaches:

- _P1A_ Colliding with a series of game objects.
- _P1B_ Draw a curve for shape recognition.
- _P1C_ Series of poses.

Several academic approaches use custom machine learning (ML) models, but we avoided this due to limited ML experience.

#### P1A Colliding with a series of game objects

In this approach, the participant sees virtual objects in the scene positioned in a sine wave. Moving their hand through the objects, the gesture is complete when all virtual objects have been interacted with.

![Wireframe sketch demonstrating user flow](/assets/mr-essay-3.jpg)
Figure 6. Sketch for user flow in P1A

![Screencast from Pico 4 showing hand moving through virtual spheres](/assets/mr-essay-2.jpg)
Figure 7. Implementation of _P1A_, screencast from _Pico 4_. [See video](<https://uweacuk-my.sharepoint.com/:v:/r/personal/jon_higgins_live_uwe_ac_uk/Documents/ultraleap/StoryLab%20Evaluative%20essay/p1a%20popping%20spheres%20MR%20(1).mp4?csf=1&web=1&e=T8LXeX>)

This approach was technically easy to implement using _Unity's_ primitive 3D sphere objects and adding _Interaction Behaviour_ components on them from the _Ultraleap Unity SDK_. Initially, it was seen as problematic when reviewed with the mindset of achieving maximum _usability efficiency_[^13], requiring participants to move and reposition their bodies. On reviewing with the wider team, the requirement to move was seen as a feature that formed part of the movement in gestural control - the extra effort provided _usability satisfaction_.

**Usability**: good, we observed a voice prompt to "move your hands through the spheres" got participants to start interacting. Participants intuitively learnt to control the virtual hand. Correctly completing the gesture sometimes took multiple attempts, but this was seen as an appropriate amount of effort.

**Reliability**: good, the only issue observed was having to use the virtual hand to collide with the spheres, which had not been calibrated to be the same size/position as the participant's real hand

**Comfort**: some effort involved in moving towards the spheres, but allowed for more expressive movement

#### P1B Draw a curve for shape recognition

In this approach, the participant points their index finger to start drawing, which is recognised using the _Ultraleap Unity SDK's Point_ pose. When drawing, a visible line can be seen. The participant draws a wave shape with their finger. When they stop pointing the shape is tested against stored wave shapes by the _PDollar_[^14] gesture recognition asset.

![Wireframe sketch demonstrating user flow](/assets/mr-essay-4.jpg)
Figure 8. Sketch for user flow in _P1B_

![Implementation of _P1B_, screencast from _Pico 4_](/assets/mr-essay-5.jpg)
Figure 9. Implementation of _P1B_, screencast from _Pico 4_. [See video](https://uweacuk-my.sharepoint.com/:v:/g/personal/jon_higgins_live_uwe_ac_uk/EZLkZvWZinZBuawx5udLFwQBKRljZ1cqWaoGn2tBp5eRZA?e=VXFMnj)

This was technically harder to implement than _P1A_ and there were unresolved bugs with the shape recognition asset. It was still possible to complete the "measure" and "learn" phases for this approach even with dysfunctional shape recognition, we were able to _fail fast_ (Rees, 2011)- this approach was less appropriate compared to _P1A_. There was a flowing drawing movement, but it was not an improvement over _P1A._ Requiring a pose to start and stop the drawing caused significant issues.

**Usability:** poor - required longer explanation to the participant to use the specific pose to start/stop drawing mechanic and which shape to draw

**Reliability:** poor - pose recognition was unreliable, pose end was regularly triggered unexpectedly, clearing the drawing

**Comfort:** poor – point pose was physically hard to hold, causing strain down the forearm

#### P1C Series of poses

We planned, but didn't implement, an approach involving breaking the _water_ gesture into static poses recorded and recognized by the _Ultraleap Pose Detector_. _Pose Detector_ works by recording and recognising joint angles on the virtual 3D hand skeleton of the participant's tracked hand. This required completing all poses in a highly specific manner, leading us to proceed with _P1A_ instead.

## Prototype 1 learnings

From _Prototype 1_, we recognised the potential of expressive movement in gestural control for _Handu_. We established a shared understanding of relevant gestural controls. Our goal was to encourage expressive movement without causing any undue difficulty for participants. By requiring participants to move towards virtual objects, we could choreograph their movements, enabling both solitary and group activities. Emphasizing expressive movement mattered more to us than technical precision; we valued the variety of ways a gesture could be performed. This approach contrasted with typical hand-tracking applications, which require precise gestures for critical actions. To simplify gesture recognition and reduce cognitive load, we limited each scene to one gesture.

## Conclusion

As an experimental, exploratory project we set out to see how hand-tracking gestural control could be used in mixed reality and stumbled across the realisation that gestural control could be expressive. A shortcoming of the project is that we did not measure the amount, quality, or impact of expressive movement. We did not clearly define the goals of the expressive movement, as we were interested to see how people would move and what could influence it. Future work could establish goals for expressive movement, such as _fostering a sense of unity through group movement_ against which measurement could be performed.

Some general recommendations can still be made from our learnings for future hand-tracked mixed reality experiences with similar expressive movement goals:

- **Take advantage of physical space** being able to see the real world enables participants to move freely and interact with the real world.
- **Take advantage of hand-tracked mixed reality headsets as a mask that encourages people to move**.
- **Warm participants up** provide an introductory sequence that will prepare participants to move in a way relevant to your experience.
- **Keep gestural control simple but encourage it to be embellished with expressive movement** avoiding technical issues with recognising gestures and motor skills required to perform them but allow participants to express themselves at a level of effort suitable to them.

We also note some of the challenges to these types of experiences, which could be explored in future works:

- **Balancing accessibility, ease of performing gestures versuss opportunities for expressive movement** encouraging expressive movement requires physical and cognitive effort from the participant, so this level may need to be personalised.
- **Embodiment is affected by technical limitations** such as latency, visual fidelity, perspective, accuracy of tracking and limitation of tracking field-of-view.
- **Design standards have not been established** should virtual limbs occlude real limbs? What are standard gestures?

Our prototype shows that there is potential in hand-tracked mixed reality experiences to encourage expressive movement. Our next steps would be to further exploit the shared space that multiuser mixed reality affords such as networking multiple headsets for a shared virtual experience. Improving the accessibility of these experiences so they can reach a wider user is also important. In addition to experimental artistic experiences, we anticipate these technologies and techniques could be applied to narrative experience, training and exergames. We encourage others to further explore what is currently an unusual application of hand-tracking and mixed reality.

## Bibliography

Bellona, J. (2017) Physical Intentions: Exploring Michel Waisvisz's The Hands (Movement 1). _Organised Sound_, 22(3), pp.406-17.

Brown, D., Nash, C. & Mitchell, T. (2018) Simple mappings, expressive movement: a qualitative investigation into the end-user mapping design of experienced mid-air musicians. _Digital Creativity_, 29(2-3), pp.129-48.

Forrester. (2021) _The Total Economic Impact™ Of Mixed Reality Using Microsoft HoloLens 2_ [Online]. Available at: [https://download.microsoft.com/download/e/1/3/e1364937-5f62-4a0c-bb9e-664c270ad4fe/Forrester-Total-Economic-Impact-Mixed-Reality-Microsoft-HoloLens-2_Cover.pdf](https://download.microsoft.com/download/e/1/3/e1364937-5f62-4a0c-bb9e-664c270ad4fe/Forrester-Total-Economic-Impact-Mixed-Reality-Microsoft-HoloLens-2_Cover.pdf) [Accessed 25 July 2023].

Google. (2023) _Google Scholar search results_ [Online]. Available from: [https://scholar.google.com/scholar?start=0&q=allintitle:+%22sign+language%22%2B%22leap+motion%22&hl=en&as_sdt=0,5](https://scholar.google.com/scholar?start=0&q=allintitle:+%22sign+language%22%2B%22leap+motion%22&hl=en&as_sdt=0,5) [Accessed 25 July 2023].

Kousar, H. & Kumar, K. (2014) Walking Skeleton Strategy in a Test Driven Development. _International Journal of Scientific and Research Publications_, p.141.

Liang, H. et al. (2017) Hand gesture-based interactive puppetry system to assist storytelling for children. _The Visual Computer_, 33, pp.517-31.

Magic Leap. (2023) _Magic Leap 2_ [Online]. Available from: [https://www.magicleap.com/magic-leap-2](https://www.magicleap.com/magic-leap-2) [Accessed 25 July 2023].

Microsoft. (2023) _HoloLens 2_ [Online]. Available from: [https://microsoft.com/en-gb/hololens](https://microsoft.com/en-gb/hololens) [Accessed 25 July 2023].

Mittal, A. et al. (2019) A Modified LSTM Model for Continuous Sign Language Recognition Using Leap Motion. _IEEE Sensors Journal_, 19(16), pp.7056-63.

Nielsen, J. (2012) _Usability 101: Introduction to Usability_ [Online]. Available at: [https://www.nngroup.com/articles/usability-101-introduction-to-usability/](https://www.nngroup.com/articles/usability-101-introduction-to-usability/) [Accessed 26 July 2023].

Pico. (2023) _Seethrough mode - Pico Unity SDK_ [Online]. Available at: [https://developer-global.pico-interactive.com/document/unity/seethrough/](https://developer-global.pico-interactive.com/document/unity/seethrough/) [Accessed 25 July 2023].

Rees, E. (2011) _The Lean Startup_.

Rosa, N., Veltkamp, R.C., Hurst, W. & Nijboer, T. (2019) The supernumerary hand illusion in augmented reality. _ACM Transactions on Applied Perception_, 16(2), pp.1-20.

Sluÿters, A., Ousmer, M., Roselli, P. & Vanderdonckt, J. (2022) QuantumLeap, a Framework for Engineering Gestural User Interfaces based on the Leap Motion Controller. _Proceedings of the ACM on Human-Computer Interaction_ , 6, pp.1-47.

Ultraleap. (2023) _Interaction Types in Automotive HMI_ [Online]. Available at: [https://docs.ultraleap.com/automotive-guidelines/interaction-types.html](https://docs.ultraleap.com/automotive-guidelines/interaction-types.html) [Accessed 25 July 2023].

Ultraleap. (2023) _Ultraleap_ [Online]. Available from: [https://www.ultraleap.com/](https://www.ultraleap.com/) [Accessed 25 July 2023].

van der Schaaf, M., Bakker, A. & Ten Cate, O. (2019) When I say… embodied cognition. _Medical Education_, 53(3), pp.219-20.

Venice Biennale. (2022) _OFFICIAL LINE-UP OF VENICE IMMERSIVE 2022_ [Online]. Available at: [https://www.labiennale.org/en/cinema/2022/venice-immersive-0](https://www.labiennale.org/en/cinema/2022/venice-immersive-0) [Accessed 25 July 2023].

Zhou, Q. et al. (2022) Movement guidance using a mixed reality mirror. In _Designing Interactive Systems Conference_., 2022.

[^1]: "Seethrough" is Pico's term for mixed reality (Pico, 2023)
[^2]: Microsoft HoloLens 2 is marketed as a device "For precise, efficient hands-free work", with target industries defined as Manufacturing, Healthcare and Education. (Microsoft, 2023)
[^3]: Magic Leap 2 is marketed as "the most immersive enterprise AR device." (Magic Leap, 2023)
[^4]: "Enhanced training efficiency for up to 1,000 annual trainees, saving $2.1 million in labor. [^...]: Increased task efficiency for 50 field workers, saving $1.3 million in labor." (Forrester, 2021)
[^5]: For examples of virtual reality in fine art, see award winners from art festivals, such as the Venice Immersive (Venice Biennale, 2022)
[^6]: Ultraleap's 3Di controller is marketed for applications in "public interactive screens. DOOH, retail, museums, theme parks" (Ultraleap, 2023)
[^7]: A search on Google Scholar for articles with both "leap motion" and "sign language" in the title returns 92 results (Google, 2023)
[^8]: "using hand gestures as an input to control avatar's performance is more natural and intuitive than other HCI methods, such as keyboard or touch screen input" (Liang et al., 2017)
[^9]: "there's almost no point in copying someone else's movements or sound–gesture relationships because playing with them is part of the expression, totally, in how you use them" (Brown et al., 2018)
[^10]: Earth, water, wind, and fire.
[^11]: "Walking Skeleton Strategy is a small implementation of the system or a slice of code that performs a small end-to-end function that can be built, tested and deployed automatically" (Kousar & Kumar, 2014). Our interpretation of this was an end-to-end interaction built to the Pico 4 headset with hand-tracking. We did not include tests, automatic builds, or deployment.
[^12]: A Modified LSTM Model for Continuous Sign Language Recognition Using Leap Motion (Mittal et al., 2019)
[^13]:
    "Usability is a quality attribute that assesses how easy user interfaces are to use. [...] Usability is defined by 5 quality components:

    - **Learnability:** How easy is it for users to accomplish basic tasks the first time they encounter the design?
    - **Efficiency:** Once users have learned the design, how quickly can they perform tasks?
    - **Memorability:** When users return to the design after a period of not using it, how easily can they reestablish proficiency?
    - **Errors:** How many errors do users make, how severe are these errors, and how easily can they recover from the errors?
    - **Satisfaction:** How pleasant is it to use the design?" (Nielsen, 2012)

[^14]: _[PDollar](https://assetstore.unity.com/packages/tools/input-management/pdollar-point-cloud-gesture-recognizer-21660)_ is a Unity Asset implementation of _[$P Point Cloud Recognizer](http://depts.washington.edu/acelab/proj/dollar/pdollar.html)_
