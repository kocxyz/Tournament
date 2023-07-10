'use client';

import React, { useEffect, useState } from 'react';
import { Database } from 'brackets-manager';
import { Id, Match, MatchGame } from 'brackets-model';
import { Brawler, Participant, Tournament } from 'database';

type MatchWithMetadata = Match & { metadata: { games: MatchGame[] } };

export default function BracketsViewer(params: {
  data: Database;
  tournament: Tournament & {
    participants: (Participant & { brawlers: Brawler[] })[];
  };
}) {
  const [match, setMatch] = useState<MatchWithMetadata | undefined>(undefined);

  function handleMatchClick(match: MatchWithMetadata) {
    setMatch(match);
    (window as any).match_modal.showModal();
  }

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
        showPopoverOnMatchLabelClick: false,
        highlightParticipantOnHover: true,
        onMatchClick: handleMatchClick,
      },
    );
  }, []);

  const games = match?.metadata.games.sort((a, b) =>
    a.number < b.number ? -1 : 0,
  );

  const opponent1 = params.data.participant.find(
    (p) => p.id === match?.opponent1?.id,
  );

  const opponent2 = params.data.participant.find(
    (p) => p.id === match?.opponent2?.id,
  );

  function getDBParticipantById(
    id: Id,
  ): (Participant & { brawlers: Brawler[] }) | undefined {
    return params.tournament.participants.find((p) => p.id === id);
  }

  return (
    <>
      <dialog id="match_modal" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box min-w-[50%]">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          {params.tournament.teamSize > 1 ? (
            <div className="flex flex-row justify-between items-center">
              {match?.opponent1?.id ? (
                <div className="flex-1 flex flex-col text-end">
                  <p className="text-md font-bold">
                    {getDBParticipantById(match.opponent1.id)?.name}
                  </p>
                  {getDBParticipantById(match.opponent1.id)?.brawlers.map(
                    (b) => (
                      <a
                        className="hover:text-sky-300 text-gray-600"
                        href={`/brawler/${b.username}`}
                      >
                        {b.username}
                      </a>
                    ),
                  )}
                </div>
              ) : match?.opponent1 !== null ? (
                <p className="flex-1 text-md font-bold text-end">TDB</p>
              ) : (
                <p className="flex-1 text-md font-bold text-end">BYE</p>
              )}
              <div className="flex-1 divider divider-horizontal" />
              {match?.opponent2?.id ? (
                <div className="flex-1 flex flex-col text-start">
                  <p className="text-md font-bold">
                    {getDBParticipantById(match.opponent2.id)?.name}
                  </p>
                  {getDBParticipantById(match.opponent2.id)?.brawlers.map(
                    (b) => (
                      <a
                        className="hover:text-sky-300 text-gray-600"
                        href={`/brawler/${b.username}`}
                      >
                        {b.username}
                      </a>
                    ),
                  )}
                </div>
              ) : match?.opponent2 !== null ? (
                <p className="flex-1 text-md font-bold text-start">TDB</p>
              ) : (
                <p className="flex-1 text-md font-bold text-start">BYE</p>
              )}
            </div>
          ) : undefined}

          <div className="overflow-x-auto mt-8">
            <table className="table">
              <thead>
                <tr>
                  <th className="min-w-[20%]"></th>
                  {match?.metadata.games.map((_, index) => (
                    <th>Match {index + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    {opponent1 ? (
                      <a
                        className="hover:text-sky-300"
                        href={
                          params.tournament.teamSize === 1
                            ? `/brawler/${
                                getDBParticipantById(opponent1.id)?.brawlers[0]
                                  .username
                              }`
                            : `/team/${
                                getDBParticipantById(opponent1.id)?.teamId
                              }`
                        }
                      >
                        {opponent1.name}
                      </a>
                    ) : (
                      'BYE'
                    )}
                  </th>
                  {games?.map((game) => (
                    <td>{game.opponent1?.score ?? '-'}</td>
                  ))}
                </tr>
                <tr>
                  <th>
                    {opponent2 ? (
                      <a
                        className="hover:text-sky-300"
                        href={
                          params.tournament.teamSize === 1
                            ? `/brawler/${
                                getDBParticipantById(opponent2.id)?.brawlers[0]
                                  .username
                              }`
                            : `/team/${
                                getDBParticipantById(opponent2.id)?.teamId
                              }`
                        }
                      >
                        {opponent2.name}
                      </a>
                    ) : (
                      'BYE'
                    )}
                  </th>
                  {games?.map((game) => (
                    <td>{game.opponent2?.score ?? '-'}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div
        id="root"
        className="flex items-center justify-center brackets-viewer"
      />

      <script
        type="text/javascript"
        src="https://cdn.jsdelivr.net/gh/Drarig29/brackets-viewer.js/dist/brackets-viewer.min.js"
      ></script>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/gh/Drarig29/brackets-viewer.js/dist/brackets-viewer.min.css"
      />

      <style>
        {`
          .brackets-viewer {
            /* Colors */
            --primary-background: #ffffff00 !important;
            --secondary-background: #e1e1e1;
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
            --match-width: 250px;
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
    </>
  );
}
