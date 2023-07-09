'use client';

import React, { useEffect } from 'react';
import { Database } from 'brackets-manager';

export default function BracketsViewer(params: { data: Database }) {
  useEffect(() => {
    (window as any).bracketsViewer.render(
      {
        stages: params.data.stage,
        matches: params.data.match,
        matchGames: params.data.match_game,
        participants: params.data.participant,
      },
      {
        customRoundName: (info: any, t: any) => {
          if (info.fractionOfFinal === 1 / 2) {
            return `Semi Finals`;
          }
        },
        selector: '#root',
        participantOriginPlacement: 'none',
        separatedChildCountLabel: true,
        showSlotsOrigin: true,
        showLowerBracketSlotsOrigin: true,
        highlightParticipantOnHover: true,
      },
    );
  });

  return (
    <>
      <div id="root" className="brackets-viewer" />
      <style>
        {`
          .brackets-viewer {
            /* Colors */
            --primary-background: #ffffff00 !important;
            --secondary-background: #c4dfdf;
            --match-background: var(--primary-background);
            --font-color: #212529;
            --win-color: #50b649;
            --loss-color: #e61a1a;
            --label-color: grey;
            --hint-color: #4c5155;
            --connector-color: #9e9e9e;
            --border-color: #d9d9d9;
            --border-hover-color: #b6b5b5;

            --opponent1Color: #fff2cc;
            --opponent2Color: #aee2ff;

            --indicator-background-color: #f0f0f0;
            --indicator-border-radius: 0.5em;
            --indicator-top: -1em;

            --round-title-border-radius: 0.75em;
            --round-title-margin-bottom: 1.5em;

            /* Sizes */
            --text-size: 1em;
            --round-margin: 40px;
            --match-width: 200px;
            --match-horizontal-padding: 12px;
            --match-vertical-padding: 8px;
            --connector-border-width: 2px;
            --match-border-width: 0px;
            --match-border-radius: 0.3em;
          }

          .brackets-viewer div.match div.opponents div.participant:nth-of-type(1) {
            background: var(--opponent1Color);
          }

          .brackets-viewer div.match div.opponents div.participant:nth-of-type(2) {
            background: var(--opponent2Color);
          }

          .brackets-viewer div.match div.opponents > span {
            background: var(--indicator-background-color);
            border-radius: var(--indicator-border-radius);
            top: var(--indicator-top);
          }

          .brackets-viewer div.match div.opponents:hover {
            border: none !important;
          }

          .brackets-viewer article.round > h3 {
            border-radius: var(--round-title-border-radius);
            margin-bottom: var(--round-title-margin-bottom);
          }
        `}
      </style>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Drarig29/brackets-viewer.js/dist/brackets-viewer.min.css"
      />
      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/Drarig29/brackets-viewer.js/dist/brackets-viewer.min.js"
      ></script>
    </>
  );
}
