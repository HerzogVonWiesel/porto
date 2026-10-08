# Beyond Mirror Therapy — working content and media plan

## First draft

- Page: `/projects/beyond-mirror-therapy/`
- Content: `src/_data/projects/beyond-mirror-therapy.yaml`
- Media directory: `src/images/projects/beyond-mirror-therapy/`
- Year: 2026, matching the thesis submission year.
- Framing: balanced, craft-led; interaction design, implementation and visual
  development get more space than research statistics.
- Writing references: the four newest projects by their listed years —
  **Ship Happens!**, **tojimari**, **1973**, and **Bon Voyage**. The draft uses
  first-person process storytelling, playful headings, accessible technical
  explanations and a reflective closing.
- Thesis screenshots illustrate the interaction and visual development. The
  gameplay overview is the homepage cover; the opening project-page screenshot
  has been replaced by the amplification demo beside the introductory text.
- The flower-growth sequence includes the joint-weighting view, with a short
  explanation of how joint influence drives the growth animation.
- The experiment section emphasizes subjective experience, with a sidebar of
  mean seven-point questionnaire ratings. Objective plant counts remain in the
  narrative alongside the hand-fidelity tradeoff.

## Added media

All three supplied media files are now visible on the project page. They live in
`src/images/projects/beyond-mirror-therapy/` and retain their supplied filenames.

| Media | File | Placement |
| --- | --- | --- |
| Demo from the final thesis presentation | `BMT_low.mp4` | Opening video beside “A little goes a long way,” including a short explanation of the demo sequence. |
| User with exoskeleton and VR headset running the app | `project_consortium.png` | Full-width photo after the general AutoAssist introduction. |
| Balloon gameplay and generated level assets | `balloon_monuments.mp4` | After the consortium photo, beside the grouped “A little help behind the scenes” heading, balloon-game introduction and asset-workflow text. |

- The demo is 1024 × 840 with audio. It retains its natural aspect ratio and uses
  playback controls, without autoplay, so viewers can follow the sequence.
- The balloon showcase is 1024 × 1024 with no audio. It uses the site's silent,
  muted, looping inline autoplay presentation.
- Jérôme confirmed that the therapist switches the showcased balloon levels via
  the live dashboard. The captions and dashboard paragraph now include this.

## Details to develop in the next writing pass

The study adaptation is **prepared for an upcoming study**, as confirmed by Jérôme.
The current draft describes the adaptation, without implying completed patient
testing or results. These later developments come from Jérôme's description and
are not findings from the thesis.

- Clarify Jérôme's role in the joint project and how the exoskeleton relates to the
  application's input. For now, describe the setup without assuming a hardware
  connection, input replacement or command interface to the exoskeleton.
- AI workflow: name the tools/models and explain the actual steps from asset idea
  to a usable in-game model. Add examples alongside the showcase video. Specific
  generation, cleanup, optimization and texturing steps are not yet supplied.
- Database/dashboard: level switching is now a confirmed command. Specify the
  reported usage information and any other commands in a later writing pass.
  A dashboard screenshot could illustrate this section if one is available later.
- Consider whether to offer the thesis PDF as a download. It has not been copied
  into the site's public files.

## Thesis source and factual anchors

Source: `/Users/jerome/Projects/Thesis/`, especially `main.typ` and
`parts/{Abstract,Introduction,Methodology,ExperimentAnalysis,Discussion,Conclusion}.typ`.

- Full title: *Beyond Mirror Therapy: Adaptive Visuomotor Amplification for Upper
  Limb Rehabilitation*.
- Platform: Unity 6.0, Meta Quest 3 and Meta XR SDK packages.
- Amplification is based on a calibrated movement range. It is not continuous
  adaptation to fatigue, recovery or performance.
- The same modified hand state drives hand visuals and tool interaction.
- The thesis watering tools stay attached to the hand, and water is guided to the
  plant. The tasks isolate hand closure rather than complete pick-and-place use.
- Three plant variants were modeled and rigged in Cinema 4D.
- Study: 11 healthy participants with tape-based simulated finger restriction;
  two 60-second tasks per condition, with and without amplification.
- Mean total completed plants: 3.45 without amplification, 8.36 with amplification.
  All 11 participants improved in total plant count.
- Subjective benefits included competence, effort comfort and reduced frustration;
  perceived finger-position fidelity decreased. The study establishes an
  exploratory interaction result, not evidence of rehabilitation efficacy.
- Mean subjective ratings, without → with amplification: grip power 3.36 → 6.73;
  effort comfort 3.27 → 5.45; competence 3.41 → 6.07; motivation / perceived
  rehabilitation value 3.73 → 5.45; burden/frustration 3.95 → 2.09 (lower is better).
  All 11 participants reported lower burden/frustration. Agency/fidelity-related
  ratings remained high overall, changing from 5.98 to 5.80.

## AutoAssist context

Additional public source supplied by Jérôme:
Alice Havrileck's AutoAssist project description (background reference only).

- AutoAssist is a collaborative stroke-rehabilitation research project funded by
  the German Federal Ministry of Education and Research (BMBF).
- Its listed timeframe is February 2025–January 2028; this refers to the broader
  project, not the dates of Jérôme's contribution or the upcoming Erlangen study.
- Named partners include ottobock and Friedrich-Alexander-Universität
  Erlangen-Nürnberg (FAU).
- The project investigates assist-as-needed rehabilitation using ultrasound
  sensing, intent detection, AI and VR to adapt assistance and exercise difficulty
  to patient progress, with personalized therapy and engagement as goals.
- The portfolio text presents these as broader research aims. Jérôme's confirmed
  contribution is the adapted VR exercise environment, including the balloon game;
  the source does not establish additional sensing or exoskeleton integrations in
  his app. The Erlangen study remains upcoming according to his earlier answer.

## Verification

Build Eleventy, then Tailwind as documented in `docs/project-overview.md`. Check
the new project page and homepage at mobile and desktop widths. Verify that the
demo loads with audio controls, the silent balloon video autoplays and loops, and
the setup photo renders without cropping.
