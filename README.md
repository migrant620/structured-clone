<p align="center">
  <a href="https://migrant620.github.io/structured/"><img src="docs/demo.gif" width="280" alt="Planning a task on the Structured day timeline: adding a task through the two-step editor, opening its detail sheet and completing it"></a>
</p>

<h1 align="center">Structured Clone</h1>

<p align="center">
  <a href="https://migrant620.github.io/structured/"><img src="https://img.shields.io/badge/%E2%96%B6%20Live%20demo-migrant620.github.io%2Fstructured-F49F99?style=for-the-badge" alt="Live demo"></a>
</p>

<p align="center">
  A Structured clone in React Native + Expo: a high-fidelity, interactive recreation of the Structured day-planner Android app — real components, real navigation and local state, running in your browser.<br>
  <a href="DESIGN.md">DESIGN.md</a> · <a href="#design-notes">Design notes</a> · <a href="#explore-the-prototype">Explore</a> · <a href="#run-locally">Run locally</a> · <a href="#scope-and-limitations">Scope</a> · <a href="https://github.com/migrant620/awesome-app-design-md">More apps →</a>
</p>

---

Created to explore how Structured turns a whole day into something you can see at a glance — one vertical timeline spine, a disc per task, and a single coral accent carrying every plan and action. For the real experience of the planner itself, explore [Structured](https://structured.app).

Everything runs locally in your browser; it does not connect to any Structured or calendar account and loads no live data.

## Design notes

What makes Structured's interface work, and what this recreation had to get right.

**The day is one vertical line.** Every task is a disc on a single spine — pink dashes between planned rows, a solid grey stub into unscheduled ones — with time labels running down the left gutter. The spine, not a list of cards, is what makes the day readable, so the recreation keeps it unbroken from the first row to the last, even under a bottom sheet.

**One coral does all the work.** `#F49F99` is the app's only real colour: planned discs, the action cards, the editor's selection pill, the "More..." links and the completion ring all share it, with `#FDECEB` as its wash. Greys do everything else — `#8A8A8E` for supporting copy, `#EBEBEB` for muted discs and the bottom bar, `#EDDCDB` for the active tab's capsule. Give each action its own hue and the timeline stops being one plan.

**Completed means struck through, not greyed away.** A completed task keeps its place on the spine: the title takes a line-through, its disc turns muted, and the action card flips to "Incomplete". The day's history stays visible instead of vanishing.

**Weight is set per role, not nominal.** The face is Roboto, but each typographic role registers its own static instance cut from the variable font — twelve roles from gutter labels at 10.2 dp to the month header at 23 dp — because nominal weights read too light in a browser. Hierarchy comes from real weight stops and careful tracking, not from extra greys.

**Sheets keep the day in view.** The editor, the detail sheet and the delete confirmation arrive as rounded sheets over the live timeline, dimmed by one scrim. The plan stays legible behind them, and completing or deleting a task updates the timeline you can still see.

**Empty states are invitations.** The first timeline includes guide rows such as "Get Started with Structured!" and "Add Your First Task", with icons and checklist counts alongside the text.

## Design system at a glance

<p align="center"><img src="docs/design-system.png" width="720" alt="Structured UI colour palette, type specimens, and the radius and spacing tokens, including the coral accent and the timeline spine"></p>

The full token set — colours, type scale, spacing, radii and component notes — is in [DESIGN.md](DESIGN.md); the values live in [`src/theme/tokens.ts`](src/theme/tokens.ts).

## Explore the prototype

| Area | Things to try |
|---|---|
| Day timeline | See the first-run plan, gutter time labels and black "now" marker. The starter guides open onboarding, task creation, Inbox and Settings. |
| Create a task | Tap **+**. Pick a suggestion or enter a title, then use the **When?** time wheel and **How long?** duration presets. The colour swatches support arrow keys, Home and End. |
| Task detail | Tap a regular task. The sheet shows its time range with Delete / Duplicate / Complete cards and **Edit Task**. |
| Complete | Tap **Complete** — the title strikes through, the disc mutes, and the card becomes **Incomplete**. |
| Delete | Tap **Delete** and confirm on the dialog; the row leaves the spine. |
| Inbox | Open the **Inbox** tab for the thoughts capture with its empty state and **New Inbox Task**. |
| Settings | Open the **Settings** tab for the Pro banner, import rows, notifications and support sections. |

### A first walkthrough

1. On the timeline, tap **+**, pick **Watch a Movie**, then adjust **When?** and **How long?**.
2. Create the task and find it on the spine with its own time range.
3. Tap the task you created to open its detail sheet, then tap **Complete** and watch the title strike through.
4. Open the same task again and tap **Delete**, then confirm — the spine closes the gap.
5. Switch to **Inbox** and **Settings** to see the two supporting tabs.

Data is static and local to the page; reloading returns you to the first-run plan.

## Run locally

Use Node.js 22.13 or newer in the Node.js 22 release line, with npm.

```bash
npm ci --ignore-scripts
npm run web
```

Open the local URL printed by Expo. Dependency installation requires an internet connection. No Structured account and no API key are required.

### Build for the web

```bash
npm run typecheck
npm run build:web
```

The static output is written to `dist/`. Serve that directory over HTTP or HTTPS; opening `index.html` directly as a local file is not supported.

## Demo build

The published demo at <https://migrant620.github.io/structured/> is built from this repository. It was last rebuilt and redeployed on 2026-11-05 (GitHub Pages commit `c9bb659d`).

## Scope and limitations

- **First batch of screens.** This edition covers the day timeline in its first-run, populated, completed and delete-confirmation states, the two-step task editor, the task detail sheet, the inbox tab and the settings tab. Recurring-task editing, calendar import, the colour picker wheel, reminders and the Pro purchase flow are not built.
- **Sample data.** The prototype uses sample tasks and notes. Times, dates and counts are illustrative. No real person's content is used.
- **Icons are redrawn.** The app's own icon face is proprietary, so every icon here is an original vector drawing.
- **Typeface.** The interface face is Roboto under the SIL Open Font License 1.1, bundled locally in `assets/fonts/` as twelve static instances, one per typographic role.
- **Mobile layout on the web.** The interface is designed for a 393 dp phone column; on wider screens it stays centred rather than stretching. Cross-day navigation is not implemented.
- **Validation scope.** The first-batch screens have been checked in Chromium at 393 dp width. This does not establish complete feature coverage, Safari/Firefox compatibility, or native Android/iOS acceptance.

## Commission a prototype

Have an app whose screens you want to put in front of your team, a client or investors? I recreate chosen app interfaces and flows as high-fidelity, interactive prototypes and hand over the source code. [Open an issue](https://github.com/migrant620/structured-clone/issues/new?title=Prototype%20enquiry) with the app, the flow you need and your timeline.

## License

The prototype's original code and materials are released under the [MIT License](LICENSE). Third-party components, fonts and icons retain their own licenses.

Product names and trademarks belong to their owners; the license covers this prototype's code and original materials, not those marks.

## Attribution

This is an independent prototype by M620, not an official Structured or unorderly product and not affiliated with or endorsed by unorderly. Third-party names identify the interface being demonstrated.

Bundled fonts retain their own licenses: Roboto under the SIL Open Font License 1.1. See the third-party notices in the build output.
